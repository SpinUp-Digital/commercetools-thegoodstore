import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Drawer from 'components/commercetools-ui/atoms/drawer';
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

  const marketButtonLabel = `${selectedMarket?.region} | ${selectedMarket?.currency} ${selectedMarket?.currencyCode}`;

  return (
    <div className="ml-10 hidden justify-center md:w-109 lg:flex lg:w-200 xl:w-300">
      {selectedMarket && (
        <Button variant="ghost" onClick={showMarketMenu} className="flex w-full items-center justify-center p-3">
          <FlagIcons flagName={selectedMarket?.flag} className="mr-3 w-30" />
          <span className="ml-5 mr-20 text-14 font-normal text-secondary-black">{marketButtonLabel}</span>
        </Button>
      )}

      <Drawer isOpen={showMarket} direction="left" className="w-[90%] max-w-[380px]" onClose={hideMarketMenu}>
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
