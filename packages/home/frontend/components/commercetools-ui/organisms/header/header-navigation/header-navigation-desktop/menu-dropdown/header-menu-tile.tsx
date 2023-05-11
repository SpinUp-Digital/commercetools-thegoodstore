import React, { FC } from 'react';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Tile } from 'components/commercetools-ui/organisms/header/types';
import useClassNames from 'helpers/hooks/useClassNames';
import Image from 'frontastic/lib/image';

export interface Props {
  tileContent: Tile;
}

const HeaderDropdownTile: FC<React.PropsWithChildren<Props>> = ({ tileContent }) => {
  const tileHeaderTextClassName = useClassNames(['text-white drop-shadow-xl pb-15', tileContent?.tileHeaderDecoration]);
  const tileButtonClassName = useClassNames(['border-b-2 drop-shadow-xl', tileContent?.tileButtonLabelDecoration]);

  return (
    <div className="relative mt-2 h-[265px] w-[30%] lg:hidden xl:pl-20 2xl:flex">
      <Image
        media={tileContent?.tileImage.media}
        fill
        style={{ objectFit: 'cover' }}
        className="brightness-75"
        alt={tileContent?.tileImage.title}
      />
      <div className="absolute left-1/2 top-[42%] h-35 w-full -translate-x-1/2 -translate-y-1/2">
        <Typography fontSize={28} fontFamily="libre" as="h3" align="center" className={tileHeaderTextClassName}>
          {tileContent?.tileHeaderText}
        </Typography>
        <div className="flex justify-center">
          <Link variant="primary" link={tileContent?.tileButtonLink} className={tileButtonClassName}>
            <Typography fontSize={22} fontFamily="inter" className="text-white">
              {tileContent?.tileButtonLabel}
            </Typography>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderDropdownTile;
