import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductSlider, { ProductSliderProps } from 'components/commercetools-ui/organisms/product/product-slider';
import { Tastic } from 'types/tastic';

function ProductSliderTastic({ data }: Tastic<{ items: Product[] }, ProductSliderProps>) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  return <ProductSlider {...data} products={data.data.dataSource.items} />;
}

export default ProductSliderTastic;
