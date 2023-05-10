import { FC, useMemo } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useTouchDevice from 'helpers/hooks/useTouchDevice';
import { mediumDesktop, tablet } from 'helpers/utils/screensizes';
import Wrapper from '../../../HOC/wrapper';
import Slider from '../../atoms/slider';
import Subtitle from '../../atoms/subtitle';
import ContentSliderSlide from './slide';
import { ContentSliderProps } from './types';

const ContentSlider: FC<ContentSliderProps> = ({ title, subtitle, slides }) => {
  const [isDesktopSize] = useMediaQuery(mediumDesktop);
  const [isTablet] = useMediaQuery(tablet);

  const { isTouchDevice } = useTouchDevice();

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
        <div className="relative w-full">
          <Slider
            dots={false}
            solidArrows
            arrows={!isTouchDevice}
            slideWidth={isTablet ? 400 : 246}
            allowTouchMove={isTouchDevice}
            nextButtonStyles={{ transform: 'translateY(-150%)', right: '10px' }}
            prevButtonStyles={{ transform: 'translateY(-150%)', left: '10px' }}
          >
            {slidesElement}
          </Slider>
        </div>
      )}
    </Wrapper>
  );
};
export default ContentSlider;

export * from './types';
