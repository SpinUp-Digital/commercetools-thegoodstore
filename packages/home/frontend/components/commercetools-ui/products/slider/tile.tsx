import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { Product } from '@Types/product/Product';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import Image from 'frontastic/lib/image';
import { Money } from '@Types/product/Money';
import { Variant } from '@Types/product/Variant';

const Tile: React.FC<Product> = ({ variants, name, _url }) => {
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

  return (
    <NextLink href={_url}>
      <a className="relative w-full">
        {variantWithDiscount && (
          <div className="absolute right-[24px] top-[16px] flex h-[30px] w-[40px] items-center justify-center rounded bg-danger-400 text-center text-xs text-white sm:right-[42px] ">
            <span>-{Math.round(discountPercentage)}%</span>
          </div>
        )}
        <Image src={variants[0].images[0]} alt={name} className="aspect-[3/4] w-full group-hover:opacity-75" />
        <div>
          <h3 className="mt-4 overflow-hidden truncate text-xs font-normal uppercase text-gray-700 sm:text-sm">
            {name}
          </h3>
          {variantWithDiscount ? (
            <div className="flex items-center gap-2 sm:mt-2">
              <span className="text-xm block font-semibold text-danger-400 sm:text-base">
                {CurrencyHelpers.formatForCurrency(discountedPrice)}
              </span>
              <span className="text-xm block text-gray-500 line-through sm:text-sm">
                {CurrencyHelpers.formatForCurrency(variantWithDiscount.price)}
              </span>
            </div>
          ) : (
            <span className="text-xm block font-semibold text-gray-900 sm:text-base md:mt-2">
              {CurrencyHelpers.formatForCurrency(variants[0].price)}
            </span>
          )}
        </div>
      </a>
    </NextLink>
  );
};

export default Tile;
