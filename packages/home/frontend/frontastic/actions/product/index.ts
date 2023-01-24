/* eslint-disable react-hooks/rules-of-hooks*/

import useSWR from 'swr';
import { SDK } from 'sdk';
import { revalidateOptions } from 'frontastic';
import { UseProduct } from 'frontastic/provider/Frontastic/UseProduct';

export const query: UseProduct['query'] = async (productQuery) => {
  const extensions = SDK.getExtensions();

  const res = await extensions.product.query({ query: productQuery });

  return res;
};

export const queryCategories = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/product/queryCategories?limit=10', extensions.product.queryCategories, revalidateOptions);
};
