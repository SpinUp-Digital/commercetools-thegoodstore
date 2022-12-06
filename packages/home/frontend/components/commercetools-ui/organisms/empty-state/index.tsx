import React from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { Link as CategoryLink } from 'components/commercetools-ui/organisms/header/types';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';

type Props = {
  image: NextFrontasticImage;
  title: string;
  subtitle: string;
  categories: CategoryLink[];
};

export const EmptyState: React.FC<Props> = ({ image, title, subtitle, categories }: Props) => {
  return (
    <div className="my-36 overflow-auto bg-neutral-200">
      <Typography as="h6" fontSize={16} align="center">
        {title}
      </Typography>
      <div className="flex w-full justify-center">
        <div className="relative h-92 w-197 px-10 text-center md:mt-55 md:mb-120">
          <Image media={image.media} layout="fill" objectFit="contain" alt={image.title} />
        </div>
      </div>
      <ul className="mt-55 flex flex-col items-center gap-y-20">
        <Typography as="h6" fontSize={16} align="center">
          {subtitle}
        </Typography>
        {categories.map((category) => (
          <li key={category.name}>
            <Link link={category.reference}>
              <Button
                className="w-200 rounded-[4px] border border-primary-black text-16 text-secondary-black"
                variant="ghost"
              >
                {category.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
