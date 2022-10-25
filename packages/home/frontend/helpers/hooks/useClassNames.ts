import { useCallback } from 'react';

// Hook can take an array of either simple strings or conditioned classnames
// example: ['firstClassName', {'secondClassName': BooleanToCheck}]
// Only if Boolean is true in the example above the className will be added
type ClassNames = Array<string | { [key: string]: Boolean }>;
type UseClassNames = (classNames: ClassNames) => string;

const useClassNames: UseClassNames = (classNames) => {
  const resolveClassNames = useCallback(
    (classNames) => {
      const stringifiedClassNames: Array<string> = [];

      classNames.map((className) => {
        if (typeof className == 'object') {
          const value = Object.keys(className)[0];
          const condition = Object.values(className)[0];
          if (condition) stringifiedClassNames.push(value);
        } else stringifiedClassNames.push(className);
      });

      return stringifiedClassNames.join(' ');
    },
    [classNames],
  );

  return resolveClassNames(classNames);
};

export default useClassNames;
