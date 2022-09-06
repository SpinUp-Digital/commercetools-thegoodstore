import Typography from 'components/commercetools-ui/typography';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image from 'frontastic/lib/image';

export interface TileProps {
  image: { media: any } | any;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaReference?: Reference;
}

const Tile: React.FC<TileProps> = ({ image, title, subtitle, ctaLabel, ctaReference }) => {
  return (
    <div className="relative w-full">
      {image.media && <Image {...image} alt={title} className="brightness-75" />}
      <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-sm text-white lg:text-xl">
          <Typography>{subtitle}</Typography>
        </h1>
        <h2 className="mt-2 text-2xl text-white md:text-4xl lg:mt-5 lg:text-6xl">
          <Typography>{title}</Typography>
        </h2>
        <ReferenceLink target={ctaReference}>
          <button className="mt-6 rounded bg-white px-9 py-3 text-xs font-medium duration-150 ease-out hover:bg-slate-100 md:px-12 md:text-base lg:mt-10">
            {ctaLabel}
          </button>
        </ReferenceLink>
      </div>
    </div>
  );
};

export default Tile;
