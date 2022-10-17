import { FC, useRef, useState } from 'react';
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

  const slideTo = (slide: number) => {
    swiperRef.current?.slideTo(slide);
  };

  const handleSlide = (swiper: Swiper) => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <div className={`${inModalVersion ? 'col-span-1' : 'col-span-2'} gap-y-34 md:mb-50`}>
      <Slider
        className={inModalVersion ? 'w-[300px]' : ''}
        onSlideChange={handleSlide}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        arrows={isTabletSize}
        dots={!isTabletSize}
        prevButtonStyles={{ left: isDesktopSize ? -10 : 10 }}
        nextButtonStyles={{ right: isDesktopSize ? -10 : 10 }}
        compactNavigation={inModalVersion}
        slidesPerView={1}
        loop={isDesktopSize}
        loopedSlides={images.length}
        initialSlide={0}
      >
        {images?.map((image, index) => (
          <div className={`${inModalVersion ? 'h-[250px] max-w-[300px]' : 'h-[447px]'} relative`} key={index}>
            <Image src={image} suffix="large" objectFit="contain" />
          </div>
        ))}
      </Slider>

      {!inModalVersion && (
        <div className="mt-12 hidden gap-x-18 md:flex">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`
            ${index == activeSlide % images.length ? 'border-neutral-500' : 'border-neutral-400'}
            relative h-112 w-112 rounded-md border`}
            >
              <Image
                src={image}
                suffix="small"
                className={`rounded-md p-7 hover:cursor-pointer`}
                onClick={() => slideTo(index)}
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
