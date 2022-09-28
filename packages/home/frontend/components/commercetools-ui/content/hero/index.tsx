import Button from 'components/commercetools-ui/button';
import Typography from 'components/commercetools-ui/typography';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

export interface HeroProps {
  image: NextFrontasticImage;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaReference?: Reference;
}

const Hero: React.FC<HeroProps> = ({ image, title, subtitle, ctaLabel, ctaReference }) => {
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
          />
        </div>
      )}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-48 text-center">
        <p className="text-14 leading-normal text-white md:text-20">
          <Typography>{subtitle}</Typography>
        </p>
        <h1 className="mt-22 text-24 font-bold leading-normal text-white md:mt-32 md:text-36 lg:text-56">
          <Typography>{title}</Typography>
        </h1>
        <ReferenceLink target={ctaReference}>
          <Button className="mt-22 md:mt-36 md:py-12 md:px-48 lg:mt-32">
            <span className="text-12 md:text-16 lg:text-14">
              <Typography>{ctaLabel}</Typography>
            </span>
          </Button>
        </ReferenceLink>
      </div>
    </div>
  );
};

export default Hero;
