import { CurrencyHelpers } from 'helpers/currencyHelpers';
import HeartIcon from 'components/icons/heart';
import { useFormat } from 'helpers/hooks/useFormat';
import { FC, useEffect, useState } from 'react';
import { ProductDetailsProps } from '.';
import { useWishlist } from 'frontastic';

type ProductInformationProps = Omit<ProductDetailsProps, 'onAddToCart'>;

const ProductInformation: FC<ProductInformationProps> = ({
  product,
  variant,
  onChangeVariantId,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const { formatMessage } = useFormat({ name: 'product' });

  const wishlist = useWishlist();
  const [onWishlist, setOnWishlist] = useState<boolean>(false);

  const updateVariantId = (id: string) => {
    onChangeVariantId(id);
  };

  const handleWishlistButtonClick = () => {
    if (onWishlist) {
      onRemoveFromWishlist();
    } else {
      onAddToWishlist();
    }
  };

  useEffect(() => {
    if (wishlist?.data?.lineItems) {
      const item = wishlist.data.lineItems.find(({ variant: { sku } }) => sku === variant.sku);
      setOnWishlist(!!item);
    }
  }, [wishlist?.data?.lineItems]);

  return (
    <div className="border-b border-b-neutral-400 pb-26">
      <div className="relative flex pr-50">
        <h3 className="break-all font-body text-18 font-bold leading-loose">{product?.name}</h3>
        <HeartIcon
          className="absolute top-0 right-0 h-24 w-24 cursor-pointer"
          pathClassName={`${onWishlist ? 'fill-transparent stroke-secondary-black' : 'fill-red-500 stroke-red-700'}`}
          onClick={handleWishlistButtonClick}
        />
      </div>

      <p className="mt-10 font-body text-16 font-regular leading-loose">
        {CurrencyHelpers.formatForCurrency(variant?.price)}
      </p>

      <div className="mt-25">
        <p className="font-body text-14 font-medium leading-loose">
          {formatMessage({ id: 'color', defaultMessage: 'Color' })}
        </p>
        <p className="font-body text-12 font-regular leading-loose">{variant?.attributes?.colorlabel}</p>
      </div>

      <div className="mt-15 flex gap-24">
        {product?.variants.map(({ attributes: { color }, id }, index) => (
          <div
            key={index}
            className={`h-20 w-20 rounded-full ${
              id == variant.id ? 'border-2 border-neutral-800' : 'border border-neutral-300'
            } border border-neutral-300 hover:cursor-pointer`}
            style={{ backgroundColor: color }}
            onClick={() => updateVariantId(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductInformation;
