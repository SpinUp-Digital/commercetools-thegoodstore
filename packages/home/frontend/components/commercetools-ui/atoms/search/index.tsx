import React, { useCallback, useEffect, useState } from 'react';
import { Hits, Configure, SearchBox } from 'react-instantsearch-hooks-web';
import withInstantSearch from 'components/HOC/WithInstantSearch';
import { productsIndex } from 'helpers/constants/algolia';
import { useFormat } from 'helpers/hooks/useFormat';
import useScrollBlock from 'helpers/hooks/useScrollBlock';
import SearchItem from '../search-item';

const Search: React.FC = () => {
  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  const { formatMessage } = useFormat({ name: 'common' });

  const { blockScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll(focused);
  }, [focused]);

  return (
    <>
      <Configure hitsPerPage={5} />
      <SearchBox
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={`${formatMessage({ id: 'search.placeholder', defaultMessage: 'TYPE TO SEARCH' })}...`}
        classNames={{
          form: 'flex flex-row-reverse items-center gap-40 w-full quick-search',
          input:
            'placeholder:text-14 placeholder:text-secondary-black border-none grow focus:outline-none focus:border-accent-red',
          submitIcon: 'stroke-secondary-black w-18 h-18',
          reset: 'hidden',
          loadingIndicator: 'hidden',
        }}
      />
      {focused && (
        <Hits
          hitComponent={({ hit }) => <SearchItem hit={hit} onClick={onBlur} />}
          classNames={{
            root: 'py-36 px-20 lg:px-24 xl:px-64 md:px-32 absolute left-0 w-full bottom-0 translate-y-full bg-white',
            list: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-72 max-h-[60vh] overflow-auto',
          }}
        />
      )}
    </>
  );
};

export default withInstantSearch(Search, productsIndex);
