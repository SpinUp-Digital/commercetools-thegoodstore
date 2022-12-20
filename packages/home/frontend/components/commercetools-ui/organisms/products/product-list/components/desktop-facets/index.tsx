import { useMemo } from 'react';
import { DropdownClassNames, FacetDropdown } from 'components/commercetools-ui/atoms/facet-dropdown';
import { useFormat } from 'helpers/hooks/useFormat';
import { ClearRefinements, InstantSearchServerState, SortBy, useHits } from 'react-instantsearch-hooks-web';
import { productsIndex } from 'helpers/constants/algolia';
import { FacetConfiguration } from '../../types';
import useDynamicFacets from '../../hooks/useDynamicFacets';

interface Props {
  facetsConfiguration: Record<string, FacetConfiguration>;
}

const DesktopFacets: React.FC<Props> = ({ facetsConfiguration }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const dropdownClassNames = { button: 'bg-white rounded-md' } as Partial<DropdownClassNames>;

  const {
    results: { nbHits, renderingContent },
  } = useHits();

  const facets = useDynamicFacets({
    configuration: facetsConfiguration,
    ordering: renderingContent?.facetOrdering?.facets?.order,
    render: ({ attribute, Component }) => (
      <FacetDropdown buttonText={facetsConfiguration[attribute].label} classNames={dropdownClassNames}>
        {Component}
      </FacetDropdown>
    ),
  });

  return (
    <div className="mb-16 flex items-center justify-between border-b border-neutral-400 pb-16 pt-56">
      <div className="flex items-center gap-12">
        {facets}
        <ClearRefinements classNames={{ button: 'disabled:hidden' }} />
      </div>
      <div className="flex items-center gap-16">
        <span>
          {nbHits} {formatProductMessage({ id: 'items', defaultMessage: 'Items' })}
        </span>
        <div>
          <span>{formatProductMessage({ id: 'sortBy', defaultMessage: 'Sort by' })}: </span>
          <SortBy
            items={[
              {
                label: formatProductMessage({ id: 'relevance', defaultMessage: 'Relevance' }),
                value: productsIndex,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopFacets;
