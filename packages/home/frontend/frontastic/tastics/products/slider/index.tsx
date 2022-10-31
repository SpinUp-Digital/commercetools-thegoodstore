import ProductSlider from 'components/commercetools-ui/organisms/products/slider';

function ProductSliderTastic({ data }) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  return <ProductSlider {...data} products={data.data.dataSource.items} />;
}

export default ProductSliderTastic;
