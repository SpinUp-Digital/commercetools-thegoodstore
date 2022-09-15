import React from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';
import Image from 'frontastic/lib/image';

type Props = {
  pageTitle?: string;
  image?: { media: any } | any;
  title?: string;
  subtitle?: string;
  callToAction?: string;
  callToActionLink?: Reference;
};

export const EmptyState: React.FC<Props> = ({
  pageTitle,
  image,
  title,
  subtitle,
  callToAction,
  callToActionLink,
}: Props) => {
  return (
    <div className="mx-auto max-w-2xl px-2 pt-16 pb-24 sm:px-4 lg:max-w-7xl lg:px-8">
      {pageTitle && (
        <div className="mx-28 mt-4 text-left">
          <h1 className="dark:text-light-100 pb-12 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {pageTitle}
          </h1>
        </div>
      )}

      {image && (
        <div className="grid justify-items-center">
          <div className="mt-20 h-32 w-32">
            <Image
              media={image.media ? image.media : { media: '' }}
              src={!image.media ? image : ''}
              className="h-7 w-auto sm:h-10"
              alt="Empty Wishlist"
            />
          </div>
        </div>
      )}

      {title && (
        <div className="mt-4 text-center">
          <h1 className="dark:text-light-100 text-3xl font-bold text-gray-600">{title}</h1>
        </div>
      )}

      {subtitle && (
        <div className="mt-2 w-auto text-center">
          <h1 className="dark:text-light-100 text-lg text-gray-600">{subtitle}</h1>
        </div>
      )}
      {callToActionLink && (
        <div className="mt-8 mb-24 text-center">
          <ReferenceLink target={callToActionLink}>
            <button className="bg-accent-400 hover:bg-accent-500 w-56 rounded py-3 px-4 font-bold text-white">
              {callToAction}
            </button>
          </ReferenceLink>
        </div>
      )}
    </div>
  );
};
