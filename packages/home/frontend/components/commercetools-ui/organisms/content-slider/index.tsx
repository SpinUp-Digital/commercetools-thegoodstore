import { FC, useMemo } from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import Typography from 'components/commercetools-ui/atoms/typography';
import useCurrentBreakpoint from 'helpers/hooks/useCurrentBreakpoint';
import useImageSizes from 'helpers/hooks/useImageSizes';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { CurrentBreakpoint } from 'helpers/utils/breakpoints';
import * as screensizes from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Wrapper from '../../../HOC/wrapper';
import Link from '../../atoms/link';
import Slider from '../../atoms/slider';
import Subtitle from '../../atoms/subtitle';

type ContentSliderSlide = {
  image: NextFrontasticImage;
  title: string;
  ctaLabel?: string;
  summary?: string;
  ctaReference?: Reference;
};

export type ContentSliderProps = {
  title?: string;
  subtitle?: string;
  slides: ContentSliderSlide[];
};

const ContentSlider: FC<ContentSliderProps> = ({ title, subtitle, slides }) => {
  const [isDesktop] = useMediaQuery(screensizes.mediumDesktop);
  const [isTablet] = useMediaQuery(screensizes.tablet);
  const currentBreakPoint = useCurrentBreakpoint();
  const tileImageSizes = useImageSizes({ md: 1, lg: 0.33, defaultSize: 0.33 });

  type BreakpointsRef = {
    [key in CurrentBreakpoint]?: number;
  };

  const spaceBetweenRef: BreakpointsRef = {
    tablet: 24,
    mobile: 18,
  };

  const slidesElement = useMemo(
    () =>
      slides.map(({ image, title, summary, ctaReference, ctaLabel }, index) => (
        <Link link={ctaReference} key={index} className="shrink overflow-hidden lg:shrink-0 lg:grow lg:basis-0">
          {image && (
            <div className="relative h-[220px] md:h-[356px]">
              <div className="absolute z-10 h-full w-full rounded-md bg-black opacity-20"></div>
              <Image {...image} sizes={tileImageSizes} className="mb-5 rounded-md" layout="fill" objectFit="cover" />
            </div>
          )}
          {title && (
            <Typography
              as="h4"
              fontSize={20}
              fontFamily="libre"
              className="mt-12 max-w-[90%] overflow-hidden text-ellipsis whitespace-pre text-primary-black"
            >
              {title}
            </Typography>
          )}
          {summary && (
            <Typography as="p" fontSize={16} fontFamily="inter" className="mt-12 leading-[24px]">
              {summary}
            </Typography>
          )}
          {ctaLabel && (
            <div className="mt-20 flex gap-1.5">
              <Typography fontSize={16} className="hidden text-black md:block">
                {ctaLabel}
              </Typography>
              <ArrowLongRightIcon className="mt-2 h-20 w-24 text-secondary-black" />
            </div>
          )}
        </Link>
      )),
    [slides, tileImageSizes],
  );

  return (
    <Wrapper>
      {title && (
        <Typography className="mb-12 md:text-22 lg:text-28" fontSize={20} as="h3" fontFamily="libre">
          {title}
        </Typography>
      )}
      {subtitle && <Subtitle className="mb-24" subtitle={subtitle} />}
      {isDesktop ? (
        <div className="flex w-full gap-24">{slidesElement}</div>
      ) : (
        <Slider
          arrows
          dots={false}
          slideWidth={isTablet ? 400 : 246}
          spaceBetween={spaceBetweenRef[currentBreakPoint as keyof typeof spaceBetweenRef] ?? 12}
          allowTouchMove={!isDesktop}
        >
          {slidesElement}
        </Slider>
      )}
    </Wrapper>
  );
};
export default ContentSlider;
