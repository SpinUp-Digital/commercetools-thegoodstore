import { Product } from '@Types/product/Product';
import ProductDetailsAdapter from 'components/commercetools-ui/organisms/products/product-details/adapter';
import { FC } from 'react';
import { Tastic } from 'types/tastic';

type ProductDetailsTasticProps = Tastic<{ product: Product }>;

const ProductDetailsTastic: FC<ProductDetailsTasticProps> = ({ data }) => {
  if (!data?.data?.dataSource.product) return null;

  return <ProductDetailsAdapter product={data?.data?.dataSource.product} />;
};

export default ProductDetailsTastic;
