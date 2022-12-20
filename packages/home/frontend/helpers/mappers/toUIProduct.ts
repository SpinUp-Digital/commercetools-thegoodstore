import { UIColor, UIProduct, UISize } from 'components/commercetools-ui/organisms/products/product-details/types';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';

export const toUIProduct = (product: Product, variant: Variant, colors: UIColor[], sizes: UISize[]) => {
  const mappedProduct: UIProduct = {
    name: product?.name,
    variants: product?.variants,
    price: variant?.price,
    images: variant?.images?.map((img: string, id: number) => ({
      id: `${variant?.sku}-${id}`,
      src: img,
      alt: variant?.sku,
    })),
    colors,
    sizes,
    description: `
          <p>${product.description || ''}</p>
        `,

    details: [
      {
        name: 'Features',
        items: [
          variant?.attributes.designer && `Designer: ${variant?.attributes.designer.label}`,
          variant?.attributes.gender && `Collection: ${variant?.attributes.gender.label}`,
          variant?.attributes.madeInItaly && `Made in Italy`,
        ],
      },
    ],
  };

  return mappedProduct;
};
