import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UiState } from 'instantsearch.js';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { InstantSearchServerState, InstantSearchSSRProvider, useClearRefinements } from 'react-instantsearch-hooks';
import NotFound from 'components/commercetools-ui/organisms/not-found';
import ProductList from 'components/commercetools-ui/organisms/product/product-list-algolia';
import ProductListProvider, {
  useProductList,
} from 'components/commercetools-ui/organisms/product/product-list-algolia/context';
import {
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/product/product-list-algolia/types';
import InstantSearch from 'components/HOC/InstantSearch';
import { productsIndex } from 'helpers/constants/algolia';
import { Category } from 'types/category';

export interface Props {
  serverUrl: string;
  serverState?: InstantSearchServerState;
  categories: Category[];
  data: {
    slug?: string;
    searchQuery?: string;
    facetsConfiguration: FacetConfiguration[];
    pricesConfiguration: PriceConfiguration[];
  };
}

function ProductListTastic({ categories, data }: Props) {
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
  }, [pricesConfiguration, updatePricesConfiguration]);

  useEffect(() => {
    if (!router) return;

    router.events.on('routeChangeComplete', clearAllRefinements);

    return () => router.events.off('routeChangeComplete', clearAllRefinements);
  }, [clearAllRefinements, router]);

  const isCategoryFoundOrSearchQueryExists = useMemo(() => {
    if (data.searchQuery) return true;
    if (!data.slug) return true;

    return !!categories?.find((category) => category.slug === data.slug);
  }, [data, categories]);

  if (!isCategoryFoundOrSearchQueryExists) return <NotFound />;

  return (
    <ProductList
      slug={data.slug}
      searchQuery={data.searchQuery}
      categories={categories}
      facetsConfiguration={facetsConfiguration}
    />
  );
}

function ProductListAlgoliaTastic({ serverUrl, serverState, ...props }: Props) {
  return (
    <InstantSearchSSRProvider {...(serverState ?? {})}>
      <InstantSearch
        indexName={productsIndex}
        routing={{
          router: history({
            getLocation: () =>
              typeof window === 'undefined' ? (new URL(serverUrl) as unknown as Location) : window.location,
          }),
          stateMapping: {
            stateToRoute(uiState) {
              const indexUiState = uiState[productsIndex];

              return {
                ...indexUiState,
                q: indexUiState.configure?.query,
              } as UiState;
            },
            routeToState(routeState) {
              return {
                [productsIndex]: {
                  ...routeState,
                  query: routeState.q ?? '',
                },
              } as UiState;
            },
          },
        }}
      >
        <ProductListProvider>
          <ProductListTastic serverUrl={serverUrl} serverState={serverState} {...props} />
        </ProductListProvider>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export default ProductListAlgoliaTastic;
