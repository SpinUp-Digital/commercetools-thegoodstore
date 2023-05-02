import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

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
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 text-center">
        <Typography
          className="text-shadow text-white md:text-16 lg:font-medium"
          fontSize={14}
          lineHeight="loose"
          align="center"
        >
          {subtitle}
        </Typography>
        <Typography
          as="h2"
          className="text-shadow mt-18  text-white lg:text-28"
          fontSize={26}
          align="center"
          medium
          fontFamily="libre"
        >
          {title}
        </Typography>
        {ctaLabel && (
          <Link link={ctaReference}>
            <Button className="mt-24">
              <Typography as="span" fontSize={12}>
                {ctaLabel}
              </Typography>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Tile;
