import React, { useMemo } from 'react';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useTouchDevice from 'helpers/hooks/useTouchDevice';
import { mediumDesktop, tablet } from 'helpers/utils/screensizes';
import Wrapper from '../../../HOC/wrapper';
import Slider from '../../atoms/slider';
import Tile, { Props as TileProps } from './tile';

export interface Props {
  tiles: Array<TileProps['tile']>;
}

const CategorySlider: React.FC<Props> = ({ tiles = [] }) => {
  const { isTouchDevice } = useTouchDevice();

  const [isDesktopSize] = useMediaQuery(mediumDesktop);

  const fitsToScreenSize = useMemo(
    () => (isDesktopSize && tiles.length <= 4) || (!isDesktopSize && tiles.length <= 2),
    [isDesktopSize, tiles.length],
  );

  return (
    <Wrapper background="neutral-200" variant="left-padding-only">
      <Slider
        slidesPerView={isTouchDevice ? 2.3 : 1.3}
        dots={false}
        spaceBetween={4}
        arrows={!fitsToScreenSize}
        allowTouchMove={!fitsToScreenSize}
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
