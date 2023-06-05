import React from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Input from 'components/commercetools-ui/atoms/input';
import Select from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import useAddPaymentMethods from '../helper-hooks/useAddPaymentMethod';
import usePaymentHelpers from '../helper-hooks/usePaymentHelpers';

const PaymentAdd = () => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const resolveCCImage = useResolveCCImage();
  const { expiryDateMonthOptions, expiryDateYearOptions } = usePaymentHelpers();
  const paymentAddData = useAddPaymentMethods();
  const monthSelectButtonClassNames = useClassNames([
    paymentAddData.dateError && paymentAddData.cardExpMonthDate.name === 'MM'
      ? 'border-accent-red'
      : 'border-neutral-500',
    'relative flex h-[40px] w-full cursor-default items-center rounded-sm border  bg-white pl-12 pr-32 text-left focus:outline-none',
  ]);
  const yearSelectButtonClassNames = useClassNames([
    paymentAddData.dateError && paymentAddData.cardExpYearDate.name === 'YY'
      ? 'border-accent-red'
      : 'border-neutral-500',
    'relative flex h-[40px] w-full cursor-default items-center rounded-sm border  bg-white pl-12 pr-32 text-left focus:outline-none',
  ]);

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

      <div className="mt-0 w-full px-16 py-0 md:px-24 lg:mt-36 lg:w-[65%] lg:rounded-md lg:border lg:px-24 lg:py-32">
        <div className="mt-24 md:w-[375px] lg:mt-0">
          <div className="relative">
            <Typography as="label" medium fontSize={14} className="text-secondary-black">
              {formatPaymentMessage({ id: 'card.number', defaultMessage: 'Card number *' })}
            </Typography>
            <Input
              value={paymentAddData.cardNumberFormatted}
              className="mt-8 sm:px-8"
              labelPosition="inline"
              type="text"
              onChange={paymentAddData.handleCardNumberChange}
              validation={paymentAddData.isCardNumber}
              errorMessage={formatPaymentMessage({
                id: 'card.number.error',
                defaultMessage: 'Please insert all 16 numbers',
              })}
            />
            {resolveCCImage(paymentAddData.cardNumberFormatted) && (
              // eslint-disable-next-line
              <img
                className="absolute right-8 top-52 w-[32px] -translate-y-1/2"
                src={resolveCCImage(paymentAddData.cardNumberFormatted)}
              />
            )}
          </div>

          <div className="mt-24 w-full flex-col gap-8 md:max-w-[436px] lg:mt-12 lg:flex lg:flex-row">
            <div className="w-full lg:w-[60%]">
              <Typography as="label" fontSize={14} medium className="text-secondary-black">
                {formatPaymentMessage({ id: 'expiration.date', defaultMessage: 'Expiration date *' })}
              </Typography>
              <div className="mt-8 flex grow items-center md:flex-1">
                <div className="mr-12">
                  <Select
                    selectButtonClassName={monthSelectButtonClassNames}
                    defaultValue={paymentAddData.cardExpMonthDate}
                    options={expiryDateMonthOptions}
                    onChange={paymentAddData.handleExpiryMonthDateChange}
                  />
                </div>
                /
                <div className="ml-12">
                  <Select
                    selectButtonClassName={yearSelectButtonClassNames}
                    defaultValue={paymentAddData.cardExpYearDate}
                    options={expiryDateYearOptions}
                    onChange={paymentAddData.handleExpiryYearDateChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {paymentAddData.dateError && (
            <Typography as="label" fontSize={12} medium className="text-accent-red">
              {formatPaymentMessage({ id: paymentAddData.dateError, defaultMessage: paymentAddData.dateError })}
            </Typography>
          )}
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
