import React, { FC } from 'react';
import Link from 'next/link';
import { Category } from '@Types/product/Category';

export interface Props {
  link: Category;
}

const HeaderButton: FC<Props> = ({ link }) => {
  return (
    <Link href={link.slug ? link.slug : link.path} passHref>
      <div className="mx-20">
        <div className="cursor-pointer py-25">
          <span className="border-secondary-grey py-10 text-16 hover:border-b-2">{link.name}</span>
        </div>
      </div>
    </Link>
  );
};
export default HeaderButton;
