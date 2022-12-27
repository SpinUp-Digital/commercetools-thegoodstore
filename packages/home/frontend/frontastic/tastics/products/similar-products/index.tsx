import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductSlider, { Props as ProductSliderProps } from 'components/commercetools-ui/organisms/products/slider';
import { Tastic } from 'types/tastic';

function SimilarProductsTastic({ data }: Tastic<{ items: Product[] }, ProductSliderProps>) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  return <ProductSlider {...data} products={data.data.dataSource.items} />;
}

export default SimilarProductsTastic;
