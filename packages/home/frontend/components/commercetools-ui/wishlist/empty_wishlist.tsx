import { EmptyState } from 'components/commercetools-ui/empty-state';
import { Reference } from 'types/reference';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  pageTitle?: string;
  image?: { media: any } | any;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaLink?: Reference;
}

const EmptyWishlist = ({ pageTitle, image, title, subtitle, ctaLabel, ctaLink }: Props) => {
  //i18n messages
  const { formatMessage } = useFormat({ name: 'wishlist' });

  return (
    <EmptyState
      pageTitle={formatMessage({ id: 'wishlist', defaultMessage: pageTitle })}
      title={formatMessage({ id: 'wishlist.oops', defaultMessage: title })}
      subtitle={formatMessage({ id: 'wishlist.empty', defaultMessage: subtitle })}
      callToAction={formatMessage({ id: 'wishlist.add.items', defaultMessage: ctaLabel })}
      callToActionLink={ctaLink}
      image={image}
    />
  );
};

export default EmptyWishlist;
