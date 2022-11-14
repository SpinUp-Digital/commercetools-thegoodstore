import React from 'react';
import useImageSizes from 'helpers/hooks/useImageSizes';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop, tablet } from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Link from '../../atoms/link';
import Slider from '../../atoms/slider';
import Typography from '../../atoms/typography';
import Wrapper from '../content/wrapper';

export interface Props {
  tiles: Array<{
    title: string;
    image: NextFrontasticImage;
    target?: Reference;
  }>;
}

const CategorySlider: React.FC<Props> = ({ tiles = [] }) => {
  const [isDesktopSize] = useMediaQuery(desktop);

  const tileImageSizes = useImageSizes({ md: 0.5, lg: 0.25, defaultSize: 0.25 });

  return (
    <Wrapper background="neutral-200">
      <Slider
        slidesPerView={2.3}
        dots={false}
        spaceBetween={4}
        arrows={isDesktopSize && tiles.length > 4}
        allowTouchMove
        loop
        breakpoints={{
          [tablet]: {
            spaceBetween: 8,
          },
          [desktop]: {
            allowTouchMove: tiles.length > 4,
            loop: tiles.length > 4,
            spaceBetween: 16,
            slidesPerView: 4,
          },
        }}
      >
        {tiles.map((tile, index) => (
          <Link key={index} link={tile.target} className="block">
            <div className="relative h-[160px] sm:h-[256px] md:h-[356px]">
              <Image
                {...tile.image}
                sizes={tileImageSizes}
                alt={tile.title}
                layout="fill"
                objectFit="cover"
                className="brightness-75"
                loading="eager"
              />
            </div>
            <Typography
              as="h6"
              fontSize={14}
              align="center"
              className="mt-5 block overflow-hidden truncate rounded-b-sm border-neutral-300 py-5 md:text-16 lg:mt-0 lg:border lg:bg-white lg:py-10"
            >
              {tile.title}
            </Typography>
          </Link>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default CategorySlider;
