import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import type { SearchResults } from 'algoliasearch-helper';
import type { UiState } from 'instantsearch.js';
import type {
  CurrentRefinementsConnectorParamsRefinement,
  CurrentRefinementsRenderState,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import { useCurrentRefinements, useInstantSearch } from 'react-instantsearch-hooks-web';
import useClassNames from 'helpers/hooks/useClassNames';
import useScrollBlock from 'helpers/hooks/useScrollBlock';
import useOnClickOutside from 'helpers/hooks/useOnClickOutside';
import Panel from './Panel';
import { getFirstChildPropValue } from './utils';

export type DropdownProps = PropsWithChildren<{
  buttonText?: string;
  classNames?: Partial<DropdownClassNames>;
  closeOnChange?: boolean | (() => boolean);
}>;

export type DropdownButtonTextOptions = {
  results: SearchResults;
  uiState: UiState;
  refinements: CurrentRefinementsConnectorParamsRefinement[];
};

export type DropdownClassNames = {
  root: string;
  button: string;
  closeButton: string;
  mobileTitle: string;
};

type MiddlewareProps = Pick<DropdownProps, 'closeOnChange'> & {
  isOpened: boolean;
  close: () => void;
};

function getAttributeRefinements(attribute: string, items: CurrentRefinementsRenderState['items']) {
  const item = items.find((item) => item.attribute === attribute);
  return item?.refinements || [];
}

function DropdownMiddleware({ isOpened, closeOnChange, close }: MiddlewareProps) {
  const { use } = useInstantSearch();

  useEffect(() =>
    use(() => ({
      onStateChange() {
        const shouldCloseOnChange =
          closeOnChange === true || (typeof closeOnChange === 'function' && closeOnChange() === true);

        // Close the dropdown if it's opened and `closeOnChange` is true
        if (isOpened && shouldCloseOnChange) {
          close();
        }
      },
    })),
  );

  return null;
}

export function FacetDropdown({ children, buttonText, closeOnChange, classNames = {} }: DropdownProps) {
  const { results } = useInstantSearch();
  const { items } = useCurrentRefinements({}, { $$widgetType: 'cmty.facetDropdown' });
  const [isOpened, setIsOpened] = useState(false);
  const panelRef = useRef(null);

  // Close the dropdown when click outside or press the Escape key
  
  const close = useCallback(() => setIsOpened(false), []);
  useOnClickOutside(panelRef, close, isOpened);

  // Prevent scrolling on mobile when the dropdown is opened
  const { blockScroll } = useScrollBlock();

  useEffect(() => {
    blockScroll(isOpened);
  }, [blockScroll, isOpened]);

  // Get the attribute(s) of the first child widget
  const attributeProp = getFirstChildPropValue(children, (props) =>
    'attributes' in props ? 'attributes' : 'attribute',
  );
  if (!attributeProp) {
    throw new Error('<Dropdown> widget only supports InstantSearch widgets with an `attribute` or `attributes` prop.');
  }

  // Get the refinements for the attribute
  const attribute = typeof attributeProp === 'string' ? attributeProp : attributeProp[0];
  const refinements = getAttributeRefinements(attribute, items);
  const isRefined = refinements.length > 0;
  const isDisabled = results.hits.length === 0;

  const header = (
    <button
      type="button"
      className={useClassNames([
        'ais-Dropdown-button',
        classNames.button,
        { 'ais-Dropdown-button--refined': isRefined },
        { 'ais-Dropdown-button--disabled': isDisabled },
      ])}
      disabled={isDisabled}
      onClick={() => setIsOpened((opened) => !opened)}
    >
      {buttonText}
    </button>
  );

  const footer = (
    <button
      className={useClassNames(['ais-Dropdown-close ais-Dropdown-button', classNames.closeButton])}
      onClick={close}
    >
      Apply
    </button>
  );

  return (
    <Panel
      header={header}
      footer={footer}
      className={useClassNames(['ais-Dropdown', { 'ais-Dropdown--opened': isOpened }, classNames.root])}
      ref={panelRef}
    >
      <DropdownMiddleware isOpened={isOpened} closeOnChange={closeOnChange} close={close} />
      <h2 className={useClassNames(['ais-Dropdown-mobileTitle', classNames.mobileTitle])}>{buttonText}</h2>
      {children}
    </Panel>
  );
}
