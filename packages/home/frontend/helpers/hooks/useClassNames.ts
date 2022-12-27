import { useCallback, useEffect, useState } from 'react';

// Hook can take an array of either simple strings or conditioned classnames
// example: ['firstClassName', {'secondClassName': BooleanToCheck}]
// Only if Boolean is true in the example above the className will be added
type ClassName = string | undefined | null | boolean | { [key: string]: boolean };

// Should be extended with any further options
type UseClassNamesOptions = { prefix?: string };
type UseClassNames = (classNames: ClassName[], options?: UseClassNamesOptions) => string;

const useClassNames: UseClassNames = (classNames, options) => {
  const [result, setResult] = useState('');

  const resolveClassNameOptions = useCallback(
    (className: string) => {
      return `${options?.prefix ?? ''}${className}`;
    },
    [options?.prefix],
  );

  const resolveObject = useCallback(
    (className) => {
      const value = Object.keys(className)[0];
      const condition = Object.values(className)[0];
      return condition ? resolveClassNameOptions(value) : '';
    },
    [resolveClassNameOptions],
  );

  const resolveClassName = useCallback(
    (className) => {
      if (typeof className == 'object') {
        return resolveObject(className);
      } else if (className) {
        return resolveClassNameOptions(className);
      }
    },
    [resolveClassNameOptions, resolveObject],
  );

  const resolveClassNames = useCallback(
    (classNames) => {
      const stringifiedClassNames = [] as ClassName[];

      classNames.map((className: ClassName) => {
        const resolvedClassName: string = resolveClassName(className) as string;
        stringifiedClassNames.push(resolvedClassName);
      });

      return stringifiedClassNames;
    },
    [resolveClassName],
  );

  useEffect(() => {
    const resolvedClassNames = resolveClassNames(classNames);
    setResult(resolvedClassNames.join(' '));
  }, [classNames, resolveClassNames]);

  return result;
};

export default useClassNames;
