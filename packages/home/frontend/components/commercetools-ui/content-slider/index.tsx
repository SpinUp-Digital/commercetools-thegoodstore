import { FC } from 'react';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import { Reference, ReferenceLink } from 'helpers/reference';

type ContentSliderSlide = {
  image: NextFrontasticImage;
  title: string;
  ctaLabel?: string;
  ctaReference?: Reference;
};

export type ContentSliderProps = {
  title?: string;
  subtitle?: string;
  slides: ContentSliderSlide[];
};

const ContentSlider: FC<ContentSliderProps> = ({ title, subtitle, slides }) => {
  return (
    <div className="w-full px-3 sm:px-5 lg:px-24">
      {title && <h3 className="bold mb-3 text-3xl">{title}</h3>}
      {subtitle && <p className="mb-6 text-base font-light">{subtitle}</p>}

      <div className="overflow-auto scrollbar-hide">
        <div className="flex min-w-min gap-1.5 md:gap-6">
          {slides.map(({ image, title, ctaReference, ctaLabel }, index) => (
            <div key={index} className="w-60 md:w-[400px] lg:grow">
              <Image {...image} className="mb-5 w-full rounded" />
              <h4 className="mb-3.5 mt-3.5 text-lg font-normal">{title}</h4>
              <ReferenceLink target={ctaReference} className="flex gap-1.5">
                <p className="text-base font-normal">{ctaLabel}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </ReferenceLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ContentSlider;
