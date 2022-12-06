import React, { ComponentProps, FC, useMemo } from 'react';
import NextLink from 'next/link';
import useClassNames from 'helpers/hooks/useClassNames';
import { resolveReferenceProps, resolveReferenceTarget } from 'helpers/reference';
import { Reference } from 'types/reference';

export interface LinkProps extends ComponentProps<'a'> {
  link: string | Reference;
  variant?: 'primary' | 'menu-header' | 'menu-item' | 'breadcrumb';
}

type VariantStyle = { [key in LinkProps['variant']]: string };

const variantStyle: VariantStyle = {
  primary: 'text-14 lg:text-16 cursor-pointer text-neutral-500 hover:text-neutral-400',
  'menu-item': 'text-secondary-black hover:underline hover:underline-offset-2',
  breadcrumb: 'text-14 font-medium text-primary-black',
  'menu-header': 'text-14 font-medium text-primary-black cursor-pointer',
};

const Link: FC<LinkProps> = ({ link, children, className = '', variant, title = '', ...props }) => {
  const linkUrl = useMemo(() => {
    if (!link) return '#';
    if (typeof link === 'string') return link;

    return resolveReferenceTarget(link);
  }, [link]);

  const linkProps = useMemo(() => {
    if (!link || typeof link === 'string') return {};

    return resolveReferenceProps(link);
  }, [link]);

  const linkClassNames = useClassNames([variantStyle[variant], className]);

  return (
    <NextLink href={linkUrl}>
      <a className={linkClassNames} title={title} {...props} {...linkProps}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
