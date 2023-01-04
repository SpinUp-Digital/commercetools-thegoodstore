import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { UiState } from 'instantsearch.js';
import { history } from 'instantsearch.js/es/lib/routers/index.js';
import { InstantSearchServerState, InstantSearchSSRProvider, useClearRefinements } from 'react-instantsearch-hooks';
import ProductList from 'components/commercetools-ui/organisms/products/product-list';
import ProductListProvider, {
  useProductList,
} from 'components/commercetools-ui/organisms/products/product-list/context';
import {
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/products/product-list/types';
import InstantSearch from 'components/HOC/InstantSearch';
import { productsIndex } from 'helpers/constants/algolia';
import Error404 from 'pages/404';
import { Category } from 'types/category';

export interface Props {
  serverUrl: string;
  serverState?: InstantSearchServerState;
  categories: Category[];
  data: {
    categoryId?: string;
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

    return data.categoryId && !!categories?.find((category) => category.categoryId === data.categoryId);
  }, [data, categories]);

  if (!isCategoryFoundOrSearchQueryExists) return <Error404 />;

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

export default ProductListTasticWrapper;
