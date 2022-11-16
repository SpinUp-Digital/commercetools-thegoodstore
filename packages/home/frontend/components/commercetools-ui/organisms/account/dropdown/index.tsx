import { useAccount } from 'frontastic';
import React from 'react';
import LoggedIn from './loggedin';
import LoggedOut from './loggedout';

const AccountDropdown: React.FC = () => {
  const { loggedIn } = useAccount();

  return loggedIn ? <LoggedIn /> : <LoggedOut />;
};

export default AccountDropdown;
