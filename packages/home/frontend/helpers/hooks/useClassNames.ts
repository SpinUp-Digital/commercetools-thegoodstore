import { useCallback } from 'react';

// Hook can take an array of either simple strings or conditioned classnames
// example: ['firstClassName', {'secondClassName': BooleanToCheck}]
// Only if Boolean is true in the example above the className will be added
type ClassNames = Array<string | { [key: string]: Boolean }>;

// Should be extended with any further options
type UseClassNamesOptions = { prefix?: string };
type UseClassNames = (classNames: ClassNames, options?: UseClassNamesOptions) => string;

const useClassNames: UseClassNames = (classNames, options) => {
  const stringifiedClassNames: Array<string> = [];

  const addClassName = (className: string) => {
    stringifiedClassNames.push(`${options?.prefix ?? ''}${className}`);
  };

  const resolveClassNames = useCallback(
    (classNames) => {
      classNames.map((className) => {
        if (typeof className == 'object') {
          const value = Object.keys(className)[0];
          const condition = Object.values(className)[0];
          if (condition) addClassName(value);
        } else if (className) addClassName(className);
      });

      return stringifiedClassNames.join(' ');
    },
    [classNames],
  );

  return resolveClassNames(classNames);
};

export default useClassNames;
