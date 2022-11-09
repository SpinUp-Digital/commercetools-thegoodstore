import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Market } from 'components/commercetools-ui/organisms/header/types';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface Props {
  title: string;
  image: NextFrontasticImage;
  buttonLabel: string;
  buttonLink: Reference;
  market: Market;
}

const HeaderDropdownTile: FC<Props> = ({ title, image, buttonLabel, buttonLink, market }) => {
  const locale = market?.locale;

  return (
    <div className="relative mt-2 h-[265px] w-[40%] xl:pl-20">
      <Image media={image.media} layout="fill" objectFit="cover" className="brightness-75" alt={image.title[locale]} />
      <Typography
        as="h3"
        align="center"
        fontWeight="bold"
        className="absolute top-83 left-1/2 h-35 w-full -translate-x-1/2 -translate-y-1/2 text-28 text-white drop-shadow-xl"
      >
        {title}
      </Typography>
      <Link
        link={buttonLink}
        className="absolute top-144 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-2 text-24 text-white drop-shadow-xl"
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default HeaderDropdownTile;
