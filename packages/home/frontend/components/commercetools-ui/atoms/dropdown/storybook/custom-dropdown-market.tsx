import React, { useCallback, useMemo, useState } from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import FlagIcons from 'components/icons/flags';
import { dropDownMarket, dropDownMarkets } from 'helpers/mocks/mockAtomsData';
import Dropdown from '..';
import Button from '../../button';
import Typography from '../../typography';

const CustomDropdownMarket = () => {
  const [selectedMarket, setSelectedMarket] = useState(dropDownMarket);

  const marketButtonClassNames = useCallback((open?: boolean) => {
    return `flex h-40 w-full items-center justify-between border ${
      open
        ? `rounded-t-sm border-x-neutral-500 border-t-neutral-500 border-b-neutral-400`
        : 'rounded-sm border-neutral-500'
    } bg-white px-16 py-12 active:border-gray-500 focus:border-gray-500 focus:shadow-md`;
  }, []);

  const marketMenuClassNames = useCallback((open?: boolean) => {
    return `max-h-300 overflow-scroll rounded-b-sm border ${
      open ? `border-x-neutral-500 border-b-neutral-500` : 'border-neutral-400'
    } bg-white`;
  }, []);

  const handleMarketClick = (market: Market) => {
    setSelectedMarket(market);
  };

  const marketButtonElement = useMemo(() => {
    return (
      <>
        <div className="flex w-fit cursor-pointer items-center justify-start">
          <FlagIcons flagName={selectedMarket.flag} className="my-auto mr-8" />
          <Typography fontSize={14} className="text-secondary-black">
            {`${selectedMarket.region} | ${selectedMarket.currency} ${selectedMarket.currencyCode}`}
          </Typography>
        </div>
        <div className="flex justify-end">
          <ChevronDownIcon strokeWidth={2} className="w-16 text-secondary-black" />
        </div>
      </>
    );
  }, [selectedMarket]);

  return (
    <div className="mt-24 w-[40%]">
      <Dropdown
        customButtonElement={marketButtonElement}
        customMenuWrapperClassNames="top-40 absolute left-0 w-full"
        customButtonClassNames={marketButtonClassNames}
        customMenuClassNames={marketMenuClassNames}
      >
        {dropDownMarkets.map((market) => (
          <Menu.Item key={market.locale}>
            <div className="overflow-y-scroll hover:bg-neutral-200 active:bg-neutral-200">
              <Button
                variant="ghost"
                size="full"
                onClick={() => handleMarketClick(market)}
                className="flex w-full items-center justify-start px-16 py-12"
              >
                <div className="flex w-fit items-center justify-start">
                  <FlagIcons flagName={market.flag} className="mr-8" />
                  <Typography as="span" fontSize={14} className="font-normal text-secondary-black">
                    {market?.region}
                  </Typography>
                </div>
              </Button>
            </div>
          </Menu.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default CustomDropdownMarket;
