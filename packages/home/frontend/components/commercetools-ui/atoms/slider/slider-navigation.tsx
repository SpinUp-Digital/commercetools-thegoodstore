import React, { CSSProperties, FC, LegacyRef } from 'react';
import SwiperType from 'swiper';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

export type SliderNavigation = {
  compactNavigation?: boolean;
  arrows?: boolean;
  prevButtonStyles?: CSSProperties;
  nextButtonStyles?: CSSProperties;
  totalSlides?: number;
  swiperRef?: SwiperType;
  navigationPrevRef?: LegacyRef<HTMLDivElement>;
  navigationNextRef?: LegacyRef<HTMLDivElement>;
};

const SliderNavigation: FC<SliderNavigation> = ({
  compactNavigation,
  arrows,
  prevButtonStyles,
  nextButtonStyles,
  totalSlides,
  navigationPrevRef,
  navigationNextRef,
  swiperRef,
}) => {
  const compactNavigationArrowsStyle = {
    className: 'h-20 w-20 hover:cursor-pointer',
    strokeWidth: 1,
    color: '#959595',
  };

  if (compactNavigation)
    return (
      <div className="mt-10 flex justify-center gap-16">
        <ChevronLeftIcon {...compactNavigationArrowsStyle} onClick={() => swiperRef?.slidePrev()} />
        <div className="flex font-body text-14 font-regular leading-loose text-secondary-black">
          <span>{swiperRef?.realIndex + 1}</span>
          <span>/</span>
          <span>{totalSlides}</span>
        </div>
        <ChevronRightIcon {...compactNavigationArrowsStyle} onClick={() => swiperRef?.slideNext()} />
      </div>
    );

  return (
    <div style={{ display: arrows ? 'block' : 'none' }}>
      <div ref={navigationPrevRef} className="slider_arrow slider_arrow_prev" style={prevButtonStyles} />
      <div ref={navigationNextRef} className="slider_arrow slider_arrow_next" style={nextButtonStyles} />
    </div>
  );
};

export default SliderNavigation;
