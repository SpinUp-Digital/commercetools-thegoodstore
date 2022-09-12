import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import Slider from 'components/commercetools-ui/slider';
import HeartIcon from 'components/icons/heart';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import { useWishlist } from 'frontastic';
import Image from 'frontastic/lib/image';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';

const Tile: React.FC<Product> = ({ variants, name, _url }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const [isDesktopSize] = useMediaQuery(desktop);

  const variantWithDiscount = useMemo(() => {
    let variantReturned: Variant;

    for (const variant of variants) {
      if (variant.discountedPrice && (!variantReturned || variant.discountedPrice < variantReturned.discountedPrice)) {
        variantReturned = variant;
      }
    }

    return variantReturned;
  }, [variants]);

  const discountedPrice = useMemo(() => variantWithDiscount?.discountedPrice, [variantWithDiscount]);

  const discountPercentage = useMemo(
    () =>
      variantWithDiscount
        ? ((variantWithDiscount.price.centAmount - discountedPrice.centAmount) / variantWithDiscount.price.centAmount) *
          100
        : 0,
    [discountedPrice, variantWithDiscount],
  );

  const selectedVariant = useMemo(() => variantWithDiscount ?? variants[0], [variantWithDiscount]);

  const { addToWishlist, removeLineItem, data } = useWishlist();

  const [processing, setProcessing] = useState(false);

  const wishlistLineItem = useMemo(() => {
    return data?.lineItems?.find((lineItem) => variants.find((variant) => variant.sku === lineItem.variant?.sku));
  }, [data, variants]);

  const handleAddToWishlist = useCallback(
    async (e: React.MouseEvent) => {
      if (processing) return;

      setProcessing(true);

      if (wishlistLineItem) await removeLineItem(wishlistLineItem.lineItemId);
      else await addToWishlist(selectedVariant.sku, 1);

      setProcessing(false);
    },
    [addToWishlist, selectedVariant, wishlistLineItem, processing],
  );

  const [imageHovered, setImageHovered] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="relative w-full"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <Slider
          slidesPerView={1}
          arrows={imageHovered && isDesktopSize}
          spaceBetween={0}
          prevButtonStyles={{ left: 25, padding: '7px', transform: 'translateY(-50%) rotateZ(135deg)' }}
          nextButtonStyles={{ right: 25, padding: '7px', transform: 'translateY(-50%) rotateZ(-45deg)' }}
          dots={false}
          loop
        >
          {selectedVariant.images.map((image, index) => (
            <Image key={index} src={image} alt={name} className="aspect-[3/4] w-full group-hover:opacity-75" />
          ))}
        </Slider>
        <span onClick={handleAddToWishlist}>
          <HeartIcon
            className="absolute right-[16px] top-[16px] z-10 h-[6.5%] w-[8%] cursor-pointer"
            pathClassName={`transition duration-150 ease-out hover:fill-accent-400 hover:stroke-accent-400 ${
              wishlistLineItem ? 'fill-accent-400 stroke-accent-400' : ''
            }`}
          />
        </span>
        <div className="absolute left-0 bottom-0 z-10 w-full text-center">
          {variantWithDiscount && (
            <span className="ml-[16px] mb-[16px] flex h-[25px] w-[45px] items-center justify-center bg-danger-400 text-xs text-white">
              {Math.round(discountPercentage)}%
            </span>
          )}
          <NextLink href={_url}>
            <a>
              <button
                className={`w-full border border-neutral-400 bg-white py-4 text-center text-sm capitalize transition duration-150 ease-out hover:border-dark-400 ${
                  imageHovered ? 'block' : 'hidden'
                }`}
              >
                {formatProductMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
              </button>
            </a>
          </NextLink>
        </div>
      </div>
      <div>
        <NextLink href={_url}>
          <a>
            <h3 className="mt-4 overflow-hidden truncate text-xs font-normal uppercase text-gray-700 sm:text-sm">
              {name}
            </h3>
          </a>
        </NextLink>
        <div className="mt-2 flex items-center gap-1">
          {variants
            ?.map((variant) => variant.attributes?.colorFreeDefinition)
            .filter((variant, index, arr) => variant && arr.indexOf(variant) === index)
            .map((color) => (
              <span
                key={color}
                className="block rounded-full border border-gray-300 p-[6px]"
                style={{ backgroundColor: color }}
              ></span>
            ))}
        </div>
        {variantWithDiscount ? (
          <div className="mt-2 flex items-end gap-2">
            <span className="block text-xs font-semibold text-danger-400 sm:text-sm">
              {CurrencyHelpers.formatForCurrency(discountedPrice)}
            </span>
            <span className="block text-xs text-gray-500 line-through">
              {CurrencyHelpers.formatForCurrency(variantWithDiscount.price)}
            </span>
          </div>
        ) : (
          <span className="mt-2 block text-xs font-semibold text-gray-900 sm:text-sm">
            {CurrencyHelpers.formatForCurrency(variants[0].price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Tile;
