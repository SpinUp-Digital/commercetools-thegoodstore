import { useFormat } from 'helpers/hooks/useFormat';
import React from 'react';

interface Props {
  query: string;
  count: number;
}

const SearchHeader: React.FC<Props> = ({ query, count }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  if (!query) return <></>;

  return (
    <div>
      <h1 className="text-26">
        {formatProductMessage({
          id: 'search.results.for',
          defaultMessage: 'Search results for “{query}”',
          values: { query },
        })}
      </h1>
      <h4 className="mt-24">
        {formatProductMessage({
          id: 'found.products',
          defaultMessage: 'We found {count} products',
          values: { count },
        })}
      </h4>
    </div>
  );
};

export default SearchHeader;
