import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { UISize } from 'components/commercetools-ui/products/product-details/types';

export const toUISize = (product: Product) => {
  const mappedSizes: UISize[] = [
    ...new Map(
      product.variants?.map((variant: Variant) => [
        variant.attributes.commonSize?.label,
        variant.attributes.commonSize,
      ]),
    ).values(),
  ];

  return mappedSizes;
};
