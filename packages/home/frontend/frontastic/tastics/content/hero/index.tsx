import React from 'react';
import Hero, { HeroProps } from 'components/commercetools-ui/organisms/content/hero';

interface Props {
  data: HeroProps;
}

const HeroTastic = ({ data }: Props) => {
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
