import React, { ReactNode } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import useClassNames from 'helpers/hooks/useClassNames';
import AccordionButton from './AccordionButton';

export interface AccordionProps {
  index?: number;
  variant?: 'arrow' | 'plusAndMinus';
  accordionListLength?: number;
  className?: string;
  openSectionTitle?: string;
  closedSectionTitle?: string;
  iconClassName?: string;
  buttonClassName?: string;
  buttonWrapperClassName?: string;
  panelClassName?: string;
  collapsedLabel?: string;
  customOpenButton?: ReactNode;
  customClosedButton?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  variant = 'arrow',
  closedSectionTitle,
  openSectionTitle = closedSectionTitle,
  children,
  className = '',
  iconClassName = '',
  buttonClassName = '',
  buttonWrapperClassName = '',
  panelClassName = '',
  collapsedLabel,
  customOpenButton,
  customClosedButton,
}) => {
  const panelClassNames = useClassNames([panelClassName]);

  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <>
            {(open && !customOpenButton) || (!open && !customClosedButton) ? (
              <AccordionButton
                open={open}
                variant={variant}
                collapsedLabel={collapsedLabel}
                buttonClassName={buttonClassName}
                iconClassName={iconClassName}
                openSectionTitle={openSectionTitle}
                closedSectionTitle={openSectionTitle}
                buttonWrapperClassName={buttonWrapperClassName}
              />
            ) : (
              <Disclosure.Button>{open ? customOpenButton : customClosedButton}</Disclosure.Button>
            )}

            <Transition
              enter="transition duration-150 ease-out"
              enterFrom="transform scale-y-95 opacity-0"
              enterTo="transform scale-y-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-y-100 opacity-100"
              leaveTo="transform scale-y-95 opacity-0"
              unmount={false}
            >
              <Disclosure.Panel className={panelClassNames} unmount={false}>
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Accordion;
