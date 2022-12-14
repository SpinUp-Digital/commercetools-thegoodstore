import { Children, isValidElement, ReactNode } from 'react';

export function getFirstChildPropValue(
  children: ReactNode,
  propNameCb: (props: Record<string, unknown>) => string,
): string | string[] | undefined {
  let propValue = undefined;

  Children.forEach(children, (element) => {
    if (!isValidElement(element)) return;
    const propName = propNameCb(element.props);
    if (propName in element.props) {
      propValue = element.props[propName];
      return;
    }
  });

  return propValue;
}
