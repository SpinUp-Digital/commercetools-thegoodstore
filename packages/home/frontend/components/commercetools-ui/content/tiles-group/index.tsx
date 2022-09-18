import React from 'react';
import Tile, { TileProps } from '../tile';

export interface Props {
  tiles: TileProps[];
}

const TilesGroup: React.FC<Props> = ({ tiles }) => {
  return (
    <div className="flex flex-col bg-neutral-200 py-12 md:flex-row md:gap-16 md:py-24 lg:px-96">
      {tiles.map((tile, index) => (
        <Tile key={index} {...tile} />
      ))}
    </div>
  );
};

export default TilesGroup;
