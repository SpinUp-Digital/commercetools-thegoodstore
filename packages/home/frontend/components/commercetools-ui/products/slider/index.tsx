import React from 'react';
import { Product } from '@Types/product/Product';
import Link from 'components/commercetools-ui/content/link';
import Wrapper from 'components/commercetools-ui/content/wrapper';
import Slider from 'components/commercetools-ui/slider';
import Subtitle from 'components/commercetools-ui/subtitle';
import Title from 'components/commercetools-ui/title';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { Reference } from 'types/reference';
import { desktop, tablet } from 'helpers/utils/screensizes';
import Tile from './tile';

export interface Props {
  products: Product[];
  title: string;
  subline?: string;
  ctaLabel: string;
  ctaLink: Reference;
}

export default function ProductSlider({ products, title, subline, ctaLabel, ctaLink }: Props) {
  const [isDesktopSize] = useMediaQuery(desktop);

  return (
    <Wrapper background="neutral-200" phonePadding="left-padding-only">
      <div className="text-start">
        <Title title={title} />
        {(subline || ctaLink) && (
          <div className="mt-8 flex items-center justify-between md:mt-16 lg:mt-14">
            {subline && <Subtitle subtitle={subline} />}
            {ctaLink && (
              <div className="hidden lg:block">
                <Link target={ctaLink} withArrow>
                  <span className="font-medium leading-[24px] text-secondary-black">{ctaLabel}</span>
                </Link>
              </div>
            )}
          </div>
        )}
        {ctaLink && (
          <div className="mt-20 block md:mt-16 lg:hidden">
            <Link target={ctaLink} withArrow>
              <span className="font-medium leading-[24px] text-secondary-black">{ctaLabel}</span>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-20 md:mt-24 lg:mt-20">
        <div className="relative mt-6 w-full">
          <Slider
            slidesPerView={2.3}
            slidesPerGroup={1}
            cssMode
            dots={false}
            arrows={isDesktopSize}
            nextButtonStyles={{ transform: 'translateY(-160%) rotateZ(-45deg)' }}
            prevButtonStyles={{ transform: 'translateY(-160%) rotateZ(135deg)' }}
            spaceBetween={8}
            breakpoints={{
              [tablet]: {
                spaceBetween: 25,
              },
              [desktop]: {
                cssMode: false,
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 25,
              },
            }}
          >
            {products.slice(0, 15).map((product) => (
              <Tile product={product} key={product.productId} />
            ))}
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
}
