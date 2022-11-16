import React, { useMemo } from 'react';
import NextLink from 'next/link';
import useClassNames from 'helpers/hooks/useClassNames';
import { resolveReferenceProps, resolveReferenceTarget } from 'helpers/reference';
import { Reference } from 'types/reference';

interface Props extends React.ComponentProps<'a'> {
  link: string | Reference;
  variant?: 'primary' | 'menu-header' | 'menu-item' | 'breadcrumb';
}

const variantStyle = (variant: 'primary' | 'menu-header' | 'menu-item' | 'breadcrumb') => {
  switch (variant) {
    case 'primary':
      return 'text-14 lg:text-16 cursor-pointer text-neutral-500 hover:text-neutral-400';
    case 'menu-header':
      return 'text-14 font-medium text-primary-black cursor-pointer';
    case 'menu-item':
      return 'text-14 font-light border-secondary-black text-secondary-black hover:border-b-[1px]';
    case 'breadcrumb':
      return 'text-14 font-medium text-primary-black';
  }
};

const Link: React.FC<Props> = ({ link, children, className = '', variant, title = '', ...props }) => {
  const linkUrl = useMemo(() => {
    if (!link) return '#';
    if (typeof link === 'string') return link;

    return resolveReferenceTarget(link);
  }, [link]);

  const linkProps = useMemo(() => {
    if (!link || typeof link === 'string') return {};

    return resolveReferenceProps(link);
  }, [link]);

  const linkClassNames = useClassNames([variantStyle(variant), className]);

  return (
    <NextLink href={linkUrl}>
      <a className={linkClassNames} title={title} {...props} {...linkProps}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
