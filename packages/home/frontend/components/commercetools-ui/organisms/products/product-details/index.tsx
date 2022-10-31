import { FC, useState } from 'react';
import NextLink from 'next/link';
import { Variant } from '@Types/product/Variant';
import Button from 'components/commercetools-ui/atoms/button';
import Wrapper from 'components/commercetools-ui/organisms/content/wrapper';
import Dropdown from 'components/commercetools-ui/atoms/dropdown';
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
  onAddToWishlist: () => void;
  onRemoveFromWishlist: () => void;
  onChangeVariant: (sku: string) => void;
  inModalVersion?: boolean;
  setIsOpen?: (value: boolean) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  variant,
  url,
  onAddToWishlist,
  onRemoveFromWishlist,
  onChangeVariant,
  inModalVersion,
  setIsOpen,
}) => {
  const { addItem } = useCart();
  const { formatMessage } = useFormat({ name: 'cart' });

  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (value: string) => {
    setQuantity(+value);
  };

  const handleAddToCart = () => {
    addItem(variant, quantity);
  };

  const wrapperClassName = inModalVersion
    ? 'grid grid-cols-2 pt-70 pb-35 px-20 gap-58 md:pr-40'
    : 'py-50 md:grid md:grid-cols-3 md:items-start md:gap-x-26 lg:gap-x-96';

  return (
    <Wrapper phonePadding="full-padding" className={wrapperClassName} clearDefaultStyles={inModalVersion}>
      <Gallery images={variant?.images} inModalVersion={inModalVersion} />
      <div className="mt-22 md:mt-0">
        <ProductInformation
          product={product}
          variant={variant}
          onAddToWishlist={onAddToWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
          onChangeVariant={onChangeVariant}
          inModalVersion={inModalVersion}
        />

        <div className="flex gap-8 pt-25">
          <Dropdown
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
          <Button className="w-full" colorScheme="black" rounded="sm" onClick={handleAddToCart}>
            {formatMessage({ id: 'cart.add', defaultMessage: 'Add to cart' })}
          </Button>
        </div>

        {inModalVersion && (
          <div className="flex justify-center pt-30" onClick={() => setIsOpen(false)}>
            <NextLink href={url}>
              <a className="font-body text-14 font-regular leading-loose text-secondary-black underline">
                More details
              </a>
            </NextLink>
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
