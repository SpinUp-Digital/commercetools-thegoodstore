import React, { useCallback, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Option {
  name: string;
  value: string | number;
}
export interface Props {
  options?: Option[];
  defaultValue?: Option;
  onChange?: (option: Option) => void;
}

const Select: React.FC<Props> = ({ onChange, defaultValue, options = [] }) => {
  const [selected, setSelected] = useState<Option | undefined>(defaultValue ?? options?.[0]);

  useEffect(() => {
    setSelected(defaultValue ?? options?.[0]);
  }, [defaultValue, options]);

  const handleChange = useCallback(
    (option: Option) => {
      setSelected(option);
      onChange?.(option);
    },
    [onChange],
  );

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative">
        <Listbox.Button className="relative flex h-[40px] w-full cursor-default items-center rounded-sm border border-neutral-500 bg-white pl-8 pr-32 text-left focus:outline-none">
          <span className="text-sm text-secondary-black">{selected?.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
            <ChevronDownIcon className="h-20 w-20 text-secondary-black" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-[999] mt-1 max-h-[200px] w-full min-w-[200px] overflow-auto rounded-sm bg-white shadow-lg focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.name}</span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Select;
