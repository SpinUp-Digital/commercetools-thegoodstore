import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
// import { Variant } from 'types/product';
import { Hit } from 'instantsearch.js';
import { Highlight, useHits } from 'react-instantsearch-hooks-web';
import { AUTOCOMPLETE_PRODUCT_CLICKED } from 'helpers/constants/events';
// import useVariantWithDiscount from 'helpers/hooks/useVariantWithDiscount';
import { Category } from 'types/category';
import { Subset } from 'types/subset';
import Image from 'frontastic/lib/image';
import Link from '../../link';
// import Prices from '../prices';

interface Props {
  hit: Hit<Subset<Product>>;
  categories: Category[];
  onClick?: () => void;
}

const SearchItem: React.FC<Props> = ({ hit, categories, onClick }) => {
  const router = useRouter();

  const primaryCategory = useMemo(
    () => categories.find((category) => category.categoryId === hit.categories?.[0].categoryId),
    [categories, hit],
  );

  const variant = useMemo(() => hit.variants?.[0], [hit]);
  // const discountedVariant = useVariantWithDiscount(hit.variants as Partial<Variant>[]);

  const { sendEvent } = useHits();

  const handleClick = useCallback(() => {
    onClick?.();

    sendEvent('click', hit, AUTOCOMPLETE_PRODUCT_CLICKED);
    gtag('event', AUTOCOMPLETE_PRODUCT_CLICKED, hit);

    router.push(hit._url ?? '#');
  }, [hit, sendEvent, onClick, router]);

  return (
    <Link link={hit._url} onMouseUp={handleClick}>
      <div className="flex items-center gap-12">
        <div className="shrink-0 p-8">
          <div className="relative h-90 w-80">
            <Image src={variant?.images?.[0]} suffix="small" objectFit="contain" />
          </div>
        </div>
        <div>
          <p className="text-16 uppercase text-primary-black">
            <Highlight attribute="name" hit={hit} highlightedTagName="span" />
          </p>
          <div className="mt-5">
            <span className="text-14 text-secondary-black">{primaryCategory?.name}</span>
            {/* <Prices price={discountedVariant?.price ?? variant?.price} discountedPrice={discountedVariant?.price} /> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
