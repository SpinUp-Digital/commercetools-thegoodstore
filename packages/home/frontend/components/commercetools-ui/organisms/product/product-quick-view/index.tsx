import { FC, useRef, useState } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Modal from 'components/commercetools-ui/atoms/modal';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import useOnClickOutside from 'helpers/hooks/useOnClickOutside';
import ProductDetailsAdapter from '../product-details/helpers/adapter';

type QuickViewProps = {
  showButton: boolean;
  product: Product;
};

const QuickView: FC<QuickViewProps> = ({ showButton, product }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const { formatMessage } = useFormat({ name: 'product' });
  const classNames = useClassNames([
    showButton ? 'block' : 'hidden',
    'w-full border border-neutral-400 bg-white py-16 text-center text-12 capitalize leading-[16px] transition duration-150 ease-out hover:border-primary-black',
  ]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, closeModal);

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
        <div ref={ref}>
          <XMarkIcon
            className="absolute top-15 right-15 h-24 w-24 hover:cursor-pointer"
            strokeWidth={1}
            color="#494949"
            onClick={closeModal}
          />
          <ProductDetailsAdapter product={product} inModalVersion={true} setIsOpen={setIsOpen} />
        </div>
      </Modal>
    </>
  );
};

export default QuickView;
