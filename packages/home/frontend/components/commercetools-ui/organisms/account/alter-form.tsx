import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';

type AlterFormProps = {
  page: 'login' | 'register';
};
type PageBasedData = { [key in AlterFormProps['page']]: { title: string; buttonLabel: string; link: string } };

const AlterForm: FC<AlterFormProps> = ({ page }) => {
  const router = useRouter();
  const { formatMessage } = useFormat({ name: 'account' });

  const pageBasedData: PageBasedData = useMemo(() => {
    return {
      login: {
        title: formatMessage({ id: 'welcome.back', defaultMessage: 'Welcome back' }),
        buttonLabel: formatMessage({ id: 'sign.in', defaultMessage: 'Sign in' }),
        link: '/login',
      },
      register: {
        title: formatMessage({ id: 'not.member.yet', defaultMessage: 'Not a member yet?' }),
        buttonLabel: formatMessage({ id: 'account.register', defaultMessage: 'Register' }),
        link: '/register',
      },
    };
  }, [formatMessage]);

  const title = useMemo(() => pageBasedData[page].title, [page, pageBasedData]);
  const buttonLabel = useMemo(() => pageBasedData[page].buttonLabel, [page, pageBasedData]);

  const handleClick = () => {
    router.push(pageBasedData[page].link);
  };

  return (
    <div className="my-36 border-t border-t-neutral-400 pt-84 md:my-56 lg:my-84">
      <div className="m-auto grid max-w-[480px] px-16">
        <Typography fontFamily="libre" fontSize={16} className="text-primary-black md:text-20 lg:text-24" as="h3">
          {title}
        </Typography>
        <Button
          className="mt-16 h-32 border border-secondary-black py-0 font-medium hover:border-[1.5px] md:mt-24 md:h-40 md:text-16"
          variant="secondary"
          onClick={handleClick}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default AlterForm;
