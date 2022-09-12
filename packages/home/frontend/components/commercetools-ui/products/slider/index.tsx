import React from 'react';
import { Product } from '@Types/product/Product';
import Slider, { SliderProps } from 'components/commercetools-ui/slider';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { ReferenceLink, Reference } from 'helpers/reference';
import { mobile, tablet, desktop } from 'helpers/utils/screensizes';
import Tile from './tile';

export interface Props {
  products: Product[];
  title: string;
  subline?: string;
  ctaLabel: string;
  ctaLink: Reference;
}

export default function ProductSlider({ products, title, subline, ctaLabel, ctaLink }: Props) {
  const [isMobileSize] = useMediaQuery(mobile);
  const [isTabletSize] = useMediaQuery(tablet);
  const [isDesktopSize] = useMediaQuery(desktop);

  const sliderFixedMood: SliderProps = {
    slidesPerView: isTabletSize ? 4 : 2.3,
    arrows: isDesktopSize ? true : false,
    dots: false,
    spaceBetween: isMobileSize ? 25 : 8,
    slidesPerGroup: isTabletSize ? 4 : 2,
  };

  const sliderConfiguration: SliderProps = sliderFixedMood;

  return (
    <>
      <div>
        <div className="bg-neutral-300 py-4 px-3 sm:px-5 lg:px-24">
          <div className="text-start">
            <h3 className="text-base font-bold text-gray-900 sm:text-2xl md:text-3xl">{title}</h3>
            <div className="flex items-center justify-between">
              <h4 className="mt-3 text-xs font-light text-gray-900 sm:text-base">{subline}</h4>
              {ctaLabel && ctaLink && (
                <div className="flex items-center justify-end px-4 sm:px-6 lg:px-0">
                  <ReferenceLink
                    target={ctaLink}
                    className="hidden text-base text-gray-700 underline underline-offset-2 lg:block"
                  >
                    {ctaLabel}
                  </ReferenceLink>
                </div>
              )}
            </div>
            {ctaLabel && ctaLink && (
              <div className="mt-8 lg:hidden">
                <ReferenceLink target={ctaLink} className="flex items-center gap-3 text-sm font-bold">
                  <span className="block text-dark-300">{ctaLabel}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </ReferenceLink>
              </div>
            )}
          </div>
          <div className="relative mt-6">
            <div className="relative w-full">
              <Slider
                {...sliderConfiguration}
                nextButtonStyles={{ transform: 'translateY(-160%) rotateZ(-45deg)' }}
                prevButtonStyles={{ transform: 'translateY(-160%) rotateZ(135deg)' }}
              >
                {products.slice(0, 15).map((product, index: number) => (
                  <Tile {...product} key={index} />
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
