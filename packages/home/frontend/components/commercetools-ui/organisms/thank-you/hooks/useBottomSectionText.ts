import { useMemo } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';

type SectionText = { title: string; subtitle: string; cta: string };
type BottomSectionDataType = { [key in 'user' | 'guest']: SectionText };

const useBottomSectionText = (loggedIn: boolean) => {
  const { formatMessage } = useFormat({ name: 'thank-you' });

  const bottomSectionOptions: BottomSectionDataType = useMemo(() => {
    return {
      user: {
        title: formatMessage({ id: 'user.title', defaultMessage: 'My orders' }),
        subtitle: formatMessage({ id: 'user.subtitle', defaultMessage: 'Manage, review or track your order.' }),
        cta: formatMessage({ id: 'user.cta', defaultMessage: 'Review order status' }),
      },
      guest: {
        title: formatMessage({ id: 'guest.title', defaultMessage: 'Save your details' }),
        subtitle: formatMessage({
          id: 'guest.title',
          defaultMessage: 'Enjoy faster checkout, order history and personal offers.',
        }),
        cta: formatMessage({ id: 'guest.title', defaultMessage: 'Create account' }),
      },
    };
  }, [formatMessage]);

  const bottomSectionText = useMemo(() => {
    return loggedIn ? bottomSectionOptions['user'] : bottomSectionOptions['guest'];
  }, [bottomSectionOptions, loggedIn]);

  return { bottomSectionText };
};
export default useBottomSectionText;
