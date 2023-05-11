import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Login, { LoginProps } from 'components/commercetools-ui/organisms/authentication/login';
import Redirect from 'helpers/redirect';
import { useAccount } from 'frontastic/hooks';

export interface Props {
  data: LoginProps;
}

const AccountLoginTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  const router = useRouter();

  //redirection link after user is logged in
  const redirectLink = useMemo(() => {
    const lastVisitedPage = router.query.lvp ? `/${router.query.lvp}` : data.accountLink;
    return lastVisitedPage;
  }, [data.accountLink, router]);

  const { loggedIn } = useAccount();

  if (loggedIn) return <Redirect target={redirectLink} />;

  return (
    <div className="mb-36 md:mb-56 lg:mb-84">
      <Login {...data} />
    </div>
  );
};

export default AccountLoginTastic;
