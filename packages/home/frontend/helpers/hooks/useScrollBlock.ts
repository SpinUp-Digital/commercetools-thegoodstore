import { useState } from 'react';

const useScrollBlock = () => {
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const blockScrolling = () => {
    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'scroll';
  };

  const allowScrolling = () => {
    document.body.style.position = 'static';
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
