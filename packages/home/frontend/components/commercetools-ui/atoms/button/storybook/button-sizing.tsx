import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Button from '..';
import Typography from '../../typography';

const ButtonSizing = () => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const toggleButtonFeedback = () => {
    setLoading(true);

    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setAdded(true);
      clearTimeout(loadingTimer);

      const addedTimer = setTimeout(() => {
        setAdded(false);
        clearTimeout(addedTimer);
      }, 500);
    }, 1500);
  };

  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="inter" medium className="mt-40 w-[40%] text-primary-black">
        Button Component Sizing
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-48 flex flex-col">
        <div className="flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Size icon:
          </Typography>
          <div className="ml-16">
            <Button variant="primary" size="icon" onClick={toggleButtonFeedback} loading={loading} added={added}>
              <TrashIcon className="w-20" />
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Size xs:
          </Typography>
          <div className="ml-16">
            <Button variant="primary" size="xs" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Button
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Size sm:
          </Typography>
          <div className="ml-16">
            <Button variant="primary" size="s" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Button
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Size md:
          </Typography>
          <div className="ml-16">
            <Button variant="primary" size="m" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Button
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Size lg:
          </Typography>
          <div className="ml-16">
            <Button variant="primary" size="l" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Button
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className=" w-200 text-secondary-black">
            Size full width for 15 % panel:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button variant="primary" size="full" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Button
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonSizing;
