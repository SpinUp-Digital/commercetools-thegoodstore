import { XIcon } from '@heroicons/react/outline';
import { Product } from '@Types/product/Product';
import { useFormat } from 'helpers/hooks/useFormat';
import { CSSProperties, FC, useState } from 'react';
import Modal from 'react-modal';
import ProductDetailsAdapter from '../product-details/adapter';

type QuickViewProps = {
  imageHovered: boolean;
  isDesktopSize: boolean;
  product: Product;
};

const QuickView: FC<QuickViewProps> = ({ imageHovered, isDesktopSize, product }) => {
  const { formatMessage } = useFormat({ name: 'product' });

  const [modalIsOpen, setIsOpen] = useState(false);

  type ModalStylesProps = {
    overlay: CSSProperties;
    content: CSSProperties;
  };

  const modalStyle: ModalStylesProps = {
    overlay: {
      zIndex: 12,
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 667,
      position: 'relative',
      padding: 0,
    },
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`w-full border border-neutral-400 bg-white py-16 text-center text-12 capitalize leading-[16px] transition duration-150 ease-out hover:border-primary-black ${
          imageHovered && isDesktopSize ? 'block' : 'hidden'
        }`}
        onClick={openModal}
      >
        {formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
      </button>

      <Modal
        shouldCloseOnOverlayClick
        isOpen={modalIsOpen}
        style={modalStyle}
        contentLabel={formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
        onRequestClose={closeModal}
      >
        <>
          <XIcon
            className="absolute top-15 right-15 h-24 w-24 hover:cursor-pointer"
            strokeWidth={1}
            color="#494949"
            onClick={closeModal}
          />
          <ProductDetailsAdapter product={product} inModalVersion />
        </>
      </Modal>
    </>
  );
};

export default QuickView;
