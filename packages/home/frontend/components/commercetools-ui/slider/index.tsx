import React, { useState, FC, Children, CSSProperties, useRef } from 'react';
import classnames from 'classnames';
import SwiperType, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'; // eslint-disable-line import/no-unresolved
import 'swiper/css'; // eslint-disable-line import/no-unresolved
import 'swiper/css/navigation'; // eslint-disable-line import/no-unresolved
import 'swiper/css/pagination'; // eslint-disable-line import/no-unresolved
import 'swiper/css/scrollbar'; // eslint-disable-line import/no-unresolved
import { NavigationOptions } from 'swiper/types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

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

  const handleOnSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;
    onSwiper?.(swiper);

    if (withThumbs) {
      setThumbsSwiper(swiper);
    }
  };

  const validToFit: boolean = Boolean(fitToSlides) && Boolean(slideWidth) && Boolean(slidesPerView);
  const sliderWidth: CSSProperties['width'] = validToFit
    ? `${spaceBetween * (slidesPerView! - 1) + slideWidth! * slidesPerView!}px`
    : '';

  const slides = Children.map(children, (child) => (
    <SwiperSlide style={slideWidth ? { width: `${slideWidth}px` } : {}}>{child}</SwiperSlide>
  ));
  const thumbs = Children.map(children, (child) => (
    <SwiperSlide className="slider__thumb" style={{ height: '80px', overflow: 'hidden' }}>
      {child}
    </SwiperSlide>
  ));

  const containerClassName = classnames('slider__container', {
    'slider__container--fit': validToFit,
    'slider__container--with-thumbs': withThumbs,
  });
  const slidesClassName = classnames('slider', className);
  const thumbsClassName = classnames('slider__thumbs');

  const mainSlider = (
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
      onBeforeInit={(swiper) => {
        (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
        (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
      }}
      observer
      observeParents
      cssMode
      {...props}
    >
      {slides}
    </Swiper>
  );

  const compactNavigationArrowsStyle = {
    className: 'h-20 w-20 hover:cursor-pointer',
    strokeWidth: 1,
    color: '#959595',
  };

  return (
    <div className={containerClassName}>
      {withThumbs ? (
        <>
          <div className="slider__thumbs">
            <Swiper
              className={thumbsClassName}
              modules={[Navigation, Thumbs]}
              spaceBetween={15}
              slidesPerView={5}
              direction={'vertical'}
              watchSlidesProgress
              onSwiper={handleOnSwiper}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={(swiper) => {
                (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
                (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
              }}
              observer
              observeParents
              cssMode
              {...props}
            >
              {thumbs}
            </Swiper>
          </div>
          <div className="slider__slides">{mainSlider}</div>
        </>
      ) : (
        mainSlider
      )}

      {compactNavigation ? (
        <div className="mt-10 flex justify-center gap-16">
          <ChevronLeftIcon {...compactNavigationArrowsStyle} onClick={() => swiperRef.current?.slidePrev()} />
          <div className="flex font-body text-14 font-regular leading-loose text-secondary-black">
            <span>{swiperRef.current?.activeIndex + 1}</span>
            <span>/</span>
            <span>{slides?.length}</span>
          </div>
          <ChevronRightIcon {...compactNavigationArrowsStyle} onClick={() => swiperRef.current?.slideNext()} />
        </div>
      ) : (
        <div style={{ display: arrows ? 'block' : 'none' }}>
          <div ref={navigationPrevRef} className="slider_arrow slider_arrow_prev" style={prevButtonStyles} />
          <div ref={navigationNextRef} className="slider_arrow slider_arrow_next" style={nextButtonStyles} />
        </div>
      )}
    </div>
  );
};

export default Slider;
