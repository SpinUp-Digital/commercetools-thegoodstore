import { FC, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Product } from '@Types/product/Product';
import { useFormat } from 'helpers/hooks/useFormat';
import ProductDetailsAdapter from '../product-details/adapter';
import Modal from 'components/commercetools-ui/modal';
import useClassNames from 'helpers/hooks/useClassNames';

type QuickViewProps = {
  imageHovered: boolean;
  isDesktopSize: boolean;
  product: Product;
};

const QuickView: FC<QuickViewProps> = ({ imageHovered, isDesktopSize, product }) => {
  const { resolveClassNames } = useClassNames();
  const { formatMessage } = useFormat({ name: 'product' });
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const buttonClassName = resolveClassNames([
    'w-full border border-neutral-400 bg-white py-16 text-center text-12 capitalize leading-[16px] transition duration-150 ease-out hover:border-primary-black',
    imageHovered && isDesktopSize ? 'block' : 'hidden',
  ]);

  return (
    <>
      <button className={buttonClassName} onClick={openModal}>
        {formatMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
      </button>

      <Modal
        shouldCloseOnOverlayClick
        isOpen={modalIsOpen}
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
