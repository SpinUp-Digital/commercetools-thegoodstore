import React, { FC, useCallback, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import Slider from 'components/commercetools-ui/atoms/slider';
import HeartIcon from 'components/icons/heart';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import usePreloadImages from 'helpers/hooks/usePreloadImages';
import { desktop } from 'helpers/utils/screensizes';
import { useWishlist } from 'frontastic';
import Image from 'frontastic/lib/image';
import QuickView from '../product-quick-view';

interface TileProps {
  product: Product;
}

const Tile: FC<TileProps> = ({ product }) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  usePreloadImages(
    product.variants.map((variant) => variant.images[0]),
    'medium',
  );

  const variantWithDiscount = useMemo(() => {
    let variantReturned: Variant;

    for (const variant of product?.variants) {
      if (variant.discountedPrice && (!variantReturned || variant.discountedPrice < variantReturned.discountedPrice)) {
        variantReturned = variant;
      }
    }

    return variantReturned;
  }, [product?.variants]);

  const discountedPrice = useMemo(() => variantWithDiscount?.discountedPrice, [variantWithDiscount]);

  const discountPercentage = useMemo(
    () =>
      variantWithDiscount
        ? ((variantWithDiscount.price.centAmount - discountedPrice.centAmount) / variantWithDiscount.price.centAmount) *
          100
        : 0,
    [discountedPrice, variantWithDiscount],
  );

  const [selectedVariant, setSelectedVariant] = useState(() => variantWithDiscount ?? product?.variants[0]);

  const { addToWishlist, removeLineItem, data } = useWishlist();

  const [processing, setProcessing] = useState(false);

  const wishlistLineItem = useMemo(() => {
    return data?.lineItems?.find((lineItem) =>
      product?.variants.find((variant) => variant.sku === lineItem.variant?.sku),
    );
  }, [data, product?.variants]);

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
        onClick={() => setImageHovered(false)}
      >
        {isDesktopSize ? (
          <Slider
            slidesPerView={1}
            arrows={imageHovered && selectedVariant.images.length > 1}
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
            allowTouchMove={false}
          >
            {selectedVariant.images.map((image, index) => (
              <div key={index} className="relative bg-white p-8 md:p-16">
                <NextLink href={product._url}>
                  <a className="relative block w-full" style={{ paddingBottom: '122%' }}>
                    <Image
                      src={image}
                      suffix="medium"
                      alt={product.name}
                      objectFit="contain"
                      objectPosition="center"
                      className="w-full rounded-sm group-hover:opacity-75 md:p-16"
                    />
                  </a>
                </NextLink>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="relative bg-white p-8 md:p-16">
            <NextLink href={product._url}>
              <a className="relative block w-full" style={{ paddingBottom: '122%' }}>
                <Image
                  src={selectedVariant.images[0]}
                  suffix="medium"
                  alt={product.name}
                  objectFit="contain"
                  objectPosition="center"
                  className="w-full rounded-sm group-hover:opacity-75 md:p-16"
                />
              </a>
            </NextLink>
          </div>
        )}
        <span
          onClick={handleAddToWishlist}
          className="absolute right-0 top-0 z-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center md:h-[48px] md:w-[48px]"
        >
          <HeartIcon
            className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
            pathClassName={`transition duration-150 ease-out hover:fill-accent-red hover:stroke-accent-red ${
              wishlistLineItem ? 'fill-accent-red stroke-accent-red' : 'fill-white stroke-secondary-black'
            }`}
          />
        </span>
        <div className="absolute left-0 bottom-0 z-10 w-full text-center">
          {variantWithDiscount && (
            <span className="ml-8 mb-8 flex h-[25px] w-[45px] items-center justify-center bg-accent-red text-12 text-neutral-100">
              {Math.round(discountPercentage)}%
            </span>
          )}

          <QuickView imageHovered={imageHovered} isDesktopSize={isDesktopSize} product={product} />
        </div>
      </div>
      <div>
        <NextLink href={product?._url}>
          <a className="mt-4 block max-w-[80%] overflow-hidden text-ellipsis whitespace-pre text-12 uppercase leading-loose md:mt-12 md:text-14">
            {product?.name}
          </a>
        </NextLink>
        <div className="my-8 flex items-center gap-4 md:my-12">
          {product?.variants.map((variant, index) => (
            <span
              key={index}
              className={`block cursor-pointer rounded-full border p-[6px] ${
                variant.sku !== selectedVariant.sku ? 'border-neutral-300' : 'border-neutral-500'
              }`}
              style={{ backgroundColor: variant.attributes.color || variant.attributes.finish }}
              onClick={() => setSelectedVariant(variant)}
            ></span>
          ))}
        </div>
        <NextLink href={product?._url}>
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
                {CurrencyHelpers.formatForCurrency(product?.variants[0].price)}
              </span>
            )}
          </a>
        </NextLink>
      </div>
    </div>
  );
};

export default Tile;
