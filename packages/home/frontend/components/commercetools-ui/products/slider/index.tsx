import React from 'react';
import { Product } from '@Types/product/Product';
import Slider, { SliderProps } from 'components/commercetools-ui/slider';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { ReferenceLink, Reference } from 'helpers/reference';
import { mobile, tablet, desktop } from 'helpers/utils/screensizes';
import Tile from './tile';
import Section from 'components/commercetools-ui/content/section';

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
    arrows: isDesktopSize,
    dots: false,
    spaceBetween: isMobileSize ? 25 : 8,
    slidesPerGroup: isTabletSize ? 4 : 2,
  };

  const sliderConfiguration: SliderProps = sliderFixedMood;

  return (
    <div className="bg-neutral-200 px-8 py-24 md:px-24 md:pb-52 lg:px-96 lg:pt-32">
      <Section title={title} subtitle={subline} ctaTarget={ctaLink} ctaText={ctaLabel}>
        <div className="relative mt-6 w-full">
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
      </Section>
    </div>
  );
}
