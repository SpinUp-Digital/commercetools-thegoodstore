import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { FC, useEffect, useState } from 'react';
import { ProductDetailsProps } from '.';
import { useWishlist } from 'frontastic';
import Variant from 'components/commercetools-ui/variant';
import WishlistButton from 'components/commercetools-ui/wishlist-button';

type ProductInformationProps = Omit<ProductDetailsProps, 'onAddToCart'>;

const ProductInformation: FC<ProductInformationProps> = ({
  product,
  variant,
  onChangeVariantId,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  const wishlist = useWishlist();
  const [onWishlist, setOnWishlist] = useState<boolean>(false);

  const attributesToDisplay = ['color', 'finish'];

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
    <div>
      <div className="relative flex pr-40">
        <h3 className="break-all font-body text-18 font-bold leading-loose">{product?.name}</h3>
        <WishlistButton onWishlist={onWishlist} onClick={handleWishlistButtonClick} />
      </div>

      <p className="mt-10 font-body text-16 font-regular leading-loose">
        {CurrencyHelpers.formatForCurrency(variant?.price)}
      </p>

      {attributesToDisplay.map((attribute, index) => {
        if (variant?.attributes?.[attribute]) {
          return (
            <Variant
              key={index}
              className={`mt-25 border-b border-b-neutral-400 pb-20`}
              variants={product?.variants}
              currentVariant={variant}
              attribute={attribute}
              onClick={updateVariantId}
            />
          );
        }
      })}
    </div>
  );
};

export default ProductInformation;
