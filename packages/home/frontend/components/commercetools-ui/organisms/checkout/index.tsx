import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as uuid from 'uuid';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import { Guid } from 'helpers/utils/guid';
import { getLocalizationInfo } from 'project.config';
import { sdk } from 'sdk';
import { PaymentResponse } from 'types/payment';
import { useAccount, useCart } from 'frontastic';
import Footer from './components/footer';
import Header, { Props as HeaderProps } from './components/header';
import Secure from './components/secure';
import Steps from './components/steps';
import Summary from './components/summary';
import CheckoutProvider, { useCheckout } from './provider';

export type Props = HeaderProps;

const CheckoutWrapped: React.FC<React.PropsWithChildren<Props>> = ({ logo, ...emptyState }) => {
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });

  const { transaction, data, hasOutOfStockItems } = useCart();

  const [isFinalStep, setIsFinalStep] = useState(false);

  const { makePayment, makeKlarnaPayment, paymentData, paymentDataIsValid, handleThreeDS2Action, setProcessing } =
    useCheckout();

  const { account } = useAccount();

  const { country } = useI18n();

  const router = useRouter();

  const handlePaymentResponse = useCallback(
    async (response: PaymentResponse, orderNumber: string) => {
      if (['Authorised', 'RedirectShopper', 'IdentifyShopper', 'ChallengeShopper'].includes(response.resultCode)) {
        if (!response.action) {
          await sdk.callAction({ actionName: 'cart/resetCart' });
          router.push(`/thank-you?orderId=${orderNumber}`);
          return;
        }

        switch (response.action.type) {
          case 'redirect':
            await sdk.callAction({ actionName: 'cart/resetCart' });
            window.location.replace(response.action.url as string);
            break;
          case 'threeDS2':
            handleThreeDS2Action(response.action, (threeDS2AuthResponse) =>
              handlePaymentResponse(threeDS2AuthResponse, orderNumber),
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
    if (!data?.shippingAddress || !data?.billingAddress || !data?.shippingInfo) return;

    if (hasOutOfStockItems) {
      const outOfStockItems = data?.lineItems.filter((lineItem) => lineItem.variant?.isOnStock) ?? [];

      toast.error(
        `
        ${formatCheckoutMessage({
          id: 'items.outOfStock',
          defaultMessage: 'The following items are out of stock',
        })}:\n\n
        ${outOfStockItems.map((item) => `- ${item.name} \n\n`)}
      `,
        { style: { alignItems: 'flex-end', flexDirection: 'row-reverse' } },
      );
      return;
    }

    if (!transaction.total.centAmount || !paymentDataIsValid) {
      toast.error(
        `${formatCheckoutMessage({
          id: 'payment.failed',
          defaultMessage: 'We could not process your payment, please try again later.',
        })}`,
      );

      return;
    }

    setProcessing(true);

    const orderNumber = Guid.newGuid(false, ['', 'xxxx-xxxx-yxxx']);

    let response = {} as PaymentResponse;

    if (paymentData.type === 'scheme') {
      response = await makePayment({
        amount: { currency: transaction.total.currencyCode, value: transaction.total.centAmount },
        returnUrl: `${window.location.origin}/thank-you?orderId=${orderNumber}`,
        reference: orderNumber as string,
        channel: 'web',
        origin: window.location.origin,
        countryCode: country,
        shopperLocale: getLocalizationInfo(router.locale).locale,
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
        metadata: { cartId: data.cartId },
      });
    }

    if (paymentData.type === 'klarna_paynow') {
      response = await makeKlarnaPayment({
        amount: { currency: transaction.total.currencyCode, value: transaction.total.centAmount },
        returnUrl: `${window.location.origin}/thank-you?orderId=${orderNumber}`,
        reference: orderNumber as string,
        shopperReference: account?.accountId ?? uuid.v4(),
        countryCode: country,
        shopperLocale: getLocalizationInfo(router.locale).locale,
        lineItems: (data?.lineItems ?? []).map((lineItem) => ({
          id: lineItem.lineItemId as string,
          quantity: (lineItem.count ?? 1).toString() as string,
          description: lineItem.name as string,
          amountIncludingTax: lineItem.taxedPrice.centAmount as number,
          productUrl: lineItem._url,
          imageUrl: lineItem.variant?.images?.[0],
        })),
        metadata: { cartId: data.cartId },
      });
    }

    handlePaymentResponse(response, orderNumber);

    setProcessing(false);
  }, [
    setProcessing,
    makePayment,
    hasOutOfStockItems,
    transaction.total,
    router,
    paymentData.type,
    makeKlarnaPayment,
    account?.accountId,
    country,
    data,
    paymentDataIsValid,
    handlePaymentResponse,
    formatCheckoutMessage,
  ]);

  return (
    <div className="min-h-screen lg:bg-neutral-200">
      <Header logo={logo} {...emptyState} />
      <div className="lg:mx-[48px]">
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

const Checkout: React.FC<React.PropsWithChildren<Props>> = (props) => {
  return (
    <CheckoutProvider>
      <CheckoutWrapped {...props} />
    </CheckoutProvider>
  );
};

export default Checkout;
