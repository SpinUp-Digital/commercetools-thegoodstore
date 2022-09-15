import React from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export interface AccordionProps {
  index?: number;
  accordionListLength?: number;
  className?: string;
  openSectionTitle: string;
  closedSectionTitle: string;
  iconColor?: string;
}

const AccordionBtn: React.FC<AccordionProps> = ({
  openSectionTitle,
  closedSectionTitle,
  iconColor,
  children,
  className,
}) => {
  return (
    <div className={`${className}`}>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="w-full py-14 px-12 text-14 font-medium text-neutral-200">
              <div className="flex justify-between">
                <p className="self-center transition">{open ? openSectionTitle : closedSectionTitle}</p>
                <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-8 w-15 ${iconColor} transition`} />
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
              <Disclosure.Panel className="mb-18 px-20 text-neutral-200 md:p-20">{children}</Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default AccordionBtn;
