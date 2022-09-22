import { Dispatch, SetStateAction, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import CloseIcon from 'components/icons/close';
import FlagIcons from 'components/icons/flags';
import { Market } from '../interfaces';
interface Props {
  currentMarket?: Market;
  markets?: Market[];
  setCurrentMarket: Dispatch<SetStateAction<Market>>;
}

const MarketButtonMobile: React.FC<Props> = ({ currentMarket, setCurrentMarket, markets }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-58">
      <div className="m-10 text-12 ">Select your country</div>
      <div
        onClick={() => setShow(true)}
        className="mx-10 flex h-40 w-11/12 cursor-pointer items-center justify-between border-[1px] border-neutral-400 bg-white text-16 font-medium"
      >
        <div className="ml-10 flex w-fit justify-start">
          <FlagIcons flagName={currentMarket.flag} className="mr-8 mt-3 text-14" />
          {currentMarket.region} | {currentMarket.currency}
          <span dangerouslySetInnerHTML={{ __html: currentMarket.currencyCode }} className="ml-5 mr-20" />
        </div>
        <div className="mr-10 flex w-fit justify-end">
          <ChevronDownIcon className=" h-11 w-11" />
        </div>
      </div>
      {show && (
        <div className="fixed top-0 left-0 z-20 h-full w-4/5 bg-white">
          <div className="flex w-full items-center justify-between border-b-[1px] border-neutral-400 px-20 py-22">
            <div className="flex w-3/4 justify-start text-12 font-normal ">Select shipping country</div>
            <button onClick={() => setShow(false)} className="flex w-1/5 justify-end py-10">
              <CloseIcon className="w-10" />
            </button>
          </div>
          <>
            {markets.map((market, index) => (
              <div key={index} className="overflow-y-scroll">
                <button
                  onClick={() => {
                    setCurrentMarket(market);
                    setShow(false);
                  }}
                  className="flex h-24 items-center justify-center p-26 text-14"
                >
                  <FlagIcons flagName={market.flag} className="mr-8 mt-3" />
                  {market.region}
                </button>
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};

export default MarketButtonMobile;
