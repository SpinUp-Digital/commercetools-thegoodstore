import { useState, useRef } from 'react';

const useScrollBlock = () => {
  const scroll = useRef(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);

  const blockScrolling = () => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || scroll.current) return;

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = 'relative'; /* [1] */
    body.style.position = 'relative'; /* [1] */
    html.style.overflow = 'hidden'; /* [2] */
    body.style.overflow = 'hidden'; /* [2] */

    scroll.current = true;
  };

  const allowScrolling = () => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;
    const { body } = document;

    if (!body || !body.style || !scroll.current) return;

    html.style.position = '';
    html.style.overflow = '';
    body.style.position = '';
    body.style.overflow = '';
    body.style.paddingRight = '';

    scroll.current = false;
  };

  const blockScroll = (status: boolean) => {
    if (status) {
      blockScrolling();
    } else {
      allowScrolling();
    }

    setIsBlocked(status);
  };

  return { isBlocked, blockScroll };
};

export default useScrollBlock;
