import React, { useEffect } from 'react';
import AccountDetails, { AccountDetailsProps } from 'components/commercetools-ui/organisms/account';
import useUpdateCartAddresses from 'helpers/hooks/useUpdateCartAddresses';

export interface Props {
  data: AccountDetailsProps;
}

const AccountDetailsTastic: React.FC<React.PropsWithChildren<Props>> = ({ data }) => {
  const updateCartAddresses = useUpdateCartAddresses();

  useEffect(() => {
    updateCartAddresses();
  }, [updateCartAddresses]);

  return <AccountDetails {...data} />;
};

export default AccountDetailsTastic;
