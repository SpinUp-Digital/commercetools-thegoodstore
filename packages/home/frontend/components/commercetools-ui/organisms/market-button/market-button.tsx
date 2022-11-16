import { useState } from 'react';
import { ChevronDownIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import FlagIcons from 'components/icons/flags';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  market?: Market;
  markets?: Market[];
  handleMarket: (market: Market) => void;
}

const MarketButton: React.FC<Props> = ({ market: selectedMarket, markets, handleMarket }) => {
  const [showMarket, setShowMarket] = useState(false);

  const { formatMessage: formatMarketMessage } = useFormat({ name: 'common' });

  const showMarketMenu = () => {
    setShowMarket(true);
  };

  const hideMarketMenu = () => {
    setShowMarket(false);
  };

  const handleMarketClick = (market: Market) => {
    handleMarket(market);
    setShowMarket(false);
  };

  const marketMenuClassName = useClassNames([
    'delay-50 fixed top-0 z-20 h-full w-356 bg-white transition ease-in-out',
    showMarket ? 'left-0 translate-x-0' : '-translate-x-400',
  ]);

  return (
    <div className="ml-10 hidden justify-center md:w-109 lg:flex lg:w-200 xl:w-300">
      {selectedMarket && (
        <Button variant="ghost" onClick={showMarketMenu} className="flex items-center justify-center p-3 text-14">
          <FlagIcons flagName={selectedMarket?.flag} className="mr-8 text-14" />
          {selectedMarket?.region} | {selectedMarket?.currency}
          <span dangerouslySetInnerHTML={{ __html: selectedMarket?.currencyCode }} className="ml-5 mr-20" />
          <ChevronDownIcon className="h-11 w-11" />
        </Button>
      )}
      {showMarket && (
        <div onClick={hideMarketMenu} className="fixed top-0 left-0 z-10 h-full w-full bg-black opacity-50" />
      )}

      <div onClick={hideMarketMenu} className={marketMenuClassName}>
        <div className="flex w-full justify-end">
          <Button
            variant="ghost"
            onClick={hideMarketMenu}
            title={formatMarketMessage({ id: 'close', defaultMessage: 'Close' })}
          >
            <XMarkIcon className="m-16 w-20" />
          </Button>
        </div>
        <Typography as="h5" fontSize={22} fontWeight="regular" className="px-26 pb-24 text-secondary-black">
          {formatMarketMessage({ id: 'select.market', defaultMessage: 'Select your market' })}
        </Typography>
        <>
          {markets.map((market) => (
            <Button
              key={market.flag}
              variant="secondary"
              onClick={() => handleMarketClick(market)}
              className="flex w-full items-center justify-start"
            >
              {selectedMarket?.region === market?.region && <CheckIcon className="mr-11 w-20" />}
              <FlagIcons flagName={market.flag} className="mr-8 text-14" />
              {market.region}
            </Button>
          ))}
        </>
      </div>
    </div>
  );
};
export default MarketButton;
