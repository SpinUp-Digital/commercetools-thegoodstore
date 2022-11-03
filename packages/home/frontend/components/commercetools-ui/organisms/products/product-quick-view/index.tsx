import { FC, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product } from '@Types/product/Product';
import Modal from 'components/commercetools-ui/atoms/modal';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import ProductDetailsAdapter from '../product-details/adapter';

type QuickViewProps = {
  imageHovered: boolean;
  isDesktopSize: boolean;
  product: Product;
};

const QuickView: FC<QuickViewProps> = ({ imageHovered, isDesktopSize, product }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { formatMessage } = useFormat({ name: 'product' });
  const classNames = useClassNames([
    imageHovered && isDesktopSize ? 'block' : 'hidden',
    'w-full border border-neutral-400 bg-white py-16 text-center text-12 capitalize leading-[16px] transition duration-150 ease-out hover:border-primary-black',
  ]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      {!modalIsOpen && (
        <button className={classNames} onClick={openModal}>
          {formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
        </button>
      )}

      <Modal
        shouldCloseOnOverlayClick
        isOpen={modalIsOpen}
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
          <ProductDetailsAdapter product={product} inModalVersion={true} setIsOpen={setIsOpen} />
        </>
      </Modal>
    </>
  );
};

export default QuickView;
