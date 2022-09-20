import React from 'react';
import Tile, { TileProps } from '../tile';
import Wrapper from '../wrapper';

export interface Props {
  tiles: TileProps[];
}

const TilesGroup: React.FC<Props> = ({ tiles }) => {
  return (
    <Wrapper background="neutral">
      <div className="flex flex-col md:flex-row md:gap-16">
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} />
        ))}
      </div>
    </Wrapper>
  );
};

export default TilesGroup;
