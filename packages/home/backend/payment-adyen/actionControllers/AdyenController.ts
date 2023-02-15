import { ActionContext, Request, Response } from '@frontastic/extension-types/src/ts/index';
import { CartApi } from '../../commerce-commercetools/apis/CartApi';
import { Account } from '@commercetools/frontend-domain-types/account/Account';
import { Payment, PaymentStatuses } from '@commercetools/frontend-domain-types/cart/Payment';
import { hmacValidator } from '@adyen/api-library';
import BaseApi from '../apis/BaseApi';
import { getCountry, getLocale } from 'commerce-commercetools/utils/Request';
import { EmailApiFactory } from 'commerce-commercetools/utils/EmailApiFactory';

export const getPaymentMethods = async (request: Request, actionContext: ActionContext) => {
  const locale = getLocale(request);

  const adyenApi = new BaseApi(actionContext.frontasticContext.project.configuration.adyen);

  const paymentMethods = await adyenApi.getPaymentMethods({ locale, country: getCountry(locale) });

  const response = {
    statusCode: 200,
    sessionData: request.sessionData,
    body: JSON.stringify(paymentMethods),
  } as Response;

  return response;
};

export const makePayment = async (request: Request, actionContext: ActionContext) => {
  const adyenApi = new BaseApi(actionContext.frontasticContext.project.configuration.adyen);

  const data = JSON.parse(request.body);

  const paymentResponse = await adyenApi.makePayment(data);

  const response = {
    statusCode: 200,
    sessionData: request.sessionData,
    body: JSON.stringify(paymentResponse),
  } as Response;

  return response;
};

export const paymentDetails = async (request: Request, actionContext: ActionContext) => {
  const adyenApi = new BaseApi(actionContext.frontasticContext.project.configuration.adyen);

  const data = JSON.parse(request.body);

  const paymentResponse = await adyenApi.paymentDetails(data);

  const response = {
    statusCode: 200,
    sessionData: request.sessionData,
    body: JSON.stringify(paymentResponse),
  } as Response;

  return response;
};

export const notify = async (request: Request, actionContext: ActionContext) => {
  const { notificationItems } = JSON.parse(request.body);

  const hmacKey = actionContext.frontasticContext.project.configuration.adyen.hmacKey;

  const validator = new hmacValidator();

  // @ts-ignore
  notificationItems.forEach(({ NotificationRequestItem }) => {
    if (!validator.validateHMAC(NotificationRequestItem, hmacKey)) throw new Error('Invalid or no HMAC signature');

    const {
      merchantReference,
      paymentMethod,
      amount,
      success,
      eventCode,
      additionalData: { shopperLocale, cardSummary },
    } = NotificationRequestItem;

    const emailApi = EmailApiFactory.getDefaultApi(actionContext.frontasticContext, shopperLocale ?? 'en_GB');
    const cartApi = new CartApi(actionContext.frontasticContext, shopperLocale ?? 'en_GB');

    if (eventCode === 'AUTHORISATION' && success) {
      cartApi
        .createPayment({
          amountPlanned: { centAmount: amount.value, currencyCode: amount.currency },
          paymentMethodInfo: {
            paymentInterface: 'ADYEN',
            method: paymentMethod,
          },
          custom: {
            type: {
              key: 'paymenttype',
              typeId: 'type',
            },
            fields: { cardSummary },
          },
        })
        .then((payment) => {
          cartApi
            .updateOrderByNumber(merchantReference, {
              orderState: 'Confirmed',
              payments: [payment],
              paymentState: 'Paid',
            })
            .then((order) => {
              emailApi.sendOrderConfirmationEmail({ ...order });
            });
        });
    }
  });

  const response: Response = {
    statusCode: 200,
    body: '[accepted]',
    sessionData: request.sessionData,
  };

  return response;
};
