import { FC, useMemo } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import useCurrentBreakpoint from 'helpers/hooks/useCurrentBreakpoint';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useTouchDevice from 'helpers/hooks/useTouchDevice';
import { CurrentBreakpoint } from 'helpers/utils/breakpoints';
import * as screensizes from 'helpers/utils/screensizes';
import Wrapper from '../../../HOC/wrapper';
import Slider from '../../atoms/slider';
import Subtitle from '../../atoms/subtitle';
import ContentSliderSlide from './slide';
import { ContentSliderProps } from './types';

const ContentSlider: FC<ContentSliderProps> = ({ title, subtitle, slides }) => {
  const [isDesktopSize] = useMediaQuery(screensizes.mediumDesktop);
  const [isTablet] = useMediaQuery(screensizes.tablet);
  const currentBreakPoint = useCurrentBreakpoint();

  const { isTouchDevice } = useTouchDevice();

  type BreakpointsRef = {
    [key in CurrentBreakpoint]?: number;
  };

  const spaceBetweenRef: BreakpointsRef = {
    tablet: 24,
    mobile: 18,
  };

  const showArrows = useMemo(
    () => !isTouchDevice && !((isDesktopSize && slides.length <= 4) || (!isDesktopSize && slides.length <= 2)),
    [isDesktopSize, isTouchDevice, slides.length],
  );

  const slidesElement = useMemo(
    () => slides.map((slide, index) => <ContentSliderSlide key={index} {...slide} />),
    [slides],
  );

  return (
    <Wrapper>
      {title && (
        <Typography className="mb-12 md:text-22 lg:text-28" fontSize={20} as="h3" fontFamily="libre">
          {title}
        </Typography>
      )}
      {subtitle && <Subtitle className="mb-24" subtitle={subtitle} />}
      {isDesktopSize ? (
        <div className="flex w-full gap-24">{slidesElement}</div>
      ) : (
        <Slider
          dots={false}
          arrows={showArrows}
          slideWidth={isTablet ? 400 : 246}
          spaceBetween={spaceBetweenRef[currentBreakPoint as keyof typeof spaceBetweenRef] ?? 12}
          containerClassName={showArrows ? 'px-48' : ''}
          innerArrows
          allowTouchMove={isTouchDevice}
        >
          {slidesElement}
        </Slider>
      )}
    </Wrapper>
  );
};
export default ContentSlider;
