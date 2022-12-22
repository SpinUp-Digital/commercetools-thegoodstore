import { useMemo } from 'react';
import ProductList from 'components/commercetools-ui/organisms/products/product-list';
import InstantSearch from 'components/HOC/InstantSearch';
import { InstantSearchServerState, InstantSearchSSRProvider } from 'react-instantsearch-hooks';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { productsIndex } from 'helpers/constants/algolia';
import {
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/products/product-list/types';

export interface Props {
  serverUrl: string;
  serverState?: InstantSearchServerState;
  categories: any;
  data: {
    facetsConfiguration: FacetConfiguration[];
    pricesConfiguration: PriceConfiguration[];
  };
}

function ProductListTastic({ serverUrl, serverState, categories, data }: Props) {
  const facetsConfiguration = useMemo<Record<string, FacetConfiguration>>(() => {
    return (data.facetsConfiguration ?? []).reduce(
      (acc, configuration) => ({
        ...acc,
        [configuration.key]: {
          type: configuration.type,
          label: configuration.label,
        } as FacetConfiguration,
      }),
      {},
    );
  }, [data.facetsConfiguration]);

  const pricesConfiguration = useMemo<Record<string, PriceConfiguration>>(() => {
    return (data.pricesConfiguration ?? []).reduce(
      (acc, configuration) => ({
        ...acc,
        [configuration.key]: {
          ranges: configuration.ranges,
        } as PriceConfiguration,
      }),
      {},
    );
  }, [data.pricesConfiguration]);

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
        <ProductList
          serverUrl={serverUrl}
          categories={categories}
          facetsConfiguration={facetsConfiguration}
          pricesConfiguration={pricesConfiguration}
        />
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export default ProductListTastic;
