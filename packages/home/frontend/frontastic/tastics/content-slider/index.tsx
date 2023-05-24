import React from 'react';
import ContentSlider from 'components/commercetools-ui/organisms/content-slider';
import { ContentSliderProps } from 'components/commercetools-ui/organisms/content-slider/types';

interface Props {
  data: ContentSliderProps;
}

const ContentSliderTastic: React.FC<Props> = ({ data }) => {
  return <ContentSlider {...data} />;
};

export default ContentSliderTastic;
