import React, { FC } from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';

export interface Props {
  title: string;
  image: string;
  buttonLabel: string;
  buttonLink: Reference;
}

const HeaderMenuTileDesktop: FC<Props> = ({ title, image, buttonLabel, buttonLink }) => {
  return (
    <div className="relative pl-25">
      <img src={image} className="w-506" alt="Navigation Image" />
      <div className="absolute top-83 left-1/2 h-35 w-full -translate-x-1/2 -translate-y-1/2 text-center  text-28 font-bold text-white">
        {title}
      </div>
      <ReferenceLink
        target={buttonLink}
        className="absolute top-144 left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-2 text-24 text-white"
      >
        {buttonLabel}
      </ReferenceLink>
    </div>
  );
};

export default HeaderMenuTileDesktop;
