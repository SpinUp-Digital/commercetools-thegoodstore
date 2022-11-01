import { FC, useRef, useState } from 'react';
import Swiper from 'swiper';
import Slider from 'components/commercetools-ui/atoms/slider';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop, tablet } from 'helpers/utils/screensizes';
import Image from 'frontastic/lib/image';
import { ProductDetailsProps } from '../products/product-details';
import useClassNames from 'helpers/hooks/useClassNames';

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
    setActiveSlide(swiper.realIndex);
  };

  const imagesContainerClassName = useClassNames([
    'relative',
    inModalVersion ? 'h-[250px] max-w-[300px]' : 'h-[447px]',
  ]);

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
        loop
        loopedSlides={images.length}
      >
        {images?.map((image, index) => (
          <div className={imagesContainerClassName} key={index}>
            <Image src={image} suffix="large" objectFit="contain" />
          </div>
        ))}
      </Slider>

      {!inModalVersion && (
        <div className="mt-16 hidden gap-x-18 md:flex">
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative h-112 w-112 rounded-md border p-7 ${
                index == activeSlide % images.length ? 'border-neutral-500' : 'border-neutral-400'
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  suffix="small"
                  className={`rounded-md p-7 hover:cursor-pointer`}
                  onClick={() => slideTo(index)}
                  objectFit="contain"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
