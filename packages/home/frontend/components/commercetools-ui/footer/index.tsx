import React from 'react';
import Accordion from 'components/commercetools-ui/accordion';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { Reference, ReferenceLink } from 'helpers/reference';
import { tablet, mobile } from 'helpers/utils/screensizes';
import Image, { NextFrontasticImage } from 'frontastic/lib/image';
import Column, { Link } from './column';

export interface FooterColumn {
  header?: string;
  links?: Link[];
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
  const [isBiggerThanMobileSize] = useMediaQuery(mobile);

  return (
    <footer aria-labelledby="footer-heading" className="w-full bg-primary-black">
      {isBiggerThanMobileSize ? (
        <div className="w-full md:px-25 md:py-58 lg:px-175 lg:py-90 ">
          <div className="grid md:grid-cols-4 md:gap-80 ">
            {columns?.map((column, index) => (
              <div key={index} className="lg:justify-left">
                <Column
                  header={column.header}
                  links={column.links}
                  className="flex flex-col md:items-center lg:items-start"
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
                iconColor="text-neutral-500"
              >
                <div className="mb-16 flex flex-row text-14 md:ml-24" key={index}>
                  <Column links={column.links} className="px-0" />
                </div>
              </Accordion>
            </li>
          ))}
        </ul>
      )}
      <div className="lg:items-auto flex flex-col-reverse items-center gap-y-32 md:border-t md:border-secondary-grey lg:flex-row lg:flex-row lg:justify-between lg:gap-y-0 lg:px-165 lg:py-40">
        {logo && (
          <div className="mb-32 w-160 self-center lg:mb-0">
            <Image {...logo} alt="logo" />
          </div>
        )}
        <ul className="mt-40 flex flex-row gap-20 self-center lg:mt-0">
          {socialMedia?.map((item, i) => (
            <li key={i} className="w-22">
              <ReferenceLink target={item.reference}>
                <Image {...item.logo} className="mb-20" />
              </ReferenceLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
