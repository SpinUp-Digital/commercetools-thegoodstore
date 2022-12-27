/* eslint-disable react-hooks/rules-of-hooks*/

import useSWR from 'swr';
import { SDK } from 'sdk';
import { revalidateOptions } from 'frontastic';

export const queryCategories = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/product/queryCategories?limit=10', extensions.product.queryCategories, revalidateOptions);
};
