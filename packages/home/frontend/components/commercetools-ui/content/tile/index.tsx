import Typography from 'components/commercetools-ui/typography';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Button from 'components/commercetools-ui/button';
import useClassNames from 'helpers/hooks/useClassNames';

export interface TileProps {
  image?: NextFrontasticImage;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaReference?: Reference;
  roundedBorders?: boolean;
}

const Tile: React.FC<TileProps> = ({ image, title, subtitle, ctaLabel, ctaReference, roundedBorders = true }) => {
  const { resolveClassNames } = useClassNames();

  return (
    <div className="relative w-full">
      {image && (
        <Image
          {...image}
          alt={title}
          className={`brightness-75 ${resolveClassNames([roundedBorders && 'lg:rounded-md'])}`}
        />
      )}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-center">
        <p className="text-shadow text-14 leading-loose text-white md:text-16 lg:font-medium">
          <Typography>{subtitle}</Typography>
        </p>
        <h2 className="text-shadow mt-24 text-22 leading-normal text-white lg:text-28 lg:font-bold">
          <Typography>{title}</Typography>
        </h2>
        <ReferenceLink target={ctaReference}>
          <Button className="mt-18 md:mt-24">
            <span className="text-12">
              <Typography>{ctaLabel}</Typography>
            </span>
          </Button>
        </ReferenceLink>
      </div>
    </div>
  );
};

export default Tile;
