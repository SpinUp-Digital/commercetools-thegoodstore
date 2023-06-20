import React from 'react';
import Image from '../index';
import Typography from 'components/commercetools-ui/atoms/typography';

const ImageContent = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
        Images
      </Typography>
      <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
        The image component uses NextJS images; there are images that come from the studio using the media prop and
        images that you can add a link to it in the src prop; the component supports jpg, png and webp images.
      </Typography>

      <div className="relative mt-24 w-[40%] px-10">
        <div className="flex h-[400px] justify-center">
          <Image
            layout="fill"
            objectFit="contain"
            alt="Studio"
            media={{
              mediaId: 'afbddilfzvvw9hdkwikv',
              resourceType: 'image',
              name: 'AdobeStock 510169269',
              tags: ['__none'],
              file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662622862/afbddilfzvvw9hdkwikv.jpg',
              size: 516362,
              width: 1378,
              height: 1378,
              format: 'jpg',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContent;
