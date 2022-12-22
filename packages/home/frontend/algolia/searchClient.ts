import algoliaSearch from 'algoliasearch';

export const searchClient = algoliaSearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
);
