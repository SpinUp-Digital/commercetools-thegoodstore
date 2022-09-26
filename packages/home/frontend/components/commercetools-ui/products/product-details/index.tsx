import { FC, useState } from 'react';
import { UIProduct } from './types';
import Wrapper from 'components/commercetools-ui/content/wrapper';
import { Variant } from '@Types/product/Variant';
import Gallery from 'components/commercetools-ui/gallery';
import Dropdown from 'components/commercetools-ui/dropdown';
import Button from 'components/commercetools-ui/button';
import { useFormat } from 'helpers/hooks/useFormat';
import ProductInformation from './product-information';
import AdditionalInfo from './additional-info';

export interface ProductDetailsProps {
  product: UIProduct;
  onAddToCart: (variant: Variant, quantity: number) => Promise<void>;
  onAddToWishlist: () => void;
  onRemoveFromWishlist: () => void;
  variant: Variant;
  onChangeVariantId: (idx: string) => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  product,
  variant,
  onChangeVariantId,
  onAddToWishlist,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  const { formatMessage } = useFormat({ name: 'cart' });

  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    onAddToCart(variant, quantity);
  };

  const handleQuantityChange = (value: string) => {
    setQuantity(+value);
  };

  return (
    <Wrapper
      phonePadding="full-padding"
      className="py-50 md:grid md:grid-cols-3 md:items-start md:gap-x-26 lg:gap-x-96"
    >
      <Gallery images={variant?.images} />
      <div className="mt-22 md:mt-0">
        <ProductInformation
          product={product}
          variant={variant}
          onChangeVariantId={onChangeVariantId}
          onAddToWishlist={onAddToWishlist}
          onRemoveFromWishlist={onRemoveFromWishlist}
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
      </div>

      <AdditionalInfo productspec={variant?.attributes.productspec} description={product?.description} />
    </Wrapper>
  );
};

export default ProductDetails;
