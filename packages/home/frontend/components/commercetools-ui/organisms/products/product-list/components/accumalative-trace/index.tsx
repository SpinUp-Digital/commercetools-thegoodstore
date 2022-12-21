import React from 'react';
import { useHits } from 'react-instantsearch-hooks';
import { useFormat } from 'helpers/hooks/useFormat';

const AccumalativeTrace = () => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const {
    hits,
    results: { nbHits, page, nbPages, hitsPerPage },
  } = useHits();

  const accumulativeHitsCount = page === 0 ? hits.length : (nbPages - page) * hitsPerPage + hits.length;

  return (
    <div className="absolute bottom-72 left-1/2 -translate-x-1/2">
      <p>
        {formatProductMessage({
          id: 'showing',
          defaultMessage: 'Showing {current} of {total}',
          values: { current: accumulativeHitsCount, total: nbHits },
        })}
      </p>
    </div>
  );
};

export default AccumalativeTrace;
