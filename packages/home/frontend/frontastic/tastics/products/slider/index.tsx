import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductSlider, { ProductSliderProps } from 'components/commercetools-ui/organisms/product/product-slider';
import { Tastic } from 'types/tastic';

function ProductSliderTastic({ data }: Tastic<{ items: Product[] }, ProductSliderProps>) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mobile, tablet, desktop, ...props } = data;

  return <ProductSlider {...props} products={data.data.dataSource.items} />;
}

export default ProductSliderTastic;
