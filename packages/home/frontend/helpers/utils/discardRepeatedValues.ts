import { Variant } from '@commercetools/frontend-domain-types/product/Variant';

export const discardRepeatedValues = (variants: Variant[], attribute: string) => {
  const uniqueValues: { [key: string]: boolean } = {};

  const variantsToDisplay = variants?.filter((variant) => {
    const value = variant.attributes?.[attribute];

    if (!value || uniqueValues[value]) return false;
    else {
      uniqueValues[value] = true;
      return true;
    }
  });

  return variantsToDisplay;
};
