import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'components/commercetools-ui/atoms/link';
import { useFormat } from 'helpers/hooks/useFormat';
import Image, { FrontasticImage } from 'frontastic/lib/image';

export interface Props {
  logo: FrontasticImage;
}

const Header: React.FC<Props> = ({ logo }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  return (
    <div className="relative border-b border-neutral-400 bg-white px-8 py-18 md:px-16 md:py-24 lg:p-28">
      <Link link="/" className="flex items-center gap-6">
        <ChevronLeftIcon className="h-24 w-24 fill-secondary-black stroke-0" />
        <p className="text-14 text-secondary-black">
          {formatCartMessage({ id: 'continue.shopping', defaultMessage: 'Continue shopping' })}
        </p>
      </Link>

      <div className="absolute left-1/2 top-1/2 hidden h-[36px] w-[208px] -translate-x-1/2 -translate-y-1/2 md:block lg:h-[44px] lg:w-[259px]">
        <Image {...logo} objectFit="contain" layout="fill" />
      </div>
    </div>
  );
};

export default Header;
