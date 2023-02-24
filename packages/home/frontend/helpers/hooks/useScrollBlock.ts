import { useState } from 'react';
import { getScrollbarWidth } from 'helpers/utils/getScrollbarWidth';
import useTouchDevice from './useTouchDevice';

const useScrollBlock = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const { isTouchDevice } = useTouchDevice();

  const blockScrolling = () => {
    const scrollbarWidth = getScrollbarWidth();

    const header = document.querySelector('#header-container') as HTMLDivElement;

    if (!isTouchDevice) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      header.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflowY = 'hidden';
  };

  const allowScrolling = () => {
    const header = document.querySelector('#header-container') as HTMLDivElement;

    document.body.style.paddingRight = '0px';
    header.style.paddingRight = '0px';
    document.body.style.overflowY = 'auto';
  };

  const blockScroll = (status: boolean) => {
    if (status) blockScrolling();
    else allowScrolling();

    setIsBlocked(status);
  };

  return { isBlocked, blockScroll };
};

export default useScrollBlock;
