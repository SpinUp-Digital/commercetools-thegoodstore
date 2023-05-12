import React from 'react';
import { Reference } from 'types/reference';
import AlterForm from '../../account/account-atoms/alter-form';
import RegisterForm from './register-form';

export interface RegisterProps {
  termsOfUseLink?: Reference;
}

const Register: React.FC<React.PropsWithChildren<RegisterProps>> = ({ termsOfUseLink }) => {
  return (
    <>
      <div className="m-auto grid max-w-[480px] px-16">
        <RegisterForm termsOfUseLink={termsOfUseLink} />
      </div>
      <AlterForm page="login" />
    </>
  );
};

export default Register;
