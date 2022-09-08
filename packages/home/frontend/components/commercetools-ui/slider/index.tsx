import React, { useState, FC, Children, CSSProperties, useRef } from 'react';
import classnames from 'classnames';
import { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'; // eslint-disable-line import/no-unresolved
import 'swiper/css'; // eslint-disable-line import/no-unresolved
import 'swiper/css/navigation'; // eslint-disable-line import/no-unresolved
import 'swiper/css/pagination'; // eslint-disable-line import/no-unresolved
import 'swiper/css/scrollbar'; // eslint-disable-line import/no-unresolved
import { NavigationOptions } from 'swiper/types';

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
  prevButtonStyles = {},
  nextButtonStyles = {},
  ...props
}) => {
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef<HTMLDivElement>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      style={{ width: sliderWidth }}
      onBeforeInit={(swiper) => {
        (swiper.params.navigation as NavigationOptions).prevEl = navigationPrevRef.current;
        (swiper.params.navigation as NavigationOptions).nextEl = navigationNextRef.current;
      }}
      {...props}
    >
      {slides}
    </Swiper>
  );

  return (
    <div className={containerClassName}>
      {withThumbs ? (
        <>
          <div className="slider__thumbs">
            <Swiper
              className={thumbsClassName}
              modules={[Navigation, Thumbs]}
              navigation
              spaceBetween={15}
              slidesPerView={5}
              direction={'vertical'}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
            >
              {thumbs}
            </Swiper>
          </div>
          <div className="slider__slides">{mainSlider}</div>
        </>
      ) : (
        mainSlider
      )}
      <div style={{ display: arrows ? 'block' : 'none' }}>
        <div ref={navigationPrevRef} className="slider_arrow slider_arrow_prev" style={prevButtonStyles} />
        <div ref={navigationNextRef} className="slider_arrow slider_arrow_next" style={nextButtonStyles} />
      </div>
    </div>
  );
};

export default Slider;
