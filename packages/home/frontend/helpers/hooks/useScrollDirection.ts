import { useEffect, useRef, useState } from 'react';

const useScrollDirection = (scrollDownOffset: number, scrollUpOffset: number) => {
  const [scrollDirection, setScrollDirection] = useState(null);
  const lastScrollYRef = useRef(0);
  const updateScrollDirection = () => {
    const lastScrollY = lastScrollYRef.current;
    const scrollY = window.pageYOffset;
    const direction = scrollY > lastScrollY ? 'down' : 'up';

    if (
      direction !== scrollDirection &&
      (scrollY - lastScrollY > scrollDownOffset || scrollY - lastScrollY < scrollUpOffset)
    ) {
      setScrollDirection(direction);
    }
    lastScrollYRef.current = scrollY > 0 ? scrollY : 0;
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [updateScrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
