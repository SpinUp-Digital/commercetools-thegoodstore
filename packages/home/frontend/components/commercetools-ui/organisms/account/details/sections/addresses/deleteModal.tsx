import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Modal from 'components/commercetools-ui/atoms/modal';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

type DeleteModalProps = {
  modalIsOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
};

const DeleteModal: FC<DeleteModalProps> = ({ modalIsOpen, closeModal, handleDelete }) => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage } = useFormat({ name: 'common' });

  return (
    <Modal
      shouldCloseOnOverlayClick
      isOpen={modalIsOpen}
      style={{ content: { width: 400, height: 280, overflow: 'hidden' } }}
      contentLabel={formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
      onRequestClose={closeModal}
    >
      <>
        <XMarkIcon
          className="absolute top-15 right-15 h-24 w-24 hover:cursor-pointer"
          strokeWidth={1}
          color="#494949"
          onClick={closeModal}
        />

        <div className="m-auto grid h-full place-content-center gap-24">
          <Typography as="h3" align="center" fontSize={20} medium className="text-primary-black">
            {formatAccountMessage({ id: 'delete.address', defaultMessage: 'Delete address' })}
          </Typography>
          <Typography align="center" as="p" fontSize={16} className="text-secondary-black">
            {formatAccountMessage({ id: 'action.warning', defaultMessage: 'This action can not be undone.' })}
          </Typography>

          <div className="grid w-[244px] grid-cols-2 gap-12">
            <Button type="button" variant="secondary" className="h-40 w-full p-0" onClick={closeModal}>
              {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
            </Button>
            <Button type="button" className="h-40 w-full bg-accent-red px-0 text-14" onClick={handleDelete}>
              {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
            </Button>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default DeleteModal;
