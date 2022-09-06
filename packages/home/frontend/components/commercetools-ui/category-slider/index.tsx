import React from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface Props {
  tiles: Array<{
    title: string;
    image: NextFrontasticImage;
    target?: Reference;
  }>;
}

const CategorySlider: React.FC<Props> = ({ tiles = [] }) => {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-1 overflow-x-auto scrollbar-hide lg:gap-3">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`w-[40%] shrink-0 snap-center ${
            [1, tiles.length - 2].includes(index) ? 'snap-normal' : 'snap-always'
          } lg:shrink lg:grow`}
        >
          <ReferenceLink target={tile.target} className="block">
            <Image {...tile.image} alt={tile.title} className="lg:w-full" />
            <span className="block border-slate-300 py-2 text-center text-xs md:text-base lg:border">{tile.title}</span>
          </ReferenceLink>
        </div>
      ))}
    </div>
  );
};

export default CategorySlider;
