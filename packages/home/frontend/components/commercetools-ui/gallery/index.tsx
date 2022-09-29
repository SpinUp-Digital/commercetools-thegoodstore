import { FC, useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import Slider, { SliderProps } from 'components/commercetools-ui/slider';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop, tablet } from 'helpers/utils/screensizes';
import Image from 'frontastic/lib/image';
import { ProductDetailsProps } from '../products/product-details';

interface GalleryProps {
  images: Array<string>;
  inModalVersion?: ProductDetailsProps['inModalVersion'];
}

const Gallery: FC<GalleryProps> = ({ images, inModalVersion }) => {
  const swiperRef = useRef<Swiper>();
  const [activeSlide, setActiveSlide] = useState(0);

  const [isTabletSize] = useMediaQuery(tablet);
  const [isDesktopSize] = useMediaQuery(desktop);
  const [sliderArrowsPosition, setSliderArrowsPosition] = useState<10 | -10>(10);

  const sliderFixedMood: SliderProps = {
    arrows: isTabletSize,
    dots: !isTabletSize,
  };

  const slideTo = (slide: number) => {
    swiperRef.current?.slideTo(slide);
  };

  const handleSlide = (swiper: Swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  useEffect(() => {
    setSliderArrowsPosition(isDesktopSize ? -10 : 10);
  }, [isDesktopSize]);

  return (
    <div className={`${inModalVersion ? 'col-span-1' : 'col-span-2'}  grid gap-y-34 md:mb-50`}>
      <Slider
        onSlideChange={handleSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        {...sliderFixedMood}
        prevButtonStyles={{ left: sliderArrowsPosition }}
        nextButtonStyles={{ right: sliderArrowsPosition }}
        compactNavigation={inModalVersion}
      >
        {images?.map((image, index) => (
          <Image
            key={index}
            src={image}
            className={`${inModalVersion ? 'h-180' : 'h-[447px]'}  w-full object-contain`}
          />
        ))}
      </Slider>

      {!inModalVersion && (
        <div className="hidden gap-x-18 md:flex">
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              className={`${
                index == activeSlide ? 'border-neutral-800' : 'border-neutral-400'
              } h-112 w-112 rounded-md border border-neutral-400 object-contain p-7 hover:cursor-pointer`}
              onClick={() => slideTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
