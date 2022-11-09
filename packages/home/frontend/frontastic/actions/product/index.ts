import useSWR from 'swr';
import { fetchApiHub, revalidateOptions } from 'frontastic';
import { SDK } from 'sdk';

export const queryCategories = () => {
  const extensions = SDK.getExtensions();

  return useSWR('/action/product/queryCategories?limit=10', extensions.queryProductCategories, revalidateOptions);
};
