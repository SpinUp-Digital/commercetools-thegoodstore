import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon as InfoIcon } from '@heroicons/react/24/outline';

interface Props {
  message: string;
}

const Info: React.FC<Props> = ({ message }) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className="relative">
      <InfoIcon
        className="h-24 w-24 cursor-default stroke-secondary-black"
        onMouseOver={() => setIsShowing(true)}
        onMouseOut={() => setIsShowing(false)}
      />
      <Transition
        show={isShowing}
        className="absolute top-1/2 right-0 w-max max-w-[260px] translate-x-[calc(100%+24px)] -translate-y-1/2 rounded-md border border-[#959595] bg-white p-12"
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <p className="text-12 leading-[15px] text-secondary-black">{message}</p>
      </Transition>
    </div>
  );
};

export default Info;
