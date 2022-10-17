import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import CloseIcon from 'components/icons/close';
import FlagIcons from 'components/icons/flags';
import { useFormat } from 'helpers/hooks/useFormat';
import { Market } from '../interfaces';

interface Props {
  currentMarket?: Market;
  markets?: Market[];
  handleCurrentMarket: (market: Market) => void;
}

const MarketButtonMobile: React.FC<Props> = ({ currentMarket, markets, handleCurrentMarket }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const handleMarketClick = (market: Market) => {
    handleCurrentMarket(market);
  };

  return (
    <div className="mt-58">
      <div className="my-10 mx-15 text-12 ">Select your country</div>
      <Menu as="div" className="relative px-15">
        {({ open }) => (
          <div w-full>
            <Menu.Button className="flex h-40 w-full items-center justify-between border-[1px] border-neutral-400 bg-white font-medium">
              <div className="ml-10 flex w-fit justify-start text-14">
                <FlagIcons flagName={currentMarket?.flag} className="mr-8 mt-3 text-14" />
                {currentMarket?.region} | {currentMarket?.currency}
                <span
                  dangerouslySetInnerHTML={{ __html: currentMarket?.currencyCode }}
                  className="ml-5 mr-20 text-14"
                />
              </div>
              <div className="mr-10 flex w-fit justify-end">
                <ChevronDownIcon className=" h-13 w-13" />
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
              <Menu.Items
                className={`absolute left-0 ${markets.length > 6 ? 'bottom-45' : 'top-45'} mt-2 w-full px-15`}
              >
                <div className="max-h-300 overflow-scroll border-[1px] border-neutral-400 bg-white shadow-lg">
                  <>
                    {markets.map((market, index) => (
                      <Menu.Item key={index}>
                        <div className="overflow-y-scroll">
                          <button
                            onClick={() => handleMarketClick(market)}
                            className="flex h-24 items-center justify-center py-26 px-11"
                          >
                            <FlagIcons flagName={market.flag} className="mr-8 mt-3" />
                            <span className="text-14">{market.region}</span>
                          </button>
                        </div>
                      </Menu.Item>
                    ))}
                  </>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MarketButtonMobile;
