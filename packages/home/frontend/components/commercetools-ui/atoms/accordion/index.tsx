import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';
import Typography from '../typography';

export interface AccordionProps {
  index?: number;
  variant?: 'arrow' | 'plusAndMinus';
  accordionListLength?: number;
  className?: string;
  openSectionTitle?: string;
  closedSectionTitle: string;
  iconClassName?: string;
  buttonClassName?: string;
  buttonWrapperClassName?: string;
  panelClassName?: string;
  collapsedLabel?: string;
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
}) => {
  const buttonClassNames = useClassNames(['w-full flex justify-between', buttonClassName]);

  const panelClassNames = useClassNames([panelClassName]);

  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className={`${buttonWrapperClassName} w-full`}>
              <div className={buttonClassNames}>
                <Typography className="self-center transition">
                  {open ? openSectionTitle : closedSectionTitle}
                </Typography>
                <div className="flex items-center gap-8">
                  {!open && collapsedLabel && <p className="font-medium text-primary-black">{collapsedLabel}</p>}
                  {variant === 'arrow' ? (
                    <ChevronDownIcon
                      width={17.5}
                      strokeWidth={1}
                      className={`${open ? 'rotate-180 transform' : ''} ${iconClassName} transition`}
                    />
                  ) : !open ? (
                    <PlusIcon width={17.5} strokeWidth={2} className={iconClassName} />
                  ) : (
                    <MinusIcon width={17.5} strokeWidth={2} className={iconClassName} />
                  )}
                </div>
              </div>
            </Disclosure.Button>
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
