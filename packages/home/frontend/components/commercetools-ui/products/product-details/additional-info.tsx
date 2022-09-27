import AccordionBtn from 'components/commercetools-ui/accordion';
import Markdown from 'components/commercetools-ui/content/markdown';
import { useFormat } from 'helpers/hooks/useFormat';
import { FC } from 'react';

type AdditionalInfoProps = {
  productspec: string;
  description: string;
};

const AdditionalInfo: FC<AdditionalInfoProps> = ({ productspec, description }) => {
  const { formatMessage } = useFormat({ name: 'product' });

  return (
    <>
      <style>
        {`
        ul {
          padding: 0 !important;
          list-style: circle;
        }

        li {
          --tw-text-opacity: 1;
          color: rgb(33 33 33 / var(--tw-text-opacity));
          line-height: 150%;
          font-weight: 400;
          font-size: 14px;
          font-family: Inter, sans-serif;
      `}
      </style>

      <AccordionBtn
        className="col-span-2 mt-24 border-y border-neutral-400 md:mt-0"
        closedSectionTitle={formatMessage({ id: 'product.desc', defaultMessage: 'Product Description' })}
        buttonClassName="py-21 font-body text-16 leading-tight text-primary-black"
        panelClassName="pb-20 md:pt-10 md:pb-30 text-primary-black"
      >
        <p
          className="font-body text-14 font-regular leading-loose text-primary-black"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </AccordionBtn>
      <AccordionBtn
        className="col-span-2 mt-24 border-b border-neutral-400 md:mt-0"
        closedSectionTitle={formatMessage({ id: 'details.additional', defaultMessage: 'Additional Details' })}
        buttonClassName="py-21 font-body text-16 leading-tight text-primary-black"
        panelClassName="pb-20 md:pt-10 md:pb-30 text-primary-black"
      >
        <Markdown className="font-body text-14 font-regular leading-loose text-primary-black" text={productspec} />
      </AccordionBtn>
    </>
  );
};

export default AdditionalInfo;
