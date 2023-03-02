import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Facet } from '@commercetools/frontend-domain-types/result/Facet';
import NotFound from 'components/commercetools-ui/organisms/not-found';
import ProductList, { Props as ProductListProps } from 'components/commercetools-ui/organisms/product/product-list';
import ProductListProvider, {
  useProductList,
} from 'components/commercetools-ui/organisms/product/product-list/context';
import {
  FacetConfiguration,
  PriceConfiguration,
} from 'components/commercetools-ui/organisms/product/product-list/types';
import { Category } from 'types/category';
import { Tastic } from 'types/tastic';

interface TasticProps {
  facetsConfiguration: FacetConfiguration[];
  pricesConfiguration: PriceConfiguration[];
}

export type Props = Tastic<
  ProductListProps & {
    items: Product[];
    category: string;
    facets: Facet[];
    previousCursor?: string;
    nextCursor?: string;
    totalItems: number;
  },
  TasticProps
> & {
  categories: Category[];
};

const ProductListWrapped: React.FC<Props> = ({ data, categories }) => {
  const { query } = useRouter();

  const { updatePricesConfiguration, updateFacetsConfiguration, updateUiState, slug, searchQuery } = useProductList();

  const externalFacetsConfiguration = useMemo<Record<string, FacetConfiguration>>(() => {
    return (data.facetsConfiguration ?? []).reduce(
      (acc, configuration) => ({
        ...acc,
        [configuration.key]: configuration as FacetConfiguration,
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

  const facetsConfiguration = useMemo<Record<string, FacetConfiguration>>(() => {
    return (data.data?.dataSource?.facets ?? [])
      .filter((facet) => facet.key in externalFacetsConfiguration)
      .reduce(
        (acc, configuration) => ({
          ...acc,
          [configuration.key]: {
            ...configuration,
            label: externalFacetsConfiguration[configuration.key].label,
            type: externalFacetsConfiguration[configuration.key].type,
          } as FacetConfiguration,
        }),
        {},
      );
  }, [data.data?.dataSource?.facets, externalFacetsConfiguration]);

  useEffect(() => {
    updateFacetsConfiguration(facetsConfiguration);
  }, [facetsConfiguration, updateFacetsConfiguration]);

  useEffect(() => {
    if (!data.data?.dataSource) return;

    updateUiState({
      slug: data.data?.dataSource?.category?.split('/').at(-1),
      searchQuery: query.q as string,
      previousCursor: data.data.dataSource.previousCursor,
      nextCursor: data.data.dataSource.nextCursor,
      totalItems: data.data.dataSource.totalItems,
    });
  }, [data.data?.dataSource, updateUiState, query]);

  const isValidCategoryOrSearchQuery = useMemo(() => {
    if (searchQuery) return true;
    return slug && !!categories.find((c) => c.slug === slug);
  }, [searchQuery, slug, categories]);

  if (!data?.data) return <></>;

  if (!isValidCategoryOrSearchQuery) return <NotFound />;

  const { items } = data.data.dataSource;

  return <ProductList products={items} categories={categories} />;
};

const ProductListTastic: React.FC<Props> = ({ ...props }) => (
  <ProductListProvider>
    <ProductListWrapped {...props} />
  </ProductListProvider>
);

export default ProductListTastic;
