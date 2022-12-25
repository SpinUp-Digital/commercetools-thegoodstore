import { useEffect, useMemo } from 'react';
import ProductList from 'components/commercetools-ui/organisms/products/product-list';
import InstantSearch from 'components/HOC/InstantSearch';
import { InstantSearchServerState, InstantSearchSSRProvider, useClearRefinements } from 'react-instantsearch-hooks';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { productsIndex } from 'helpers/constants/algolia';
import {
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/products/product-list/types';
import ProductListProvider, {
  useProductList,
} from 'components/commercetools-ui/organisms/products/product-list/context';
import { UiState } from 'instantsearch.js';
import { useRouter } from 'next/router';

export interface Props {
  serverUrl: string;
  serverState?: InstantSearchServerState;
  categories: any;
  data: {
    categoryId?: string;
    searchQuery?: string;
    facetsConfiguration: FacetConfiguration[];
    pricesConfiguration: PriceConfiguration[];
  };
}

function ProductListTastic({ serverUrl, serverState, categories, data }: Props) {
  const { updatePricesConfiguration } = useProductList();

  const { refine: clearAllRefinements } = useClearRefinements();

  const router = useRouter();

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

  useEffect(() => {
    updatePricesConfiguration(pricesConfiguration);
  }, [pricesConfiguration]);

  useEffect(() => {
    if (!router) return;

    router.events.on('routeChangeComplete', clearAllRefinements);

    return () => router.events.off('routeChangeComplete', clearAllRefinements);
  }, [clearAllRefinements, router]);

  return (
    <ProductList
      categoryId={data.categoryId}
      searchQuery={data.searchQuery}
      categories={categories}
      facetsConfiguration={facetsConfiguration}
    />
  );
}

function ProductListTasticWrapper({ serverUrl, serverState, ...props }: Props) {
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
        <ProductListProvider>
          <ProductListTastic serverUrl={serverUrl} serverState={serverState} {...props} />
        </ProductListProvider>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export default ProductListTasticWrapper;
