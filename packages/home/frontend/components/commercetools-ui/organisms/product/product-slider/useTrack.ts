import { useCallback } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import aa from 'search-insights';
import { productsIndex } from 'helpers/constants/algolia';
import { SLIDER_PRODUCT_CLICKED } from 'helpers/constants/events';
import { LAST_ALGOLIA_QUERY_ID } from 'helpers/constants/localStorage';
import useGetHitByProduct from 'helpers/hooks/useGetHitByProduct';

const useTrack = () => {
  const getHitByProduct = useGetHitByProduct();

  const trackClick = useCallback(
    async (product: Product, position: number) => {
      const hit = await getHitByProduct(product);

      const queryID = window.localStorage.getItem(LAST_ALGOLIA_QUERY_ID) as string;

      try {
        aa('sendEvents', [
          {
            eventType: 'click',
            eventName: SLIDER_PRODUCT_CLICKED,
            objectIDs: [hit.objectID],
            queryID,
            positions: [position],
            index: productsIndex,
          },
        ]);
      } catch (err) {}

      gtag('event', SLIDER_PRODUCT_CLICKED, product);
    },
    [getHitByProduct],
  );

  return { trackClick };
};

export default useTrack;
