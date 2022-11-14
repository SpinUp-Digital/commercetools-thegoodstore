import React from 'react';
import { Story, Meta } from '@storybook/react';
import ContentSlider, { ContentSliderProps } from '.';

export default {
  title: 'commercetools Frontend/Organisms/Content Slider',
  component: ContentSlider,
} as Meta;

const Template: Story<ContentSliderProps> = (args) => {
  const slides: ContentSliderProps['slides'] = Array(3).fill({
    image: {
      media: {
        _type: 'Frontastic\\Backstage\\MediaApiBundle\\Domain\\MediaApi\\Media',
        mediaId: 'afbddilfzvvw9hdkwikv',
        resourceType: 'image',
        name: 'AdobeStock 510169269',
        tags: ['__none'],
        file: 'https://res.cloudinary.com/dlwdq84ig/image/upload/v1662622862/afbddilfzvvw9hdkwikv.jpg',
        size: 516362,
        width: 1378,
        height: 1378,
        format: 'jpg',
        created: '2022-09-08T07:41:02+00:00',
        metaData: '_FILTERED_',
      },
    },
    title: 'The Interior Trends of 2022',
    target: null,
    ctaLabel: 'Read more',
    ctaReference: null,
  });

  return (
    <ContentSlider
      title="Get Inspired"
      subtitle="Explore our editors guide of seasonal trends and favorites."
      slides={slides}
    />
  );
};

export const Primary = Template.bind({});
