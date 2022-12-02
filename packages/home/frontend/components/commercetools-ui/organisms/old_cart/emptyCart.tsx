import { EmptyState } from 'components/commercetools-ui/organisms/empty-state';
import { useFormat } from 'helpers/hooks/useFormat';
import { Reference } from 'types/reference';
import { NextFrontasticImage } from 'frontastic/lib/image';

interface Props {
  pageTitle?: string;
  image?: NextFrontasticImage;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: Reference;
}

const EmptyCart = ({ image, title, subtitle }: Props) => {
  //i18n messages
  const { formatMessage } = useFormat({ name: 'cart' });

  return (
    <EmptyState
      title={title}
      subtitle={formatMessage({ id: 'cart.empty', defaultMessage: subtitle })}
      categories={[]}
      image={image}
    />
  );
};

export default EmptyCart;
