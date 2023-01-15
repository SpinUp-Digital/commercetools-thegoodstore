import { Fragment, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import FlagIcons from 'components/icons/flags';
import useClassNames from 'helpers/hooks/useClassNames';
import { MarketContext } from 'frontastic/provider/marketProvider';
import { Market } from '../header/types';

const MarketButtonMobile = () => {
  const { market: selectedMarket, markets, handleMarket } = useContext(MarketContext);

  const marketItemsClassNames = useClassNames([
    markets.length > 6 ? 'bottom-45' : 'top-45',
    'absolute left-0 mt-2 w-full px-15',
  ]);

  const handleMarketClick = (market: Market) => {
    handleMarket(market);
  };

  return (
    <Menu as="div" className="relative px-15">
      {({ open }) => (
        <div>
          <Menu.Button className="flex h-40 w-full items-center justify-between border border-neutral-400 bg-white">
            <div className="ml-10 flex w-fit justify-start">
              <FlagIcons flagName={selectedMarket?.flag} className="my-auto mr-8" />
              <span className="mb-1 text-14 font-medium text-secondary-black">
                {' '}
                {selectedMarket?.region} | {selectedMarket?.currency}{' '}
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: selectedMarket?.currencyCode }}
                className="ml-5 mr-20 text-14 font-medium text-secondary-black"
              />
            </div>
            <div className="mr-16 flex justify-end">
              <ChevronDownIcon className="w-15" />
            </div>
          </Menu.Button>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className={marketItemsClassNames}>
              <div className="max-h-300 overflow-scroll border-[1px] border-neutral-400 bg-white shadow-lg">
                {markets.map((market, index) => (
                  <Menu.Item key={index}>
                    <div className="overflow-y-scroll">
                      <Button
                        variant="ghost"
                        size="full"
                        onClick={() => handleMarketClick(market)}
                        className="flex w-full items-center justify-start px-10"
                      >
                        <FlagIcons flagName={market.flag} className="mr-8" />
                        <span className="mb-1 text-14 font-medium text-secondary-black">{market.region}</span>
                      </Button>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  );
};

export default MarketButtonMobile;
