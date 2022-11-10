import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Market, Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import Image from 'frontastic/lib/image';

export interface Props {
  tileContent: Tile;
  market: Market;
}

const HeaderDropdownTile: FC<Props> = ({ tileContent, market }) => {
  const locale = market?.locale;
  const tileHeaderTextClassName = useClassNames([
    'absolute top-83 left-1/2 h-35 w-full -translate-x-1/2 -translate-y-1/2 text-28 text-white drop-shadow-xl',
    tileContent?.tileHeaderDecoration,
  ]);
  const tileButtonClassName = useClassNames([
    'absolute top-144 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-2 text-24 text-white drop-shadow-xl',
    tileContent?.tileButtonLabelDecoration,
  ]);

  return (
    <div className="relative mt-2 h-[265px] w-[40%] xl:pl-20">
      <Image
        media={tileContent?.tileImage.media}
        layout="fill"
        objectFit="cover"
        className="brightness-75"
        alt={tileContent?.tileImage.title[locale]}
      />
      <Typography as="h3" align="center" fontWeight="bold" className={tileHeaderTextClassName}>
        {tileContent?.tileHeaderText}
      </Typography>
      <Link link={tileContent?.tileButtonLink} className={tileButtonClassName}>
        {tileContent?.tileButtonLabel}
      </Link>
    </div>
  );
};

export default HeaderDropdownTile;
