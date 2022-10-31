import React from 'react';
import Footer from 'components/commercetools-ui/organisms/footer';

const FooterTastic = ({ data }) => {
  const columns = [
    {
      header: data.headerCol1,
      links: data.linksCol1,
    },
    {
      header: data.headerCol2,
      links: data.linksCol2,
    },
    {
      header: data.headerCol3,
      links: data.linksCol3,
    },
    {
      header: data.headerCol4,
      links: data.linksCol4,
    },
  ];

  return (
    <div className="fixed-screen-width lg:relative-width">
      <Footer columns={columns} logo={data.logo} socialMedia={data.socialMedia} />
    </div>
  );
};

export default FooterTastic;
