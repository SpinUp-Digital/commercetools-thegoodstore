import React, { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import Button from '..';
import Typography from '../../typography';

const ButtonVariants = () => {
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
        Button Component Styling
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>

      <div className="mt-48 flex flex-col">
        <div className="flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Ghost button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button variant="ghost" size="full" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Ghost
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Primary button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button variant="primary" size="full" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Primary
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Secondary button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button variant="secondary" size="full" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Secondary
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Warning button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button variant="warning" size="full" onClick={toggleButtonFeedback} loading={loading} added={added}>
              Warning
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Disabled button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button
              variant="primary"
              size="full"
              disabled
              onClick={toggleButtonFeedback}
              loading={loading}
              added={added}
            >
              Disabled
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Underlined button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button
              variant="underlined"
              size="full"
              onClick={toggleButtonFeedback}
              loading={loading}
              added={added}
              className="flex justify-center"
            >
              Underlined
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Primary icon left button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button
              variant="primary"
              iconPosition="left"
              size="full"
              onClick={toggleButtonFeedback}
              loading={loading}
              added={added}
              icon={<LockClosedIcon className="h-20" />}
              className="flex justify-center"
            >
              Primary Icon
            </Button>
          </div>
        </div>

        <div className="mt-24 flex items-center">
          <Typography fontSize={14} fontFamily="inter" className="w-200 text-secondary-black">
            Secondary icon right button:
          </Typography>
          <div className="ml-16 w-[15%]">
            <Button
              variant="secondary"
              iconPosition="right"
              size="full"
              onClick={toggleButtonFeedback}
              loading={loading}
              added={added}
              icon={<LockClosedIcon className="h-20" />}
              className="flex justify-center"
            >
              Secondary Icon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonVariants;
