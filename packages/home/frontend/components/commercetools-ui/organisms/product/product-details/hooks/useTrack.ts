import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import aa from 'search-insights';
import { productsIndex } from 'helpers/constants/algolia';
import {
  PDP_PRODUCT_ADDED_TO_CART,
  QUICK_VIEW_PRODUCT_ADDED_TO_CART,
  PDP_VIEWED,
  PDP_VIEWED_AFTER_SEARCH,
  QUICK_VIEW_PRODUCT_ADDED_TO_CART_AFTER_SEARCH,
  PDP_PRODUCT_ADDED_TO_CART_AFTER_SEARCH,
  PRODUCT_VIEWED,
} from 'helpers/constants/events';
import { LAST_ALGOLIA_QUERY_ID } from 'helpers/constants/localStorage';
import useGetHitByProduct from 'helpers/hooks/useGetHitByProduct';

interface Options {
  product: Product;
  inModalVersion?: boolean;
}

const useTrack = ({ product, inModalVersion }: Options) => {
  const { query } = useRouter();

  const getHitByProduct = useGetHitByProduct();

  const lastProductId = useRef<string>();

  const trackView = useCallback(async () => {
    if (product && product.productId !== lastProductId.current) {
      const hit = await getHitByProduct(product);

      try {
        aa('viewedObjectIDs', {
          eventName: PRODUCT_VIEWED,
          objectIDs: [hit.objectID],
          index: productsIndex,
        });
      } catch (err) {}

      gtag('event', query.sr ? PDP_VIEWED_AFTER_SEARCH : PDP_VIEWED, { product });

      lastProductId.current = product.productId;
    }
  }, [product, query, getHitByProduct]);

  useEffect(() => {
    trackView();
  }, [trackView]);

  const trackAddToCart = useCallback(async () => {
    const hit = await getHitByProduct(product);

    const queryID = window.localStorage.getItem(LAST_ALGOLIA_QUERY_ID) as string;

    if (inModalVersion) {
      const eventName = query.sr ? QUICK_VIEW_PRODUCT_ADDED_TO_CART_AFTER_SEARCH : QUICK_VIEW_PRODUCT_ADDED_TO_CART;

      try {
        aa('sendEvents', [
          { eventType: 'conversion', eventName, objectIDs: [hit.objectID], queryID, index: productsIndex },
        ]);
      } catch (err) {}

      gtag('event', eventName, product);
    } else {
      const eventName = query.sr ? PDP_PRODUCT_ADDED_TO_CART_AFTER_SEARCH : PDP_PRODUCT_ADDED_TO_CART;

      try {
        aa('sendEvents', [
          { eventType: 'conversion', eventName, objectIDs: [hit.objectID], queryID, index: productsIndex },
        ]);
      } catch (err) {}

      gtag('event', eventName, product);
    }
  }, [product, getHitByProduct, query, inModalVersion]);

  return { trackAddToCart };
};

export default useTrack;
