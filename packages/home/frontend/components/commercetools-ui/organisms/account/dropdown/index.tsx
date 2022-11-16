import React from 'react';
import { useAccount } from 'frontastic';
import LoggedIn from './loggedin';
import LoggedOut from './loggedout';

const AccountDropdown: React.FC = () => {
  const { loggedIn } = useAccount();

  return loggedIn ? <LoggedIn /> : <LoggedOut />;
};

export default AccountDropdown;
