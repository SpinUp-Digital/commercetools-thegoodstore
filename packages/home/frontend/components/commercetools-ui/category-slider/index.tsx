import React from 'react';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { Reference, ReferenceLink } from 'helpers/reference';
import { desktop, tablet } from 'helpers/utils/screensizes';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Wrapper from '../content/wrapper';
import Slider from '../slider';
import Typography from '../typography';

export interface Props {
  tiles: Array<{
    title: string;
    image: NextFrontasticImage;
    target?: Reference;
  }>;
}

const CategorySlider: React.FC<Props> = ({ tiles = [] }) => {
  const [isTabletSize] = useMediaQuery(tablet);
  const [isDesktopSize] = useMediaQuery(desktop);

  return (
    <Wrapper background="neutral-200">
      <Slider
        slidesPerView={isDesktopSize ? 4 : 2.3}
        dots={false}
        spaceBetween={isDesktopSize ? 16 : isTabletSize ? 8 : 4}
        arrows={isDesktopSize}
        loop
      >
        {tiles.map((tile, index) => (
          <ReferenceLink key={index} target={tile.target} className="block">
            <div className="relative h-[160px] sm:h-[256px] md:h-[356px]">
              <Image {...tile.image} alt={tile.title} layout="fill" objectFit="cover" className="brightness-75" />
            </div>
            <h6 className="mt-5 block rounded-b-sm border-neutral-300 py-5 text-center text-12 leading-normal md:text-16 lg:mt-0 lg:border lg:bg-white lg:py-10">
              <Typography>{tile.title}</Typography>
            </h6>
          </ReferenceLink>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CategorySlider;
