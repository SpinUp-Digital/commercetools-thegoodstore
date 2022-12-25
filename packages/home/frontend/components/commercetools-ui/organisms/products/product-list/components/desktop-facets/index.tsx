import { useMemo } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon as ArrowIcon } from '@heroicons/react/24/solid';
import { useHits } from 'react-instantsearch-hooks-web';
import { productsIndex } from 'helpers/constants/algolia';
import { useFormat } from 'helpers/hooks/useFormat';
import useDynamicFacets from '../../hooks/useDynamicFacets';
import { FacetConfiguration } from '../../types';
import SortFacet from '../facets/sort';

interface Props {
  facetsConfiguration: Record<string, FacetConfiguration>;
}

const DesktopFacets: React.FC<Props> = ({ facetsConfiguration }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const {
    results: { nbHits, renderingContent },
  } = useHits();

  const transitionDisclosures = useMemo(
    () => ({
      enter: 'transition duration-100 ease-out',
      enterFrom: 'transform scale-95 opacity-0',
      enterTo: 'transform scale-100 opacity-100',
      leave: 'transition duration-75 ease-out',
      leaveFrom: 'transform scale-100 opacity-100',
      leaveTo: 'transform scale-95 opacity-0',
    }),
    [],
  );

  const facets = useDynamicFacets({
    configuration: facetsConfiguration,
    ordering: renderingContent?.facetOrdering?.facets?.order,
    render: ({ attribute, Component }) => (
      <Menu as="div" className="relative" key={attribute}>
        {({ open }) => (
          <>
            <Menu.Button>
              <div className="flex min-w-[80px] items-center gap-8 rounded-md border border-transparent bg-white px-12 py-6 text-14 leading-[20px] transition hover:border-gray-500">
                <span className="text-14">{facetsConfiguration[attribute].label}</span>
                <ArrowIcon className="mt-2 w-16 stroke-secondary-black" />
              </div>
            </Menu.Button>
            <Transition show={open} {...transitionDisclosures} unmount={false}>
              <Menu.Items
                static
                className="absolute left-0 z-20 min-w-[320px] origin-top-right translate-y-[10px] rounded-md bg-white py-24 pl-36 pr-92 shadow-lg"
              >
                <Menu.Item>{Component}</Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    ),
  });

  const sortFacet = useMemo(
    () => (
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button>
              <div className="flex items-center gap-8">
                <span className="text-14">{formatProductMessage({ id: 'sortBy', defaultMessage: 'Sort by' })}</span>
                <ArrowIcon className="mt-2 w-16 stroke-secondary-black" />
              </div>
            </Menu.Button>
            <Transition show={open} {...transitionDisclosures} unmount={false}>
              <Menu.Items
                static
                className="absolute right-0 z-20 min-w-[280px] origin-top-right translate-y-[10px] rounded-md bg-white shadow-lg"
              >
                <Menu.Item>
                  <SortFacet
                    items={[
                      {
                        label: formatProductMessage({ id: 'relevance', defaultMessage: 'Relevance' }),
                        value: productsIndex,
                      },
                    ]}
                  />
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    ),
    [],
  );

  return (
    <div className="mb-16 flex items-center justify-between border-b border-neutral-400 pb-16 pt-56">
      <div className="flex items-center gap-12">{facets}</div>
      <div className="flex items-center gap-16">
        <span>
          {nbHits} {formatProductMessage({ id: 'items', defaultMessage: 'Items' })}
        </span>
        <div>{sortFacet}</div>
      </div>
    </div>
  );
};

export default DesktopFacets;
