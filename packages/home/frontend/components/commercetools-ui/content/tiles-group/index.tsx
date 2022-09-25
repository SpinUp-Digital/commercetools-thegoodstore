import React from 'react';
import Tile, { TileProps } from '../tile';
import Wrapper from '../wrapper';

export interface Props {
  tiles: TileProps[];
}

const TilesGroup: React.FC<Props> = ({ tiles }) => {
  return (
    <Wrapper background="neutral-200">
      <div className="flex flex-col bg-neutral-200 md:flex-row lg:gap-16">
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} image={{ ...tile.image, layout: 'fill' }} className="h-[320px] lg:h-[475px]" />
        ))}
      </div>
    </Wrapper>
  );
};

export default TilesGroup;
