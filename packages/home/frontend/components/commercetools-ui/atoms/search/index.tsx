import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import { Hits, Configure, SearchBox, Index } from 'react-instantsearch-hooks-web';
import InstantSearch from 'components/HOC/InstantSearch';
import GoogleAnalyticsMiddleware from 'components/HOC/InstantSearch/middlewares/GoogleAnalyticsMiddleware';
import { productsIndex, productsQuerySuggestionsIndex } from 'helpers/constants/algolia';
import { useFormat } from 'helpers/hooks/useFormat';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useScrollBlock from 'helpers/hooks/useScrollBlock';
import { desktop } from 'helpers/utils/screensizes';
import { Category } from 'types/category';
import Overlay from '../overlay';
import SearchItem from '../search-item';
import SearchSuggestion, { Props as SearchSuggestionProps } from '../search-suggestion';

interface Props {
  categories: Category[];
}

const Search: React.FC<Props> = ({ categories }) => {
  const form = useRef<HTMLFormElement>(null);

  const [focused, setFocused] = useState(false);

  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  const { formatMessage } = useFormat({ name: 'common' });

  const { blockScroll } = useScrollBlock();

  const [isDesktop] = useMediaQuery(desktop);

  const router = useRouter();

  const [query, setQuery] = useState('');

  useEffect(() => {
    blockScroll(focused);
  }, [blockScroll, focused]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  const cleanUp = useCallback(() => {
    setQuery('');
  }, []);

  const onSubmit = useCallback(() => {
    router.push(`/search?q=${query}`);
    cleanUp();
  }, [query, router, cleanUp]);

  return (
    <InstantSearch indexName={productsIndex}>
      <GoogleAnalyticsMiddleware />
      <Configure enablePersonalization={!query} />

      {focused && <Overlay />}

      <div className="relative z-[300]">
        <SearchBox
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={`${formatMessage({ id: 'search.placeholder', defaultMessage: 'Type to search' })}...`}
          classNames={{
            root: `relative z-50 bg-white border-neutral-400 lg:border ${
              focused ? 'border-b' : 'border'
            } lg:w-[calc(100%-24px)] mx-auto`,
            form: 'relative flex items-stretch w-full quick-search',
            input:
              'placeholder:text-14 placeholder:text-secondary-black box-content border-none grow focus:outline-none transition p-0 px-12 py-10',
            submit: `border-l transition border-neutral-400 px-16 py-10 shrink-0 ${
              focused ? 'bg-primary-black' : 'bg-white'
            }`,
            submitIcon: `w-18 h-18 stroke-0 ${focused ? 'fill-white' : 'fill-secondary-black'}`,
            reset: 'absolute right-[70px] top-1/2 -translate-y-1/2',
            resetIcon: 'w-10 w-10 fill-primary-black',
            loadingIndicator: 'hidden',
          }}
          onInput={onChange}
          onSubmit={onSubmit}
          formRef={form}
        />

        <Transition
          show={focused}
          className="absolute bottom-0 left-0 max-h-[60vh] w-full translate-y-full overflow-auto bg-white px-20 py-28 lg:max-h-[unset] lg:translate-y-[calc(100%-56px)] lg:rounded-md lg:pt-84"
          enter="transition duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex">
            <Index indexName={productsQuerySuggestionsIndex}>
              <Configure hitsPerPage={4} />
              <Hits
                hitComponent={({ hit }) => (
                  <SearchSuggestion
                    hit={hit as SearchSuggestionProps['hit']}
                    categories={categories}
                    onClick={cleanUp}
                  />
                )}
                classNames={{
                  root: 'flex-1',
                  list: 'flex flex-col gap-30',
                }}
              />
            </Index>
            {isDesktop && (
              <Index indexName={productsIndex}>
                <Configure hitsPerPage={3} />
                <Hits
                  hitComponent={({ hit }) => <SearchItem hit={hit} categories={categories} onClick={cleanUp} />}
                  classNames={{
                    root: 'flex-1 border-l border-neutral-400 box-border pl-30',
                    list: 'flex flex-col gap-30',
                  }}
                />
              </Index>
            )}
          </div>
        </Transition>
      </div>
    </InstantSearch>
  );
};

export default Search;
