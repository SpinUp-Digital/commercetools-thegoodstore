import { useMemo } from 'react';
import { Variant } from '@commercetools/domain-types/product/Variant';

const useVariantWithDiscount = (variants: Partial<Variant>[]) => {
  const variant = useMemo(() => {
    return variants.reduce(
      (acc, curr) => (curr.discountedPrice && (!acc || acc.discountedPrice > curr.discountedPrice) ? curr : acc),
      undefined,
    );
  }, [variants]);

  return variant;
};

export default useVariantWithDiscount;
