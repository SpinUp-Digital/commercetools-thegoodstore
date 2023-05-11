import React from 'react';
import Register, { RegisterProps } from 'components/commercetools-ui/organisms/authentication/register';

export interface Props {
  data: RegisterProps;
}

const AccountRegisterTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  return <Register {...data} />;
};

export default AccountRegisterTastic;
