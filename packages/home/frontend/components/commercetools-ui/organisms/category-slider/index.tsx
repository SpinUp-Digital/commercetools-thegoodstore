import React, { useMemo } from 'react';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { mediumDesktop, tablet } from 'helpers/utils/screensizes';
import Slider from '../../atoms/slider';
import Wrapper from '../content/wrapper';
import Tile, { Props as TileProps } from './tile';

export interface Props {
  tiles: Array<TileProps['tile']>;
}

const CategorySlider: React.FC<Props> = ({ tiles = [] }) => {
  const [isDesktopSize] = useMediaQuery(mediumDesktop);
  const [isTablet, width] = useMediaQuery(tablet);

  const fitsToScreenSize = useMemo(
    () => (isDesktopSize && tiles.length <= 4) || (!isDesktopSize && tiles.length <= 2),
    [isDesktopSize, tiles.length],
  );

  return (
    <Wrapper background="neutral-200" variant="left-padding-only">
      <Slider
        key={`${isDesktopSize} ${fitsToScreenSize}`}
        slidesPerView={2.3}
        dots={false}
        spaceBetween={4}
        arrows={isTablet && !fitsToScreenSize}
        allowTouchMove={!isDesktopSize && !fitsToScreenSize}
        breakpoints={{
          [tablet]: {
            spaceBetween: 8,
            slidesPerView: 2.3,
          },
          [mediumDesktop]: {
            spaceBetween: 16,
            slidesPerView: 4,
          },
        }}
      >
        {tiles.map((tile, index) => (
          <Tile key={index} tile={tile} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CategorySlider;
