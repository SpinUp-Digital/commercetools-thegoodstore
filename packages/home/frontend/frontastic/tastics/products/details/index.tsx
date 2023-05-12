import { FC } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductDetailsAdapter from 'components/commercetools-ui/organisms/product/product-details/helpers/adapter';
import { Tastic } from 'types/tastic';

type ProductDetailsTasticProps = Tastic<{ product: Product }>;

const ProductDetailsTastic: FC<React.PropsWithChildren<ProductDetailsTasticProps>> = ({ data }) => {
  if (!data?.data?.dataSource.product) return null;

  return <ProductDetailsAdapter product={data?.data?.dataSource.product} />;
};

export default ProductDetailsTastic;
