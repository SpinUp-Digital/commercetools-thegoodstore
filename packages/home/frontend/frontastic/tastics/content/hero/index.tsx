import React from 'react';
import Hero from 'components/commercetools-ui/organisms/content/hero';

const HeroTastic = ({ data }) => {
  return (
    <Hero
      image={data.image}
      title={data.title}
      subtitle={data.subtitle}
      ctaLabel={data.ctaLabel}
      ctaReference={data.ctaReference}
    />
  );
};

export default HeroTastic;
