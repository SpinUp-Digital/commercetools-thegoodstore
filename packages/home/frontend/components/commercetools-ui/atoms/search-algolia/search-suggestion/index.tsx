import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/outline';
import { Hit } from 'instantsearch.js';
import { Highlight } from 'react-instantsearch-hooks-web';
import { productsIndex } from 'helpers/constants/algolia';
import { Category } from 'types/category';
import Link from '../../link';

export interface Props {
  hit: Hit<
    {
      query: string;
    } & {
      [key: string]: {
        exact_nb_hits: number;
        facets: {
          exact_matches: {
            [key: string]: [
              {
                value: string;
                count: number;
              },
            ];
          };
        };
      };
    }
  >;
  categories: Category[];
  onClick?: () => void;
}

const SearchSuggestion: React.FC<Props> = ({ hit, categories, onClick }) => {
  const router = useRouter();

  const categoryOptions = useMemo(() => {
    return hit[productsIndex].facets.exact_matches['categories.categoryId']
      .map(({ value }) => categories.find((category) => category.categoryId === value) as Category)
      .filter(Boolean);
  }, [hit, categories]);

  const handleQuerySuggestionClick = useCallback(() => {
    onClick?.();

    router.push(`/search?q=${hit.query}`);
  }, [router, hit, onClick]);

  const handleCategoryOptionClick = useCallback(
    ({ path }: Partial<Category>) => {
      onClick?.();

      router.push(`${path}?q=${hit.query}`);
    },
    [router, hit, onClick],
  );

  return (
    <div className="flex items-start gap-28">
      <SearchIcon className="h-24 w-24 stroke-secondary-black" />
      <div className="flex flex-col gap-24">
        <Link link={`/search?q=${hit.query}`} onMouseUp={handleQuerySuggestionClick}>
          <Highlight
            hit={hit}
            attribute="query"
            nonHighlightedTagName="b"
            highlightedTagName="span"
            classNames={{ nonHighlighted: 'font-semibold' }}
          />
        </Link>
        {categoryOptions.map(({ categoryId, name, path }) => (
          <Link key={categoryId} link={`${path}?q=${hit.query}`} onMouseUp={() => handleCategoryOptionClick({ path })}>
            <i className="text-secondary-black">In {name}</i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestion;
