import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import { LineItem } from '@commercetools/domain-types/wishlist/LineItem';
import Variant from 'components/commercetools-ui/organisms/variant';
import WishlistButton from 'components/commercetools-ui/organisms/wishlist-button';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { ProductDetailsProps } from '.';

type ProductInformationProps = Omit<ProductDetailsProps, 'onAddToCart'>;

const ProductInformation: FC<ProductInformationProps> = ({ product, variant, onChangeVariant, inModalVersion }) => {
  const router = useRouter();

  const attributesToDisplay = ['color', 'finish'];

  const discountPercentage =
    variant.discountedPrice &&
    ((variant.price.centAmount - variant.discountedPrice.centAmount) / variant.price.centAmount) * 100;

  const updateVariantSKU = (sku: string) => {
    router.replace(`${router.asPath.split('/').slice(0, -1).join('/')}/${sku}`, undefined, {
      shallow: true,
    });
  };

  const productToWishlistLineItem = useMemo<LineItem>(() => {
    return {
      lineItemId: product?.productId,
      productId: product?.productId,
      name: product?.name,
      count: 1,
      variant: variant,
      addedAt: new Date(),
      _url: product?._url,
    };
  }, [product, variant]);

  return (
    <div>
      <div className="relative flex pr-40">
        <h3 className="break-normal font-body text-18 font-bold leading-loose">{product?.name}</h3>
        <WishlistButton lineItem={productToWishlistLineItem} />
      </div>
      {variant.discountedPrice ? (
        <div className="flex flex-row justify-between">
          <div className="mt-10 flex items-center gap-8">
            <span className="block text-16 font-regular leading-loose text-accent-red">
              {CurrencyHelpers.formatForCurrency(variant.discountedPrice)}
            </span>
            <span className="block text-12 leading-loose text-gray-500 line-through">
              {CurrencyHelpers.formatForCurrency(variant.price)}
            </span>
          </div>

          {
            <span className="ml-8 mt-10 mb-8 flex h-[25px] w-[45px] items-center justify-center bg-accent-red text-12 text-neutral-100">
              {Math.round(discountPercentage)}%
            </span>
          }
        </div>
      ) : (
        <span className="mt-10 block font-body text-16 font-regular leading-loose">
          {CurrencyHelpers.formatForCurrency(variant.price)}
        </span>
      )}

      {attributesToDisplay.map((attribute, index) => {
        if (variant?.attributes?.[attribute]) {
          return (
            <Variant
              key={index}
              className="mt-25 border-b border-b-neutral-400 pb-20"
              variants={product?.variants}
              currentVariant={variant}
              attribute={attribute}
              onClick={inModalVersion ? onChangeVariant : updateVariantSKU}
            />
          );
        }
      })}
    </div>
  );
};

export default ProductInformation;
