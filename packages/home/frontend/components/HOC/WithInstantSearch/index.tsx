import React from 'react';
import algoliaSearch from 'algoliasearch';
import { InstantSearch } from 'react-instantsearch-hooks';

const searchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);

const withInstantSearch = <P extends object>(Component: React.ComponentType<P>, indexName: string) => {
  return class WithInstantSearch extends React.Component {
    render() {
      return (
        <InstantSearch searchClient={searchClient} indexName={indexName}>
          <Component {...(this.props as P)} />
        </InstantSearch>
      );
    }
  };
};

export default withInstantSearch;
