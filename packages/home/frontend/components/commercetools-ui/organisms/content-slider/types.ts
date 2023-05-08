import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';

export type ContentSliderSlideProps = {
  image: NextFrontasticImage;
  title: string;
  ctaLabel?: string;
  summary?: string;
  ctaReference?: Reference;
};

export type ContentSliderProps = {
  title?: string;
  subtitle?: string;
  slides: ContentSliderSlideProps[];
};
