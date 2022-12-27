import React from 'react';
import Tile, { TileProps } from 'components/commercetools-ui/organisms/content/tile';

interface Props {
  data: TileProps;
}

const TileTastic = ({ data }: Props) => {
  return (
    <Tile
      image={data.image}
      title={data.title}
      subtitle={data.subtitle}
      ctaLabel={data.ctaLabel}
      ctaReference={data.ctaReference}
    />
  );
};

export default TileTastic;
