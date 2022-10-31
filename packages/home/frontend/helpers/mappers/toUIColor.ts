import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { UIColor } from 'components/commercetools-ui/organisms/products/product-details/types';

const grayFix = (word: string) => (word === 'grey' ? 'gray' : word);

export const toUIColor = (product: Product) => {
  const mappedColors: UIColor[] = [
    ...new Map(
      product.variants?.map((variant: Variant) => [
        variant.attributes.color?.label,
        {
          name: variant.attributes.color?.label,
          key: variant.attributes.color?.key,
          bgColor: `bg-${grayFix(variant.attributes.color?.key)}-500`,
          selectedColor: `ring-${grayFix(variant.attributes.color?.key)}-500`,
        },
      ]),
    ).values(),
  ];

  return mappedColors;
};
