import { FC } from 'react';
import { Product } from 'shared/types/product/Product';
import ProductDetailsAdapter from 'components/commercetools-ui/organisms/product/product-details/helpers/adapter';
import { Tastic } from 'types/tastic';

type ProductDetailsTasticProps = Tastic<{ product: Product }>;

const ProductDetailsTastic: FC<ProductDetailsTasticProps> = ({ data }) => {
  if (!data?.data?.dataSource.product) return null;

  return <ProductDetailsAdapter product={data?.data?.dataSource.product} />;
};

export default ProductDetailsTastic;
