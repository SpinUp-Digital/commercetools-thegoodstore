import React, { FC, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { LineItem } from '@commercetools/frontend-domain-types/wishlist/LineItem';
import OutOfStock from 'components/commercetools-ui/atoms/out-of-stock';
import QuickView from 'components/commercetools-ui/organisms/product/product-quick-view';
import Prices from 'components/commercetools-ui/organisms/product/product-tile/prices';
import WishlistButton from 'components/commercetools-ui/organisms/wishlist/components/wishlist-button';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useVariantWithDiscount from 'helpers/hooks/useVariantWithDiscount';
import { desktop } from 'helpers/utils/screensizes';
import { Variant } from 'types/product';
import Image from 'frontastic/lib/image';
import useTrack from './useTrack';

interface ProductTileProps {
  product: Product;
  onClick?: () => void;
  isSearchResult?: boolean;
  disableQuickView?: boolean;
  disableWishlistButton?: boolean;
  disableVariants?: boolean;
}

const ProductTile: FC<React.PropsWithChildren<ProductTileProps>> = ({
  product,
  onClick,
  isSearchResult = false,
  disableQuickView = false,
  disableWishlistButton = false,
  disableVariants = false,
}) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  const { ref } = useTrack({ product });

  const variantWithDiscount = useVariantWithDiscount(product.variants) as Variant;

  const discountedPrice = useMemo(() => variantWithDiscount?.discountedPrice, [variantWithDiscount]);

  const discountPercentage = useMemo(
    () =>
      variantWithDiscount
        ? (((variantWithDiscount.price?.centAmount as number) - (discountedPrice?.centAmount as number)) /
            (variantWithDiscount.price?.centAmount as number)) *
          100
        : 0,
    [discountedPrice, variantWithDiscount],
  );

  const [selectedVariant, setSelectedVariant] = useState(() => variantWithDiscount ?? product?.variants[0]);

  const [imageHovered, setImageHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const buttonIsVisible = useMemo(
    () => (imageHovered || buttonHovered) && isDesktopSize,
    [imageHovered, buttonHovered, isDesktopSize],
  );

  const hideButton = () => {
    setImageHovered(false);
    setButtonHovered(false);
  };

  const productToWishlistLineItem = useMemo<LineItem | undefined>(() => {
    if (product) {
      return {
        lineItemId: product.productId ?? '',
        productId: product.productId,
        name: product.name,
        count: 1,
        variant: selectedVariant,
        addedAt: new Date(),
        _url: product._url,
      };
    }
  }, [product, selectedVariant]);

  const productUrl = useMemo(() => {
    if (!product._url) return '#';

    if (isSearchResult) return `${product._url}?sr=1`;
    return product._url;
  }, [product._url, isSearchResult]);

  return (
    <div onClick={onClick} ref={ref}>
      <div className="relative">
        <NextLink href={productUrl}>
          <div
            className="relative w-full"
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            <div className="relative bg-white p-8 md:p-16">
              <div className="relative block w-full" style={{ paddingBottom: '122%' }}>
                <Image
                  fill
                  src={selectedVariant.images?.[0]}
                  suffix="medium"
                  alt={product.name ?? ''}
                  className="w-full rounded-sm group-hover:opacity-75 md:p-16"
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <span
              className="absolute right-0 top-0 z-[5] flex h-[32px] w-[32px] cursor-pointer items-center justify-center md:h-[48px] md:w-[48px]"
              onClick={(e) => e.preventDefault()}
            >
              {!disableWishlistButton && productToWishlistLineItem && (
                <WishlistButton
                  lineItem={productToWishlistLineItem}
                  className="h-[16px] w-[16px] md:h-[20px] md:w-[20px] lg:h-[24px] lg:w-[24px]"
                />
              )}
            </span>
          </div>
        </NextLink>

        <div
          className="absolute bottom-0 z-10 w-full"
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          <div className="w-full text-center">
            {variantWithDiscount && (
              <span className="mb-8 ml-8 flex h-[25px] w-[45px] items-center justify-center bg-accent-red text-12 text-neutral-100">
                {Math.round(discountPercentage)}%
              </span>
            )}
          </div>
          <div className="w-full text-center">
            {!selectedVariant.isOnStock && (
              <div className="mb-8 ml-8">
                <OutOfStock variant={selectedVariant} />
              </div>
            )}
          </div>
          <QuickView buttonIsVisible={buttonIsVisible && !disableQuickView} hideButton={hideButton} product={product} />
        </div>
      </div>

      <NextLink href={productUrl}>
        <div>
          <div className="mt-4 block max-w-[80%] overflow-hidden text-ellipsis whitespace-pre text-12 uppercase leading-loose md:mt-12 md:text-14">
            {product?.name}
          </div>
          {!disableVariants && (
            <div className="mt-8 flex items-center gap-4 md:mt-12">
              {product?.variants.map((variant, index) => (
                <span
                  key={index}
                  className={`block cursor-pointer rounded-full border p-[6px] ${
                    variant.sku !== selectedVariant.sku ? 'border-neutral-300' : 'border-neutral-500'
                  }`}
                  style={{ backgroundColor: variant.attributes?.color || variant.attributes?.finish }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                ></span>
              ))}
            </div>
          )}
          <div className="mt-8 md:mt-12">
            <Prices
              price={variantWithDiscount?.price ?? selectedVariant?.price}
              discountedPrice={variantWithDiscount?.discountedPrice}
            />
          </div>
        </div>
      </NextLink>
    </div>
  );
};

export default ProductTile;
