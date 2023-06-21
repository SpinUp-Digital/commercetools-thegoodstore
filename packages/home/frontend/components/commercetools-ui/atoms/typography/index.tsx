import React, { createElement, Fragment, ReactElement, useCallback } from 'react';
import { useRouter } from 'next/router';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import Skeleton from '../skeleton';
import { TypographyProps } from './types';

const Typography: React.FC<TypographyProps> = ({
  medium = false,
  children,
  underline = false,
  className = '',
  translation,
  as = 'p',
  fontSize,
  align = 'left',
  fontFamily = 'inter',
  lineHeight = 'normal',
  asSkeleton = false,
  ...props
}) => {
  const router = useRouter();
  const { formatMessage } = useFormat({ name: translation?.file });

  const getContent = useCallback(() => {
    // Check if the children has different locales
    if (typeof children !== 'string') {
      // Update text based on locale
      const locale = router?.locale || router?.defaultLocale;
      return children?.[locale as string];
    }

    // Check if there is translation
    if (translation) {
      const content = formatMessage({ id: translation.id, defaultMessage: children });
      return content;
    }

    return children;
  }, [formatMessage, router?.defaultLocale, router?.locale, translation, children]);

  const fontFamiliesRef = {
    inter: 'body',
    libre: 'heading',
  };

  // Constructing classnames of the element
  const elementClassName = useClassNames([
    { underline },
    `text-${align}`,
    { [`text-${fontSize}`]: !!fontSize },
    `leading-${lineHeight}`,
    { 'font-medium': medium },
    `font-${fontFamiliesRef[fontFamily]}`,
    { relative: asSkeleton },
    className,
  ]);

  // Constructing default props of the element
  const elementProps: ReactElement['props'] = {
    className: elementClassName,
    ...props,
  };

  const TypographyElement = createElement(
    as == 'fragment' ? Fragment : as,
    as !== 'fragment' && elementProps,
    <>
      {asSkeleton && <Skeleton />}
      {getContent()}
    </>,
  );

  return TypographyElement;
};

export default Typography;
