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
  primary: 'lg:text-16 cursor-pointer text-neutral-500 hover:text-neutral-400',
  'menu-item': 'border-secondary-black text-secondary-black hover:border-b-[1px]',
  breadcrumb: 'font-medium text-primary-black',
  'menu-header': 'font-medium text-primary-black cursor-pointer',
};

const Link: FC<LinkProps> = ({ link, children, className = '', variant = 'primary', title = '', ...props }) => {
  const linkUrl = useMemo(() => {
    if (!link) return '#';
    if (typeof link === 'string') return link;

    return resolveReferenceTarget(link);
  }, [link]);

  const linkProps = useMemo(() => {
    if (!link || typeof link === 'string') return {};

    return resolveReferenceProps(link);
  }, [link]);

  const linkClassNames = useClassNames(['text-14', variantStyle[variant], className]);

  return (
    <NextLink href={linkUrl}>
      <a className={linkClassNames} title={title} {...props} {...linkProps}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
