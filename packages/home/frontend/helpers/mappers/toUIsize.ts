import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import { UISize } from 'components/commercetools-ui/organisms/products/product-details/types';

export const toUISize = (product: Product) => {
  const mappedSizes: UISize[] = [
    ...new Map(
      product.variants?.map((variant: Variant) => [
        variant.attributes?.commonSize?.label,
        variant.attributes?.commonSize,
      ]),
    ).values(),
  ];

  return mappedSizes;
};
