import React, { createElement, Fragment, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  children,
  className,

  // Defaulting to render the element as fragment if needed
  as = Fragment,
  lineHeight = 'normal',
  fontSize = 16,
  fontFamily = 'inter',
  fontWeight = 'regular',
  align = 'left',
  translation,
  ...props
}) => {
  const router = useRouter();
  const [text, setText] = useState<TypographyProps['children']>(children);
  const { formatMessage } = useFormat({ name: translation?.file });

  // Check if the children has different locales
  if (typeof children !== 'string') {
    // Update text based on locale
    const locale = router?.locale || router?.defaultLocale;
    setText(children[locale]);
  }

  // Check if there is translation
  if (translation) {
    const content = formatMessage({ id: translation.id, defaultMessage: children });
    setText(content);
  }

  // Constructing classnames of the element
  const elementClassName = useClassNames([
    `leading-${lineHeight}`,
    `text-${fontSize}`,
    `text-${align}`,
    `font-${fontWeight}`,
    `font-${fontFamily}`,
    className,
  ]);

  // Constructing default props of the element
  const defaultProps: ReactElement['props'] = {
    className: elementClassName,
    ...props,
  };

  // Fallback to empty props if
  const elementProps = as === Fragment ? {} : defaultProps;

  const TypographyElement = createElement(as, elementProps, text);

  return TypographyElement;
};

export default Typography;
