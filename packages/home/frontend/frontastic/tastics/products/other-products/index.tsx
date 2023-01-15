import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductSlider, { Props as ProductSliderProps } from 'components/commercetools-ui/organisms/products/slider';
import { Tastic } from 'types/tastic';

function OtherProductsTastic({ data }: Tastic<{ items: Product[] }, ProductSliderProps>) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  return (
    <div className="bg-neutral-200 px-[48px] pb-64 md:px-[104px]">
      <ProductSlider {...data} products={data.data.dataSource.items} wrapperVariant="none" clearDefaultWrapperStyles />
    </div>
  );
}

export default OtherProductsTastic;
