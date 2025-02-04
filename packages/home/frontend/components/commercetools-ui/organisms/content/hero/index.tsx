import { useMemo } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface HeroProps {
  image: NextFrontasticImage;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaReference?: Reference;
}

const Hero: React.FC<HeroProps> = ({ image, title, subtitle, ctaLabel, ctaReference }) => {
  const cropFocus = useMemo(() => {
    if (image.gravity?.coordinates) {
      const right = Math.ceil((image.gravity?.coordinates.x / (image.media?.width as number)) * 100);
      const top = Math.ceil((image.gravity?.coordinates.y / (image.media?.height as number)) * 100);

      return `right ${right.toString()}% top ${top.toString()}%`;
    }

    if (image.gravity?.mode === 'center') {
      return 'center';
    }

    return '';
  }, [image]);

  return (
    <div className="relative w-full">
      {image && (
        <div className="relative h-[296px] md:h-[532px] lg:h-[668px]">
          <Image
            {...image}
            priority
            loading="eager"
            alt={title}
            layout="fill"
            objectFit="cover"
            className="brightness-75"
            objectPosition={cropFocus}
          />
        </div>
      )}
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 px-48 text-center">
        <Typography align="center" fontSize={14} className="text-white md:text-18">
          {subtitle}
        </Typography>
        <Typography
          as="h1"
          align="center"
          fontSize={26}
          className="mt-22 text-white md:mt-32 md:text-36 lg:text-58"
          fontFamily="libre"
        >
          {title}
        </Typography>
        {ctaLabel && (
          <Link link={ctaReference}>
            <Button className="mt-22 md:mt-36 md:px-48 md:py-12 lg:mt-32">
              <Typography as="span" fontSize={12} className="text-neutral-150 md:text-14 lg:text-16">
                {ctaLabel}
              </Typography>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
