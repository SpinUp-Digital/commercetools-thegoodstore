import { useMemo } from 'react';
import ColorFacet from '../components/facets/color';
import RangeFacet from '../components/facets/range';
import TermFacet from '../components/facets/term';
import { FacetProps } from '../components/facets/types';
import { FacetConfiguration } from '../types';

interface Options {
  configuration?: Record<string, FacetConfiguration>;
  ordering?: string[];
  pricesConfiguration?: FacetProps['pricesConfiguration'];
  render?: (result: { attribute: string; Component: JSX.Element }) => JSX.Element;
}

const useDynamicFacets = ({ configuration, ordering, pricesConfiguration, render }: Options = {}) => {
  const facetMapping = useMemo<Record<FacetConfiguration['type'], React.ComponentType<FacetProps>>>(
    () => ({
      range: RangeFacet,
      color: ColorFacet,
      term: TermFacet,
    }),
    [],
  );

  const dynamicFacets = useMemo(() => {
    if (!configuration) return <></>;

    const facets = Object.keys(configuration).map((attribute) => {
      const facet = configuration[attribute];

      const Component = facetMapping[facet.type];
      const FinalComponent = (
        <Component
          key={attribute}
          label={facet.label}
          attribute={attribute}
          pricesConfiguration={pricesConfiguration}
        />
      );

      return {
        attribute,
        Component: render?.({ attribute, Component: FinalComponent }) ?? FinalComponent,
      };
    });

    if (ordering) facets.sort((a, b) => ordering.indexOf(a.attribute) - ordering.indexOf(b.attribute));

    return facets.map((facet) => facet.Component);
  }, [facetMapping, configuration, ordering, pricesConfiguration, render]);

  return dynamicFacets;
};

export default useDynamicFacets;
