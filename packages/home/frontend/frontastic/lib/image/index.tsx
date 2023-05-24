import NextImage from 'next/image';
import { frontasticCloudinaryLoader } from './loaders';
import { NextFrontasticImage } from './types';

export default function Image({
  width,
  height: baseHeight,
  ratio,
  media,
  gravity,
  suffix,
  loading = 'lazy',
  layout = 'responsive',
  alt = media?.name ?? '',
  src = '',
  ...props
}: NextFrontasticImage) {
  if (suffix) {
    if (typeof src === 'string' || src instanceof String) {
      const dotIndex = src.lastIndexOf('.');

      src = src.substring(0, dotIndex) + '-' + suffix + src.substring(dotIndex, src.length);
    }
  }

  if (!media?.mediaId)
    return (
      <NextImage
        {...props}
        unoptimized
        src={src}
        layout={!width || isNaN(+width) || !baseHeight || isNaN(+baseHeight) ? 'fill' : layout}
        alt={alt}
        loading={loading}
        width={width}
        height={baseHeight}
      />
    );

  //paremeters to inject in the source to be used in loader
  const paremeters = {
    ratio,
    gravity: gravity?.mode,
    x__coord: gravity?.coordinates?.x,
    y__coord: gravity?.coordinates?.y,
  };

  //query string construction
  const paremeterizedSrc = `${media.mediaId}?${Object.entries(paremeters)
    .map(([key, value]) => (value ? `${key}=${value}` : ''))
    .filter((val) => !!val) //remove empty strings returned from falsy values
    .join('&')}`;

  //width getter
  const getImageWidth = () => {
    //return the original width
    return +(width ?? media.width ?? 0);
  };

  //height getter
  const getImageHeight = () => {
    //if ratio is not supplied return the original height
    if (!ratio) return +(baseHeight ?? media.height ?? 0);
    //Use the crop ratio to calculate the height
    const [nominator, denominator] = ratio.split(':') as [string, string];
    return getImageWidth() * (+denominator / +nominator);
  };

  return (
    <NextImage
      {...props}
      {...(layout !== 'fill'
        ? {
            width: getImageWidth(),
            height: getImageHeight(),
          }
        : {})}
      loader={frontasticCloudinaryLoader}
      src={paremeterizedSrc}
      layout={layout}
      alt={alt}
      loading={loading}
    />
  );
}

export * from './types';
export * from './loaders';
