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
        <>
          <div className="relative block md:hidden">
            <Image {...image} alt={title} className="brightness-75" />
          </div>
          <div className="hidden h-[668px] md:block">
            <Image {...image} alt={title} layout="fill" objectFit="cover" className="brightness-75" />
          </div>
        </>
      )}
      <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-sm lg:text-xl text-white">
          <Typography>{subtitle}</Typography>
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-6xl mt-2 text-white lg:mt-5">
          <Typography>{title}</Typography>
        </h2>
        <ReferenceLink target={ctaReference}>
          <button className="text-xs md:text-base mt-6 rounded bg-white px-9 py-3 font-medium duration-150 ease-out hover:bg-slate-100 md:px-12 lg:mt-10">
            {ctaLabel}
          </button>
        </ReferenceLink>
      </div>
    </div>
  );
};

export default Hero;
