import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';

export interface AccordionProps {
  index?: number;
  accordionListLength?: number;
  className?: string;
  openSectionTitle?: string;
  closedSectionTitle: string;
  iconColor?: string;
  buttonClassName?: string;
  panelClassName?: string;
}

const AccordionBtn: React.FC<AccordionProps> = ({
  closedSectionTitle,
  openSectionTitle = closedSectionTitle,
  iconColor,
  children,
  className,
  buttonClassName,
  panelClassName,
}) => {
  const buttonClassNames = useClassNames(['w-full', buttonClassName]);

  const panelClassNames = useClassNames([panelClassName]);

  return (
    <div className={className}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className={buttonClassNames}>
              <div className="flex justify-between">
                <p className="self-center transition">{open ? openSectionTitle : closedSectionTitle}</p>
                <ChevronDownIcon
                  width={17.5}
                  strokeWidth={1}
                  className={`${open ? 'rotate-180 transform' : ''} ${iconColor} transition`}
                />
              </div>
            </Disclosure.Button>
            <Transition
              enter="transition duration-150 ease-out"
              enterFrom="transform scale-y-95 opacity-0"
              enterTo="transform scale-y-100 opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform scale-y-100 opacity-100"
              leaveTo="transform scale-y-95 opacity-0"
            >
              <Disclosure.Panel className={panelClassNames}>{children}</Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default AccordionBtn;
