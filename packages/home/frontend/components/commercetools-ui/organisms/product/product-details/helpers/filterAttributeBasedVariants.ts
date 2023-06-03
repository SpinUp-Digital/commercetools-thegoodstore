import { Variant } from '@commercetools/frontend-domain-types/product';

export const filterAttributeBasedVariants = (variants: Variant[], currentVariant: Variant, attribute: string) => {
  const filteredVariants = variants?.filter(
    ({ attributes }) => attributes?.[attribute] === currentVariant.attributes?.[attribute],
  );
  return filteredVariants;
};
