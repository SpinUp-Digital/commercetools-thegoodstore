import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Order } from '@commercetools/frontend-domain-types/cart/Order';
import toast from 'react-hot-toast';
import * as uuid from 'uuid';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import { mapLocaleLanguage } from 'project.config';
import { KlarnaPaymentRequestPayload, PaymentResponse, SchemePaymentRequestPayload } from 'types/payment';
import { useAccount, useCart } from 'frontastic';
import Footer from './components/footer';
import Header, { Props as HeaderProps } from './components/header';
import Secure from './components/secure';
import Steps from './components/steps';
import Summary from './components/summary';
import CheckoutProvider, { useCheckout } from './provider';

export type Props = HeaderProps;

const CheckoutWrapped: React.FC<Props> = ({ logo }) => {
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });

  const { orderCart, transaction, data, hasOutOfStockItems } = useCart();

  const [isFinalStep, setIsFinalStep] = useState(false);

  const { makePayment, makeKlarnaPayment, paymentData, paymentDataIsValid, handleThreeDS2Action, setProcessing } =
    useCheckout();

  const { account } = useAccount();

  const { country } = useI18n();

  const router = useRouter();

  const handlePaymentResponse = useCallback(
    (response: PaymentResponse, order: Order) => {
      if (['Authorised', 'RedirectShopper', 'IdentifyShopper', 'ChallengeShopper'].includes(response.resultCode)) {
        if (!response.action) return router.push(`/thank-you?orderId=${order.orderId}`);

        switch (response.action.type) {
          case 'redirect':
            window.location.replace(response.action.url as string);
            break;
          case 'threeDS2':
            handleThreeDS2Action(response.action, (threeDS2AuthResponse) =>
              handlePaymentResponse(threeDS2AuthResponse, order),
            );
            break;
        }
      } else {
        toast.error(
          `${formatCheckoutMessage({
            id: 'payment.failed',
            defaultMessage: 'We could not process your payment, please try again later.',
          })}`,
        );
      }
    },
    [router, handleThreeDS2Action, formatCheckoutMessage],
  );

  const purchase = useCallback(async () => {
    if (!transaction.total.centAmount || !paymentDataIsValid || hasOutOfStockItems) return;

    setProcessing(true);

    const order = await orderCart();

    let response = {} as PaymentResponse;

    if (paymentData.type === 'scheme') {
      response = await makePayment({
        amount: { currency: transaction.total.currencyCode, value: transaction.total.centAmount },
        returnUrl: `${window.location.origin}/thank-you?orderId=${order.orderId}`,
        reference: order.orderId as string,
        channel: 'web',
        origin: window.location.origin,
        countryCode: country,
        shopperLocale: mapLocaleLanguage(router.locale),
        authenticationData: {
          threeDSRequestData: {
            nativeThreeDS: 'preferred',
          },
        },
        browserInfo: {
          acceptHeader: '*/*',
          colorDepth: screen.colorDepth,
          javaEnabled: false,
          language: navigator.language,
          screenHeight: screen.availHeight,
          screenWidth: screen.availWidth,
          timeZoneOffset: new Date().getTimezoneOffset(),
          userAgent: navigator.userAgent,
        },
      } as SchemePaymentRequestPayload);
    }

    if (paymentData.type === 'klarna_paynow') {
      response = await makeKlarnaPayment({
        amount: { currency: transaction.total.currencyCode, value: transaction.total.centAmount },
        returnUrl: `${window.location.origin}/thank-you?orderId=${order.orderId}`,
        reference: order.orderId as string,
        shopperReference: account?.accountId ?? uuid.v4(),
        countryCode: country,
        shopperLocale: mapLocaleLanguage(router.locale),
        lineItems: (data?.lineItems ?? []).map((lineItem) => ({
          id: lineItem.lineItemId as string,
          quantity: (lineItem.count ?? 1).toString() as string,
          description: lineItem.name as string,
          amountIncludingTax: lineItem.taxedPrice.centAmount as number,
          productUrl: lineItem._url,
          imageUrl: lineItem.variant?.images?.[0],
        })),
      } as KlarnaPaymentRequestPayload);
    }

    handlePaymentResponse(response, order);

    setProcessing(false);
  }, [
    orderCart,
    setProcessing,
    makePayment,
    hasOutOfStockItems,
    transaction.total,
    router,
    paymentData.type,
    makeKlarnaPayment,
    account?.accountId,
    country,
    data?.lineItems,
    paymentDataIsValid,
    handlePaymentResponse,
  ]);

  return (
    <div className="min-h-screen lg:bg-neutral-200">
      <Header logo={logo} />
      <div className="lg:mx-auto lg:max-w-[1500px]">
        <Secure />
        <div className="flex-row-reverse items-start gap-24 lg:flex">
          <Summary onPurchase={purchase} isFinalStep={isFinalStep} />
          <Steps onPurchase={purchase} onFinalStepChange={setIsFinalStep} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Checkout: React.FC<Props> = (props) => {
  return (
    <CheckoutProvider>
      <CheckoutWrapped {...props} />
    </CheckoutProvider>
  );
};

export default Checkout;
