import React from 'react';
import { Story, Meta } from '@storybook/react';
import Typography from 'components/commercetools-ui/atoms/typography';
import ContentSlider, { ContentSliderProps } from '.';

export default {
  title: 'Components/Content Slider',
  component: ContentSlider,
} as Meta;

const Template: Story<ContentSliderProps> = () => {
  const slides: ContentSliderProps['slides'] = Array(3).fill({
    image: {
      media: {
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
      },
    },
    title: 'The Interior Trends of 2022',
    target: null,
    ctaLabel: 'Read more',
    ctaReference: null,
  });

  return (
    <div className="ml-44">
      <Typography fontSize={28} fontFamily="libre" medium className="mt-40 w-[40%] text-primary-black">
        Content Slider
      </Typography>
      <Typography fontSize={18} fontFamily="inter" className="mt-20 w-[60%] leading-6 text-secondary-black">
        Account Dropdown subtitle explaining text, usage and many other things that can help the client understand the
        usage and look at something cool we have made, here you will see the components and it&apos;s variants in order
        to show how much is the client capable to customize
      </Typography>
      <div className="mt-40">
        <ContentSlider
          title="Get Inspired"
          subtitle="Explore our editors guide of seasonal trends and favorites."
          slides={slides}
        />
      </div>
    </div>
  );
};

export const Default = Template.bind({});
