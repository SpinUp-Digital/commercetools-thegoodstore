import React, { useState, FC, Children, CSSProperties, useRef } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';
import SwiperType, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'; // eslint-disable-line import/no-unresolved
import 'swiper/css'; // eslint-disable-line import/no-unresolved
import 'swiper/css/navigation'; // eslint-disable-line import/no-unresolved
import 'swiper/css/pagination'; // eslint-disable-line import/no-unresolved
import 'swiper/css/scrollbar'; // eslint-disable-line import/no-unresolved
import { NavigationOptions } from 'swiper/types';
import SliderNavigation from './slider-navigation';

export type SliderProps = {
  className?: string;
  spaceBetween?: number;
  slidesPerView?: number;
  arrows?: boolean;
  dots?: boolean;
  fitToSlides?: boolean;
  slideWidth?: number;
  withThumbs?: boolean;
  prevButtonStyles?: React.CSSProperties;
  nextButtonStyles?: React.CSSProperties;
  compactNavigation?: boolean;
} & SwiperProps;

const Slider: FC<SliderProps> = ({
  className,
  slideWidth,
  slidesPerView,
  fitToSlides = false,
  arrows = false,
  dots = true,
  spaceBetween = 20,
  withThumbs,
  children,
  onSwiper,
  prevButtonStyles = {},
  nextButtonStyles = {},
  compactNavigation,
  ...props
}) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const swiperRef = useRef<SwiperType>();

  const validToFit: boolean = Boolean(fitToSlides) && Boolean(slideWidth) && Boolean(slidesPerView);
  const sliderWidth: CSSProperties['width'] = validToFit
    ? `${spaceBetween * (slidesPerView! - 1) + slideWidth! * slidesPerView!}px`
    : '';

  const containerClassName = useClassNames([
    'slider_container relative',
    {
      'slider__container--fit': validToFit,
      'slider__container--with-thumbs': withThumbs,
    },
  ]);
  const slidesClassName = useClassNames(['slider', className]);

  const slides = Children.map(children, (child) => (
    <SwiperSlide style={slideWidth ? { width: `${slideWidth}px` } : {}}>{child}</SwiperSlide>
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
      />
    </div>
  );
};

export default Slider;
