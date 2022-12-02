import { FC, useState } from 'react';
import { Variant } from '@commercetools/domain-types/product/Variant';
import { TruckIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Dropdown from 'components/commercetools-ui/atoms/dropdown';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import Wrapper from 'components/commercetools-ui/organisms/content/wrapper';
import Gallery from 'components/commercetools-ui/organisms/gallery';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic';
import AdditionalInfo from './additional-info';
import ProductInformation from './product-information';
import { UIProduct } from './types';

export interface ProductDetailsProps {
  product: UIProduct;
  variant: Variant;
  url?: string;
  onChangeVariant: (sku: string) => void;
  inModalVersion?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  variant,
  url,
  onChangeVariant,
  inModalVersion,
  setIsOpen,
}) => {
  const { addItem } = useCart();
  const { formatMessage } = useFormat({ name: 'cart' });

  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleQuantityChange = (value: string) => {
    setQuantity(+value);
  };

  const handleAddToCart = () => {
    setLoading(true);
    addItem(variant, quantity).then(() => {
      setLoading(false);
      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1000);
    });
  };

  const deliveryTypes = [
    formatMessage({ id: 'delivery.standard', defaultMessage: 'Standard Delivery' }),
    formatMessage({ id: 'delivery.express', defaultMessage: 'Express Delivery' }),
  ];

  const wrapperClassName = inModalVersion
    ? 'grid grid-cols-2 pt-70 pb-35 px-20 gap-58 md:pr-40'
    : 'py-50 md:grid md:grid-cols-3 md:items-start md:gap-x-26 lg:gap-x-96';

  return (
    <Wrapper variant="full-padding" className={wrapperClassName} clearDefaultStyles={inModalVersion}>
      <Gallery images={variant?.images} inModalVersion={inModalVersion} />
      <div className="mt-22 md:mt-0">
        <ProductInformation
          product={product}
          variant={variant}
          onChangeVariant={onChangeVariant}
          inModalVersion={inModalVersion}
        />

        <div className="flex gap-8 pt-25">
          <Dropdown
            className="rounded-sm"
            defaultValue="1"
            items={Array(10)
              .fill(0)
              .map((_, index) => {
                const value = `${index + 1}`;
                return {
                  label: value,
                  value,
                };
              })}
            onChange={handleQuantityChange}
          />
          <Button className="w-full" variant="primary" onClick={handleAddToCart} loading={loading} added={added}>
            {formatMessage({ id: 'cart.add', defaultMessage: 'Add to cart' })}
          </Button>
        </div>

        {!inModalVersion && (
          <>
            <hr className="mt-25 h-1 bg-neutral-400" />
            <div className="mt-25 grid border border-neutral-400">
              {deliveryTypes.map((type) => (
                <div key={type} className="flex gap-24 px-17 py-11 first:border-b first:border-neutral-400">
                  <div className="grid h-full items-center">
                    <TruckIcon className="h-24 w-24 rounded-full border border-neutral-400 p-4" />
                  </div>
                  <div className="grid">
                    <Typography lineHeight="loose" medium className="text-primary-black" fontSize={14}>
                      {type}
                    </Typography>
                    <Typography fontSize={14} lineHeight="loose" className="text-secondary-black underline">
                      {formatMessage({ id: 'add.postcode', defaultMessage: 'Add postcode for availability' })}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {inModalVersion && (
          <div>
            <Link
              link={url}
              variant="menu-item"
              className="mx-auto mt-30 block w-fit border-b text-center text-14 leading-loose text-secondary-black"
              onClick={() => setIsOpen(false)}
            >
              <a>More details</a>
            </Link>
          </div>
        )}
      </div>

      {!inModalVersion && (
        <div className="col-span-2 grid gap-y-34 md:mb-50">
          <AdditionalInfo productspec={variant?.attributes.productspec} description={product?.description} />
        </div>
      )}
    </Wrapper>
  );
};

export default ProductDetails;
