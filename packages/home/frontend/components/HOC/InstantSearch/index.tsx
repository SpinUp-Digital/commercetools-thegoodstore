import React from 'react';
import {
  InstantSearch as ReactInstantSearch,
  InstantSearchProps as ReactInstantSearchProps,
} from 'react-instantsearch-hooks';
import algoliaSearch from 'algoliasearch';

export const searchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const InstantSearch: React.FC<Partial<ReactInstantSearchProps>> = ({ indexName, children, ...props }) => (
  <ReactInstantSearch searchClient={searchClient} indexName={indexName} {...props}>
    {children}
  </ReactInstantSearch>
);

export default InstantSearch;
