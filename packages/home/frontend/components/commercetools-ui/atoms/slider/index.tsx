import React, { useState, FC, Children, CSSProperties, useRef, useCallback } from 'react';
import SwiperType, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'; // eslint-disable-line import/no-unresolved
import 'swiper/css'; // eslint-disable-line import/no-unresolved
import 'swiper/css/navigation'; // eslint-disable-line import/no-unresolved
import 'swiper/css/pagination'; // eslint-disable-line import/no-unresolved
import 'swiper/css/scrollbar'; // eslint-disable-line import/no-unresolved
import { NavigationOptions } from 'swiper/types';
import useClassNames from 'helpers/hooks/useClassNames';
import SliderNavigation, { SliderNavigationProps } from './slider-navigation';

export type SliderProps = SliderNavigationProps & {
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  dots?: boolean;
  fitToSlides?: boolean;
  slideWidth?: number;
  withThumbs?: boolean;
} & SwiperProps;

const Slider: FC<SliderProps> = ({
  className,
  slideWidth,
  slidesPerView,
  fitToSlides = false,
  arrows = false,
  innerArrows = false,
  dots = true,
  spaceBetween = 20,
  withThumbs,
  children,
  onSwiper,
  onInit,
  prevButtonStyles = {},
  nextButtonStyles = {},
  compactNavigation,
  ...props
}) => {
  const [init, setInit] = useState(false);

  const handleInit = useCallback(
    (swiper: SwiperType) => {
      setInit(true);
      onInit?.(swiper);
    },
    [onInit],
  );

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const swiperRef = useRef<SwiperType>();

  const validToFit: boolean = !!fitToSlides && !!slideWidth && !!slidesPerView;
  const sliderWidth: CSSProperties['width'] = validToFit
    ? `${spaceBetween * (slidesPerView - 1) + slideWidth * slidesPerView}px`
    : '';

  const containerClassName = useClassNames([
    'slider_container relative',
    {
      'slider__container--fit': validToFit,
      'slider__container--with-thumbs': withThumbs,
    },
  ]);
  const slidesClassName = useClassNames(['slider', className]);

  const slideProps = {
    visibility: init ? 'visible' : 'hidden',
  } as React.CSSProperties;

  const slides = Children.map(children, (child) => (
    <SwiperSlide style={slideWidth ? { width: `${slideWidth}px`, ...slideProps } : { ...slideProps }}>
      {child}
    </SwiperSlide>
  ));

  const handleOnSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    onSwiper?.(swiper);

    if (withThumbs) {
      setThumbsSwiper(swiper);
    }
  };

  const handleOnBeforeInit = (swiper: SwiperType) => {
    (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
    (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
  };

  return (
    <div className={containerClassName}>
      <Swiper
        className={slidesClassName}
        modules={[Navigation, Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        pagination={dots ? { clickable: true, bulletActiveClass: 'slider__bullet--active' } : false}
        slidesPerView={slidesPerView ?? 'auto'}
        spaceBetween={spaceBetween}
        style={{ width: sliderWidth }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={handleOnSwiper}
        onBeforeInit={handleOnBeforeInit}
        observer
        observeParents
        onInit={handleInit}
        {...props}
      >
        {slides}
      </Swiper>
      <SliderNavigation
        compactNavigation={compactNavigation}
        arrows={arrows}
        prevButtonStyles={prevButtonStyles}
        nextButtonStyles={nextButtonStyles}
        navigationPrevRef={navigationPrevRef}
        navigationNextRef={navigationNextRef}
        totalSlides={slides?.length}
        swiperRef={swiperRef?.current}
        innerArrows={innerArrows}
      />
    </div>
  );
};

export default Slider;
