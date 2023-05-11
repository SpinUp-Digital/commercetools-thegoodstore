import React from 'react';
import { useRouter } from 'next/router';
import ResetPassword, { ResetPasswordProps } from 'components/commercetools-ui/organisms/authentication/reset-password';

export interface Props {
  data: ResetPasswordProps;
}

const ResetPasswordTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  //next/router
  const router = useRouter();

  //reset password token
  const { token } = router.query;

  return <ResetPassword token={token} {...data} />;
};

export default ResetPasswordTastic;
