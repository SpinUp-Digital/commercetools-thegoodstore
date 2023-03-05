import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Modal from 'components/commercetools-ui/atoms/modal';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

export interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  handleCancelClick: () => void;
  handleDeleteClick: () => void;
}

const PaymentDelete: FC<Props> = ({ modalIsOpen, closeModal, handleCancelClick, handleDeleteClick }) => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const { formatMessage } = useFormat({ name: 'common' });

  return (
    <Modal
      shouldCloseOnOverlayClick
      isOpen={modalIsOpen}
      style={{ content: { width: 400, height: 280, overflow: 'hidden' } }}
      contentLabel={formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
      onRequestClose={closeModal}
      className="h-[280px] w-[400px] rounded-md border bg-neutral-100"
    >
      <div className="mx-auto  px-24 py-32 md:ml-24 lg:ml-0">
        <div className="flex w-full cursor-pointer justify-end" onClick={() => router.push('/account#payment')}>
          <XMarkIcon className="w-24 text-secondary-black" />
        </div>
        <div className="mt-32 flex h-full flex-col items-center">
          <Typography as="h2" align="center" medium fontSize={20} className="text-primary-black">
            {formatPaymentMessage({
              id: 'delete.question',
              defaultMessage: 'Delete payment method?',
            })}
          </Typography>
          <Typography as="h2" align="center" fontSize={16} className="mt-24 text-secondary-black">
            {formatPaymentMessage({
              id: 'delete.warning',
              defaultMessage: 'This action can not be undone.',
            })}
          </Typography>
          <div className="mt-24 flex">
            <Button variant="secondary" className="w-[112px]" onClick={handleCancelClick}>
              <Typography as="h2" align="center" fontSize={14} className="text-primary-black">
                {formatPaymentMessage({
                  id: 'cancel',
                  defaultMessage: 'Cancel',
                })}
              </Typography>
            </Button>

            <Button variant="warning" className="ml-12 w-[112px]" onClick={handleDeleteClick}>
              <Typography as="h2" align="center" fontSize={14}>
                {formatPaymentMessage({
                  id: 'delete',
                  defaultMessage: 'Delete',
                })}
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDelete;
