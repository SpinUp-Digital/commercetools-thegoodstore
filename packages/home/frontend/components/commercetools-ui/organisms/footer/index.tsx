import React from 'react';
import Accordion from 'components/commercetools-ui/atoms/accordion';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import * as screensizes from 'helpers/utils/screensizes';
import { Reference } from 'types/reference';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Link from '../../atoms/link';
import Column, { Link as FooterLink } from './column';

export interface FooterColumn {
  header?: string;
  links?: FooterLink[];
}
export interface Props {
  columns: FooterColumn[];
  logo?: NextFrontasticImage;
  socialMedia?: SocialMedia[];
}

export interface SocialMedia {
  logo: NextFrontasticImage;
  reference: Reference;
}

const Footer: React.FC<Props> = ({ columns, logo, socialMedia }) => {
  const [isBiggerThanTabletSize] = useMediaQuery(screensizes.tablet);

  return (
    <footer aria-labelledby="footer-heading" className="w-full bg-primary-black">
      {isBiggerThanTabletSize ? (
        <div className="mx-auto w-full max-w-[1248px] px-72 py-58 xl:px-0">
          <div className="grid grid-cols-4 ">
            {columns?.map((column, index) => (
              <div key={index}>
                <Column
                  header={column.header}
                  links={column.links}
                  className="flex flex-col items-center lg:items-start"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ul className="flex flex-col">
          {columns?.map((column, index) => (
            <li key={index} className="border-b border-neutral-300">
              <Accordion
                closedSectionTitle={column.header}
                openSectionTitle={column.header}
                iconColor="text-neutral-100"
              >
                <div className="mb-16 flex flex-row text-14 md:ml-24" key={index}>
                  <Column links={column.links} className="px-0" />
                </div>
              </Accordion>
            </li>
          ))}
        </ul>
      )}
      <div className="w-full sm:border-t sm:border-secondary-grey"></div>
      <div className="mx-auto flex max-w-[1248px] flex-col-reverse items-center gap-y-32 px-72 lg:flex-row lg:justify-between lg:gap-y-0 lg:py-40 xl:px-0">
        {logo && (
          <div className="mb-32 w-160 self-center lg:mb-0">
            <Image {...logo} alt="logo" />
          </div>
        )}
        <ul className="mt-40 flex flex-row gap-20 self-center lg:mt-0">
          {socialMedia?.map((item, i) => (
            <li key={i} className="w-22">
              <Link link={item.reference}>
                <Image {...item.logo} className="mb-20" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
