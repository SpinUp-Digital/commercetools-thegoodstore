import React from 'react';
import CategorySlider, { Props as CategorySliderProps } from 'components/commercetools-ui/organisms/category-slider';

export interface Props {
  data: CategorySliderProps;
}

const CategorySliderTastic: React.FC<Props> = ({ data }) => {
  return <CategorySlider {...data} />;
};

export default CategorySliderTastic;
