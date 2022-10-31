import React, { useMemo } from 'react';
import NextLink from 'next/link';
import { resolveReferenceProps, resolveReferenceTarget } from 'helpers/reference';
import { Reference } from 'types/reference';

interface Props extends React.ComponentProps<'a'> {
  link: string | Reference;
}

const Link: React.FC<Props> = ({ link, children, className = '', title = '', ...props }) => {
  const linkUrl = useMemo(() => {
    if (!link) return '#';
    if (typeof link === 'string') return link;

    return resolveReferenceTarget(link);
  }, [link]);

  const linkProps = useMemo(() => {
    if (!link || typeof link === 'string') return {};

    return resolveReferenceProps(link);
  }, [link]);

  return (
    <NextLink href={linkUrl}>
      <a className={className} title={title} {...props} {...linkProps}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
