import Button from 'components/commercetools-ui/button';
import useClassNames from 'helpers/hooks/useClassNames';
import { Reference } from 'types/reference';
import Link from 'components/commercetools-ui/link';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Typography from 'components/commercetools-ui/typography';

export interface TileProps {
  image?: NextFrontasticImage;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaReference?: Reference;
  roundedBorders?: boolean;
  className?: string;
}

const Tile: React.FC<TileProps> = ({
  image,
  title,
  subtitle,
  ctaLabel,
  ctaReference,
  roundedBorders = true,
  className = '',
}) => {
  const imageClassName = useClassNames([roundedBorders && 'lg:rounded-md']);

  return (
    <div className={`relative w-full ${className}`}>
      {image && <Image {...image} alt={title} objectFit="cover" className={`brightness-75 ${imageClassName}`} />}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-center">
        <Typography
          className="text-shadow text-white md:text-16 lg:font-medium"
          as="p"
          fontSize={14}
          lineHeight="loose"
          align="center"
        >
          {subtitle}
        </Typography>
        <Typography
          as="h2"
          className="text-shadow mt-18  text-white lg:text-28"
          fontSize={24}
          align="center"
          fontWeight="bold"
          fontFamily="libre"
        >
          {title}
        </Typography>
        <Link link={ctaReference}>
          <Button className="mt-24">
            <Typography as="span" fontSize={12}>
              {ctaLabel}
            </Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Tile;
