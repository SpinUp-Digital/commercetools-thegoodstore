import React, { useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Money } from '@Types/product/Money';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import classNames from 'classnames';
import Slider from 'components/commercetools-ui/slider';
import HeartIcon from 'components/icons/heart';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import { useFormat } from 'helpers/hooks/useFormat';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop } from 'helpers/utils/screensizes';
import { useWishlist } from 'frontastic';
import Image from 'frontastic/lib/image';

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

  const [selectedVariant, setSelectedVariant] = useState(() => variantWithDiscount ?? variants[0]);

  const { addToWishlist, removeLineItem, data } = useWishlist();

  const [processing, setProcessing] = useState(false);

  const wishlistLineItem = useMemo(() => {
    return data?.lineItems?.find((lineItem) => variants.find((variant) => variant.sku === lineItem.variant?.sku));
  }, [data, variants]);

  const handleAddToWishlist = useCallback(async () => {
    if (processing) return;

    setProcessing(true);

    if (wishlistLineItem) await removeLineItem(wishlistLineItem.lineItemId);
    else await addToWishlist(selectedVariant.sku, 1);

    setProcessing(false);
  }, [addToWishlist, selectedVariant, wishlistLineItem, processing]);

  const [imageHovered, setImageHovered] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="relative w-full"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <Slider
          key={`${isDesktopSize}`}
          slidesPerView={1}
          arrows={imageHovered && isDesktopSize && selectedVariant.images.length > 1}
          spaceBetween={0}
          prevButtonStyles={{
            left: 25,
            padding: '7px',
            transform: 'translateY(-50%) rotateZ(135deg)',
            borderWidth: '0 1.5px 1.5px 0',
          }}
          nextButtonStyles={{
            right: 25,
            padding: '7px',
            transform: 'translateY(-50%) rotateZ(-45deg)',
            borderWidth: '0 1.5px 1.5px 0',
          }}
          dots={false}
          loop
          // allowTouchMove={!isDesktopSize && selectedVariant.images.length > 1}
          allowTouchMove={false}
        >
          {selectedVariant.images.map((image, index) => (
            <div key={index} className="relative bg-white p-36 md:p-16">
              <NextLink href={_url}>
                <a>
                  <Image
                    src={image}
                    alt={name}
                    className="h-[175px] w-full rounded-sm object-contain object-center group-hover:opacity-75 md:h-[360px] md:p-16"
                  />
                </a>
              </NextLink>
            </div>
          ))}
        </Slider>
        <span
          onClick={handleAddToWishlist}
          className="absolute right-0 top-0 z-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center md:h-[48px] md:w-[48px]"
        >
          <HeartIcon
            className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
            pathClassName={`transition duration-150 ease-out hover:fill-accent-red hover:stroke-accent-red ${
              wishlistLineItem ? 'fill-accent-red stroke-accent-red' : ''
            }`}
          />
        </span>
        <div className="absolute left-0 bottom-0 z-10 w-full text-center">
          {variantWithDiscount && (
            <span className="ml-8 mb-8 flex h-[25px] w-[45px] items-center justify-center bg-accent-red text-12 text-neutral-100">
              {Math.round(discountPercentage)}%
            </span>
          )}
          <button
            className={`w-full border border-neutral-400 bg-white py-16 text-center text-12 capitalize leading-[16px] transition duration-150 ease-out hover:border-primary-black ${
              imageHovered && isDesktopSize ? 'block' : 'hidden'
            }`}
          >
            {formatProductMessage({ id: 'quick.view', defaultMessage: 'Quick view' })}
          </button>
        </div>
      </div>
      <div>
        <NextLink href={_url}>
          <a className="mt-4 block max-w-[80%] overflow-hidden text-ellipsis whitespace-pre text-12 uppercase leading-loose md:mt-12 md:text-14">
            {name}
          </a>
        </NextLink>
        <div className="my-8 flex items-center gap-4 md:my-12">
          {variants.map((variant) => (
            <span
              key={variant.attributes.color}
              className={`block cursor-pointer rounded-full border p-[6px] ${
                variant.sku !== selectedVariant.sku ? 'border-neutral-300' : 'border-neutral-500'
              }`}
              style={{ backgroundColor: variant.attributes.color || variant.attributes.finish }}
              onClick={() => setSelectedVariant(variant)}
            ></span>
          ))}
        </div>
        <NextLink href={_url}>
          <a>
            {variantWithDiscount ? (
              <div className="flex items-center gap-8">
                <span className="block text-14 font-semibold leading-loose text-accent-red">
                  {CurrencyHelpers.formatForCurrency(discountedPrice)}
                </span>
                <span className="block text-12 leading-loose text-gray-500 line-through">
                  {CurrencyHelpers.formatForCurrency(variantWithDiscount.price)}
                </span>
              </div>
            ) : (
              <span className="block text-12 font-semibold leading-loose md:text-14">
                {CurrencyHelpers.formatForCurrency(variants[0].price)}
              </span>
            )}
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Tile;
