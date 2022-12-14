import ProductList from 'components/commercetools-ui/organisms/products/product-list';
import InstantSearch from 'components/HOC/InstantSearch';
import { InstantSearchServerState, InstantSearchSSRProvider } from 'react-instantsearch-hooks';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { productsIndex } from 'helpers/constants/algolia';

interface Props {
  serverUrl: string;
  serverState?: InstantSearchServerState;
  categories: any;
}

function ProductListTastic({ serverUrl, serverState, categories }: Props) {
  return (
    <InstantSearchSSRProvider {...(serverState ?? {})}>
      <InstantSearch
        indexName={productsIndex}
        routing={{
          router: history({
            getLocation: () =>
              typeof window === 'undefined' ? (new URL(serverUrl) as unknown as Location) : window.location,
          }),
        }}
      >
        <ProductList serverUrl={serverUrl} categories={categories} />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export default ProductListTastic;
