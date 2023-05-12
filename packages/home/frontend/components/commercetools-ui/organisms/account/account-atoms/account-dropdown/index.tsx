import React from 'react';
import LoggedIn from './loggedin';
import LoggedOut from './loggedout';

interface Props {
  loggedIn: boolean;
}

const AccountDropdown: React.FC<React.PropsWithChildren<Props>> = ({ loggedIn }) => {
  return loggedIn ? <LoggedIn /> : <LoggedOut />;
};

export default AccountDropdown;
