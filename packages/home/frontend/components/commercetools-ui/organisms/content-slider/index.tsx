import { FC, useMemo } from 'react';
import useCurrentBreakpoint from 'helpers/hooks/useCurrentBreakpoint';
import useImageSizes from 'helpers/hooks/useImageSizes';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { CurrentBreakpoint } from 'helpers/utils/breakpoints';
import * as screensizes from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Wrapper from '../content/wrapper';
import Link from '../../atoms/link';
import Slider from '../../atoms/slider';
import Subtitle from '../../atoms/subtitle';
import Title from '../../atoms/title';

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
  const [isDesktop] = useMediaQuery(screensizes.desktop);
  const [isTablet] = useMediaQuery(screensizes.tablet);
  const currentBreakPoint = useCurrentBreakpoint();
  const tileImageSizes = useImageSizes({ md: 1, lg: 0.33, defaultSize: 0.33 });

  type BreakpointsRef = {
    [key in CurrentBreakpoint]?: any;
  };

  const spaceBetweenRef: BreakpointsRef = {
    tablet: 24,
    mobile: 18,
  };

  const slidesElement = useMemo(
    () =>
      slides.map(({ image, title, ctaReference, ctaLabel }, index) => (
        <Link link={ctaReference} key={index} className="shrink overflow-hidden lg:shrink-0 lg:grow lg:basis-0">
          <div className="relative h-[220px] w-[246px] md:h-[356px] md:w-[400px]">
            <div className="absolute z-10 h-full w-full rounded-md bg-black opacity-20"></div>
            <Image {...image} sizes={tileImageSizes} className="mb-5 rounded-md" layout="fill" objectFit="cover" />
          </div>
          <h4 className="my-3.5 max-w-[90%] overflow-hidden text-ellipsis whitespace-pre text-18 font-normal">
            {title}
          </h4>
          <div className="flex gap-1.5">
            <p className="text-16 font-normal">{ctaLabel}</p>
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
          </div>
        </Link>
      )),
    [slides],
  );

  return (
    <Wrapper phonePadding="left-padding-only">
      {title && <Title className="mb-13" title={title} />}
      {subtitle && <Subtitle className="mb-24" subtitle={subtitle} />}
      {isDesktop ? (
        <div className="justify-stretch flex w-full gap-24">{slidesElement}</div>
      ) : (
        <Slider
          arrows={false}
          dots={false}
          slideWidth={isTablet ? 400 : 246}
          spaceBetween={spaceBetweenRef[currentBreakPoint] ?? 12}
        >
          {slidesElement}
        </Slider>
      )}
    </Wrapper>
  );
};
export default ContentSlider;
