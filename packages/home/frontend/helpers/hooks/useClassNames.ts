import { useCallback } from 'react';

const useClassNames = () => {
  const resolveClassNames = useCallback((classNames: string[]) => {
    return classNames.filter(Boolean).join(' ');
  }, []);

  return { resolveClassNames };
};

export default useClassNames;
