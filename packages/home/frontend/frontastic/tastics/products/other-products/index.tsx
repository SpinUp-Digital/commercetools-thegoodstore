import { Product } from '@commercetools/frontend-domain-types/product/Product';
import ProductSlider, { ProductSliderProps } from 'components/commercetools-ui/organisms/product/product-slider';
import { Tastic } from 'types/tastic';

function OtherProductsTastic({ data }: Tastic<{ items: Product[] }, ProductSliderProps>) {
  if (!data?.data?.dataSource?.items) return <></>;

  if (data.variant === 'cart')
    return (
      <div className="bg-neutral-200 px-[48px] pb-64 md:px-[104px]">
        <ProductSlider {...data} products={data.data.dataSource.items ?? []} clearDefaultWrapperStyles />
      </div>
    );

  return <ProductSlider {...data} products={data.data.dataSource.items ?? []} />;
}

export default OtherProductsTastic;
