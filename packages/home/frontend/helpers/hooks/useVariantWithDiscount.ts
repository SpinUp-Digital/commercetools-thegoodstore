import { useMemo } from 'react';
import { Variant } from 'types/product';

const useVariantWithDiscount = (variants: Partial<Variant>[]) => {
  const variant = useMemo(() => {
    return variants.reduce(
      (acc: Partial<Variant> | undefined, curr) =>
        curr.discountedPrice && (!acc || ((acc as Partial<Variant>)?.discountedPrice as number) > curr.discountedPrice)
          ? curr
          : acc,
      undefined,
    );
  }, [variants]);

  return variant;
};

export default useVariantWithDiscount;
