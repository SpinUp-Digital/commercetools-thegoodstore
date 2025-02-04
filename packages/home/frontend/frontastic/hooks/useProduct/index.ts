import { useCallback } from 'react';
import { Category } from 'shared/types/product';
import { Inventory } from 'shared/types/product/inventory';
import { ProductQuery } from 'shared/types/query/ProductQuery';
import useSWR from 'swr';
import { sdk } from 'sdk';
import { revalidateOptions } from 'frontastic';
import { UseProductReturn } from './types';

const useProduct = (): UseProductReturn => {
  const extensions = sdk.composableCommerce;

  const categoriesResults = useSWR(
    '/action/product/queryCategories',
    () => extensions.product.queryCategories({ limit: 99 }),
    revalidateOptions,
  );

  const categories = (categoriesResults.data?.isError ? [] : (categoriesResults.data?.data?.items as Category[])) ?? [];

  const query = useCallback(async (productQuery: ProductQuery) => {
    /* To Do: Use SDK instead of current workaround */

    const extensions = sdk.composableCommerce;

    const res = await extensions.product.query({ limit: productQuery.limit, query: productQuery.query });

    return res;

    // const params = new URLSearchParams();

    // if (productQuery.query) params.set('query', productQuery.query);
    // if (productQuery.limit) params.set('limit', productQuery.limit);

    // const res = await fetchApiHub(`/action/product/query?${params.toString()}`, SDK.locale);

    // return { data: res, isError: false } as SDKResponse<Result>;
  }, []);

  const getInventory = useCallback(async (sku: string) => {
    const response = await sdk.callAction({ actionName: 'product/getInventory', query: { sku } });
    return (response.isError ? {} : response.data) as Inventory;
  }, []);

  return { categories, query, getInventory };
};

export default useProduct;
