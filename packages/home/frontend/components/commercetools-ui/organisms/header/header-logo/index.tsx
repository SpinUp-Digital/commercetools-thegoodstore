import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface Props {
  logo: NextFrontasticImage;
  logoLink: Reference;
  imageClassName?: string;
}

const HeaderLogo: FC<Props> = ({ logoLink, logo, imageClassName }) => {
  return (
    <div className="relative px-10 md:mt-0">
      <Link className={imageClassName} link={logoLink}>
        <Image media={logo.media} layout="fill" objectFit="contain" alt={logo.title} />
      </Link>
    </div>
  );
};

export default HeaderLogo;
