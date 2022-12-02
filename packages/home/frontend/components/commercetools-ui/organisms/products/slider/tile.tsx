import React, { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Product } from '@commercetools/domain-types/product/Product';
import { Variant } from '@commercetools/domain-types/product/Variant';
import { LineItem } from '@commercetools/domain-types/wishlist/LineItem';
import Typography from 'components/commercetools-ui/atoms/typography';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import usePreloadImages from 'helpers/hooks/usePreloadImages';
import { desktop } from 'helpers/utils/screensizes';
import Image from 'frontastic/lib/image';
import WishlistButton from '../../wishlist-button';
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
  }, [product]);

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

  const [imageHovered, setImageHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const showButton = useMemo(
    () => (imageHovered || buttonHovered) && isDesktopSize,
    [imageHovered, buttonHovered, isDesktopSize],
  );

  const productToWishlistLineItem = useMemo<LineItem>(() => {
    if (product) {
      return {
        lineItemId: product.productId,
        productId: product.productId,
        name: product.name,
        count: 1,
        variant: selectedVariant,
        addedAt: new Date(),
        _url: product._url,
      };
    }
  }, [product, selectedVariant]);

  return (
    <div>
      <div className="relative">
        <NextLink href={product._url}>
          <a>
            <div
              className="relative w-full"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <div className="relative bg-white p-8 md:p-16">
                <div className="relative block w-full" style={{ paddingBottom: '122%' }}>
                  <Image
                    src={selectedVariant.images[0]}
                    suffix="medium"
                    alt={product.name}
                    objectFit="contain"
                    objectPosition="center"
                    className="w-full rounded-sm group-hover:opacity-75 md:p-16"
                  />
                </div>
              </div>
              <span
                className="absolute right-0 top-0 z-10 flex h-[32px] w-[32px] cursor-pointer items-center justify-center md:h-[48px] md:w-[48px]"
                onClick={(e) => e.preventDefault()}
              >
                <WishlistButton
                  lineItem={productToWishlistLineItem}
                  className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
                />
              </span>
              <div className="absolute left-0 bottom-0 z-10 w-full text-center">
                {variantWithDiscount && (
                  <span className="ml-8 mb-8 flex h-[25px] w-[45px] items-center justify-center bg-accent-red text-12 text-neutral-100">
                    {Math.round(discountPercentage)}%
                  </span>
                )}
              </div>
            </div>
          </a>
        </NextLink>

        <div
          className="absolute bottom-0 w-full"
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          <QuickView showButton={showButton} product={product} />
        </div>
      </div>

      <NextLink href={product._url}>
        <a>
          <div>
            <div className="mt-4 block max-w-[80%] overflow-hidden text-ellipsis whitespace-pre text-12 uppercase leading-loose md:mt-12 md:text-14">
              {product?.name}
            </div>
            <div className="my-8 flex items-center gap-4 md:my-12">
              {product?.variants.map((variant, index) => (
                <span
                  key={index}
                  className={`block cursor-pointer rounded-full border p-[6px] ${
                    variant.sku !== selectedVariant.sku ? 'border-neutral-300' : 'border-neutral-500'
                  }`}
                  style={{ backgroundColor: variant.attributes.color || variant.attributes.finish }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                ></span>
              ))}
            </div>
            <div>
              {variantWithDiscount ? (
                <div className="flex items-center gap-8">
                  <Typography as="h4" medium lineHeight="loose" fontSize={11} className="text-accent-red  md:text-14">
                    {CurrencyHelpers.formatForCurrency(discountedPrice)}
                  </Typography>
                  <Typography
                    as="h5"
                    medium
                    lineHeight="loose"
                    fontSize={10}
                    className="text-gray-500 line-through md:text-12"
                  >
                    {CurrencyHelpers.formatForCurrency(variantWithDiscount.price)}
                  </Typography>
                </div>
              ) : (
                <Typography as="h4" medium fontSize={11} lineHeight="loose" className="md:text-14">
                  {CurrencyHelpers.formatForCurrency(selectedVariant.price)}
                </Typography>
              )}
            </div>
          </div>
        </a>
      </NextLink>
    </div>
  );
};

export default Tile;
