import React, { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Input from 'components/commercetools-ui/atoms/input';
import Select from 'components/commercetools-ui/atoms/select';
import Typography from 'components/commercetools-ui/atoms/typography';
import useResolveCCImage from 'components/commercetools-ui/organisms/checkout/hooks/useResolveCCImage';
import { useFormat } from 'helpers/hooks/useFormat';
import useHash from 'helpers/hooks/useHash';
import useEditPaymentMethods from '../helper-hooks/useEditPaymentMethod';
import useCardNumberFormatter from '../helper-hooks/useFormatCredit';
import usePaymentHelpers from '../helper-hooks/usePaymentHelpers';
import PaymentDelete from '../payment-delete';

const PaymentEdit: FC = () => {
  const router = useRouter();
  // eslint-disable-next-line
  const [_hash, id] = useHash();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const paymentEditData = useEditPaymentMethods(id as string);

  const { expiryDateMonthOptions, expiryDateYearOptions } = usePaymentHelpers();
  const cardNumberFormatted = useCardNumberFormatter(paymentEditData.cardNumber ?? '');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const resolveCCImage = useResolveCCImage();

  return (
    <div className="ml-0 md:ml-24 lg:ml-44">
      <div className="ml-16 mt-24 lg:ml-0 lg:mt-40">
        <Typography as="h2" fontFamily="libre" fontSize={18} className="text-primary-black md:text-22 lg:text-24">
          {formatPaymentMessage({
            id: 'edit.payment',
            defaultMessage: 'Edit payment method',
          })}
        </Typography>
      </div>

      <PaymentDelete
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        handleCancelClick={closeModal}
        handleDeleteClick={paymentEditData.handleDeleteClick}
      />

      <div className="mt-0 w-full px-16 py-0 lg:mt-36 lg:w-[65%] lg:rounded-md lg:border lg:px-24 lg:py-32">
        <div className="mt-24 md:max-w-[436px] lg:mt-0">
          <div className="relative">
            <Typography as="label" medium fontSize={14} className="text-secondary-black">
              {formatPaymentMessage({ id: 'card.number', defaultMessage: 'Card number *' })}
            </Typography>
            <Input
              value={cardNumberFormatted}
              className="mt-8 sm:px-8"
              labelPosition="inline"
              type="text"
              onChange={paymentEditData.handleCardNumberChange}
              validation={paymentEditData.isCardNumber}
              errorMessage={formatPaymentMessage({
                id: 'card.number.error',
                defaultMessage: 'Please insert all 16 numbers',
              })}
            />
            {resolveCCImage(cardNumberFormatted) && (
              // eslint-disable-next-line
              <img
                className="absolute right-8 top-52 w-[32px] -translate-y-1/2"
                src={resolveCCImage(cardNumberFormatted)}
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
                    defaultValue={paymentEditData.cardExpMonthDate}
                    options={expiryDateMonthOptions}
                    onChange={paymentEditData.handleExpiryDateMonthChange}
                  />
                </div>
                /
                <div className="ml-12">
                  <Select
                    defaultValue={paymentEditData.cardExpYearDate}
                    options={expiryDateYearOptions}
                    onChange={paymentEditData.handleExpiryDateYearChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex-col justify-start pl-4 lg:mt-32 lg:flex lg:max-w-[436px] lg:flex-row lg:justify-between lg:pl-0">
          <Button variant="ghost" size="fit" className="flex items-center px-0" onClick={() => setModalIsOpen(true)}>
            <TrashIcon className="w-20 text-secondary-black" />
            <Typography as="h2" align="center" fontSize={14} className="ml-8 font-normal text-secondary-black">
              {formatPaymentMessage({
                id: 'delete',
                defaultMessage: 'Delete',
              })}
            </Typography>
          </Button>

          <div className="mt-32 flex lg:mt-0">
            <Button
              variant="secondary"
              className="ml-0 w-[112px] lg:ml-64"
              onClick={() => router.push('/account#payment')}
            >
              <Typography as="h2" align="center" fontSize={14} className="text-primary-black">
                {formatPaymentMessage({
                  id: 'cancel',
                  defaultMessage: 'Cancel',
                })}
              </Typography>
            </Button>

            <Button variant="primary" className="ml-12 w-[112px]" onClick={paymentEditData.handleSaveClick}>
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
    </div>
  );
};

export default PaymentEdit;
