import React from 'react';
import { Product } from '@commercetools/domain-types/product/Product';
import Slider from 'components/commercetools-ui/atoms/slider';
import Subtitle, { SubtitleProps } from 'components/commercetools-ui/atoms/subtitle';
import Title, { TitleProps } from 'components/commercetools-ui/atoms/title';
import Link from 'components/commercetools-ui/organisms/content/link';
import Wrapper from 'components/commercetools-ui/organisms/content/wrapper';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { desktop, tablet } from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Tile from './tile';
import useTouchDevice from 'helpers/hooks/useTouchDevice';

export interface Props {
  products: Product[];
  title: string;
  subline?: string;
  titleVariant?: TitleProps['variant'];
  subtitleVariant?: SubtitleProps['variant'];
  ctaLabel: string;
  ctaLink: Reference;
}

export default function ProductSlider({
  products,
  title,
  subline,
  ctaLabel,
  ctaLink,
  titleVariant = 'lg',
  subtitleVariant = 'lg',
}: Props) {
  const [isDesktopSize] = useMediaQuery(desktop);

  const { isTouchDevice } = useTouchDevice();

  return (
    <Wrapper background="neutral-200" variant="left-padding-only">
      <div>
        <Title title={title} variant={titleVariant} />
        {(subline || ctaLink) && (
          <div className="mt-8 flex items-center justify-between md:mt-16 lg:mt-14">
            {subline && <Subtitle subtitle={subline} variant={subtitleVariant} />}
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
            arrows={!isTouchDevice}
            innerArrows={!isDesktopSize}
            nextButtonStyles={{ transform: 'translateY(-250%) rotateZ(-45deg)' }}
            prevButtonStyles={{ transform: 'translateY(-250%) rotateZ(135deg)' }}
            allowTouchMove={isTouchDevice}
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
            {products.map((product) => (
              <Tile product={product} key={product.productId} />
            ))}
          </Slider>
        </div>
      </div>
    </Wrapper>
  );
}
