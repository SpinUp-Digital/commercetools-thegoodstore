import { NextFrontasticImage } from 'frontastic/lib/image';
import { Link } from '../header/types';

export interface CartSlideoutProps {
  emptyStateImage: NextFrontasticImage;
  emptyStateTitle: string;
  emptyStateSubtitle: string;
  emptyStateCategories: Link[];
  handleCategoryClick?: () => void;
}
