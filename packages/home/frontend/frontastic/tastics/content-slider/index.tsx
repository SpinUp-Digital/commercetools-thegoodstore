import React from 'react';
import ContentSlider, { ContentSliderProps } from 'components/commercetools-ui/organisms/content-slider';

interface Props {
  data: ContentSliderProps;
}

const ContentSliderTastic: React.FC<Props> = ({ data }) => {
  return <ContentSlider {...data} />;
};

export default ContentSliderTastic;
