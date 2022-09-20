import { FC } from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Wrapper from '../content/wrapper';
import Title from '../title';
import Subtitle from '../subtitle';

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
    <Wrapper phonePadding>
      {title && <Title title={title} />}
      {subtitle && <Subtitle subtitle={subtitle} />}
      <div className="overflow-auto scrollbar-hide">
        <div className="flex min-w-min gap-8 md:gap-24">
          {slides.map(({ image, title, ctaReference, ctaLabel }, index) => (
            <div key={index} className="w-[246px] md:w-[400px] lg:grow">
              <Image {...image} className="mb-5 rounded" />
              <h4 className="font-libre-baskerville my-3.5 text-18 font-normal">{title}</h4>
              <ReferenceLink target={ctaReference} className="flex gap-1.5">
                <p className="font-inter text-16 font-normal">{ctaLabel}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7.5 w-18"
                >
                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </ReferenceLink>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
export default ContentSlider;
