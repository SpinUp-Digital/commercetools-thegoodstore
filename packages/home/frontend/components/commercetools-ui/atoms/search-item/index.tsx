import React, { useCallback, useMemo } from 'react';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { Variant } from '@commercetools/frontend-domain-types/product/Variant';
import { Hit } from 'instantsearch.js';
import { Highlight, useHits } from 'react-instantsearch-hooks-web';
import Link from 'components/commercetools-ui/atoms/link';
import { AUTOCOMPLETE_PRODUCT_CLICKED } from 'helpers/constants/events';
import useVariantWithDiscount from 'helpers/hooks/useVariantWithDiscount';
import { Subset } from 'types/subset';
import Image from 'frontastic/lib/image';
import Prices from '../prices';

interface Props {
  hit: Hit<Subset<Product>>;
  onClick?: () => void;
}

const SearchItem: React.FC<Props> = ({ hit, onClick }) => {
  const variant = useMemo(() => hit.variants?.[0], [hit]);
  const discountedVariant = useVariantWithDiscount(hit.variants as Partial<Variant>[]);

  const { sendEvent } = useHits();

  const handleClick = useCallback(() => {
    onClick?.();

    sendEvent('click', hit, AUTOCOMPLETE_PRODUCT_CLICKED);
    gtag('event', AUTOCOMPLETE_PRODUCT_CLICKED, hit);
  }, [hit, sendEvent, onClick]);

  return (
    <Link link={hit._url} onMouseDown={(e) => e.preventDefault()} onClick={handleClick}>
      <div className="flex items-start gap-12">
        <div className="shrink-0 p-8 shadow-md">
          <div className="relative h-90 w-80">
            <Image src={variant?.images?.[0]} objectFit="contain" />
          </div>
        </div>
        <div>
          <h5 className="text-14 font-bold text-primary-black">
            <Highlight attribute="name" hit={hit} highlightedTagName="mark" />
          </h5>
          <div className="mt-5">
            <Prices price={discountedVariant?.price ?? variant?.price} discountedPrice={discountedVariant?.price} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
