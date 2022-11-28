import React, { FC, useCallback, useEffect, useRef } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import useOnClickOutside from 'helpers/hooks/useOnClickOutside';
import useScrollBlock from 'helpers/hooks/useScrollBlock';

export interface DrawerProps {
  className?: string;
  isOpen: boolean | string | undefined | null;
  direction: 'left' | 'top' | 'right' | 'bottom';
  blockScrolling?: boolean;
  onClose?: () => void;
}

const Drawer: FC<DrawerProps> = ({ className, isOpen, direction, blockScrolling = true, onClose, children }) => {
  const [allowScroll, blockScroll] = useScrollBlock();

  useEffect(() => {
    if (blockScrolling) {
      if (isOpen) {
        allowScroll();
      } else {
        blockScroll();
      }
    }
  }, [isOpen, allowScroll, blockScroll, blockScrolling]);

  const ref = useRef();
  useOnClickOutside(ref, () => {
    !!isOpen && onClose?.();
  });

  const directionStyles = {
    left: 'left-0 top-0 h-full',
    top: 'left-0 top-0 w-full',
    right: 'right-0 top-0 h-full',
    bottom: 'left-0 bottom-0 w-full',
  };

  const getTransitionStyles = useCallback(() => {
    if (isOpen) return 'opacity-1';
    else {
      const transitionStyles = {
        left: '-translate-x-full opacity-0',
        top: '-translate-y-full opacity-0',
        right: 'translate-x-full opacity-0',
        bottom: 'translate-y-full opacity-0',
      };

      return transitionStyles[direction];
    }
  }, [isOpen, direction]);

  const drawerClassName = useClassNames([
    className,
    'fixed z-50 flex flex-col items-stretch bg-neutral-200 shadow-lg transition duration-300 ease-out',
    directionStyles[direction],
    getTransitionStyles(),
  ]);

  return (
    <>
      {isOpen && <div className="fixed top-0 left-0 z-10 h-full w-full bg-secondary-black opacity-30" />}

      <div ref={ref} className={drawerClassName}>
        <>{children}</>
      </div>
    </>
  );
};

export default Drawer;
