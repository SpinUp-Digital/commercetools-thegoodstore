import { useContext, useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Drawer from 'components/commercetools-ui/atoms/drawer';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import FlagIcons from 'components/icons/flags';
import { useFormat } from 'helpers/hooks/useFormat';
import { MarketContext } from 'frontastic/provider/marketProvider';

const MarketButton = () => {
  const [showMarket, setShowMarket] = useState(false);
  const { market: selectedMarket, markets, handleMarket } = useContext(MarketContext);

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

  return (
    <div className="mx-48 hidden justify-center lg:flex">
      {selectedMarket && (
        <Button variant="ghost" onClick={showMarketMenu} className="flex w-fit items-center px-0 py-4">
          <FlagIcons flagName={selectedMarket?.flag} className="mr-3 w-30" />
          <Typography fontSize={14} className="ml-5 text-neutral-100 hover:border-b">
            {selectedMarket?.region}
          </Typography>
        </Button>
      )}

      <Drawer
        isOpen={showMarket}
        direction="left"
        className="w-[90%] max-w-[380px] bg-neutral-100"
        onClose={hideMarketMenu}
      >
        <div className="flex w-full items-center justify-between border-b-[1px] border-neutral-400 py-20">
          <Typography as="h5" fontFamily="libre" fontSize={22} className=" pl-15 text-secondary-black">
            {formatMarketMessage({ id: 'select.market', defaultMessage: 'Select your market' })}
          </Typography>
          <Button
            variant="ghost"
            onClick={hideMarketMenu}
            title={formatMarketMessage({ id: 'close', defaultMessage: 'Close' })}
          >
            <XMarkIcon className="w-25" />
          </Button>
        </div>

        <div className="py-35">
          {markets.map((market) => (
            <Button
              key={market.flag}
              variant="ghost"
              onClick={() => handleMarketClick(market)}
              className="ml-5 flex w-full items-center justify-start py-15 text-16"
            >
              {selectedMarket?.region === market?.region && <CheckIcon className="ml-5 mr-11 w-20" />}
              <FlagIcons flagName={market.flag} className="mr-8 w-30" />
              {market.region}
            </Button>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
export default MarketButton;
