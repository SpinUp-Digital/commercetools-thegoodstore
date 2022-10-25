import ProductSlider from 'components/commercetools-ui/products/slider';

function OtherProductsTastic({ data }) {
  if (!data?.data?.dataSource?.items) return <p>No products found.</p>;

  return <ProductSlider {...data} products={data.data.dataSource.items} />;
}

export default OtherProductsTastic;
