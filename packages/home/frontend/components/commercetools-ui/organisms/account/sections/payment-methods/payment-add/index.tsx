import React from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Input from 'components/commercetools-ui/atoms/input';
import Select from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useFormat } from 'helpers/hooks/useFormat';
import useAddPaymentMethods from '../helper-hooks/useAddPaymentMethod';
import usePaymentHelpers from '../helper-hooks/usePaymentHelpers';

const PaymentAdd = () => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const resolveCCImage = useResolveCCImage();
  const { expiryDateMonthOptions, expiryDateYearOptions } = usePaymentHelpers();
  const paymentAddData = useAddPaymentMethods();

  return (
    <div className="ml-0 mt-20 lg:ml-44 lg:mt-40">
      <div className="mt-24 px-16 md:mt-0 md:px-24 lg:px-0">
        <Typography as="h2" fontFamily="libre" fontSize={16} className="text-primary-black md:text-22 lg:text-24">
          {formatPaymentMessage({
            id: 'add.card',
            defaultMessage: 'Add new card',
          })}
        </Typography>
      </div>

      <div className="mt-0 w-full px-16 py-0 md:px-24 lg:mt-36 lg:w-[800px] lg:rounded-md lg:border lg:px-24 lg:py-32">
        <div className="mt-24 md:w-[375px] lg:mt-0">
          <Typography as="label" medium fontSize={14} className="text-secondary-black">
            {formatPaymentMessage({ id: 'card.holder', defaultMessage: 'Card holder *' })}
          </Typography>
          <Input
            name="holderName"
            value={paymentAddData.cardHolder}
            className="mt-8 sm:px-8"
            labelPosition="inline"
            onChange={paymentAddData.handleCardHolderChange}
            error={paymentAddData.cardHolderError}
          />

          <div className="relative mt-16 lg:mt-12">
            <Typography as="label" medium fontSize={14} className="text-secondary-black">
              {formatPaymentMessage({ id: 'card.number', defaultMessage: 'Card number *' })}
            </Typography>
            <Input
              value={paymentAddData.cardNumberFormatted}
              className="mt-8 sm:px-8"
              labelPosition="inline"
              type="text"
              onChange={paymentAddData.handleCardNumberChange}
              error={paymentAddData.cardNumberError}
            />
            {resolveCCImage(paymentAddData.cardNumberFormatted) && (
              // eslint-disable-next-line
              <img
                className="absolute right-8 top-52 w-[32px] -translate-y-1/2"
                src={resolveCCImage(paymentAddData.cardNumberFormatted)}
              />
            )}
          </div>

          <div className="mt-16 w-full flex-col gap-8 md:max-w-[436px] lg:mt-12 lg:flex lg:flex-row">
            <div className="w-full lg:w-[60%]">
              <Typography as="label" fontSize={14} medium className="text-secondary-black">
                {formatPaymentMessage({ id: 'expiration.date', defaultMessage: 'Expiration date *' })}
              </Typography>
              <div className="mt-8 flex grow items-center md:flex-1">
                <div className="mr-12">
                  <Select
                    defaultValue={paymentAddData.cardExpMonthDate}
                    options={expiryDateMonthOptions}
                    onChange={paymentAddData.handleExpiryMonthDateChange}
                  />
                </div>
                /
                <div className="ml-12">
                  <Select
                    defaultValue={paymentAddData.cardExpYearDate}
                    options={expiryDateYearOptions}
                    onChange={paymentAddData.handleExpiryYearDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32 flex">
          <Button variant="secondary" className="w-[112px]" onClick={() => router.push('/account#payment')}>
            <Typography as="h2" align="center" fontSize={14} className="text-primary-black">
              {formatPaymentMessage({
                id: 'cancel',
                defaultMessage: 'Cancel',
              })}
            </Typography>
          </Button>

          <Button variant="primary" className="ml-12 w-[112px]" onClick={paymentAddData.handleAddClick}>
            <Typography as="h2" align="center" fontSize={14}>
              {formatPaymentMessage({
                id: 'save',
                defaultMessage: 'Save',
              })}
            </Typography>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentAdd;
