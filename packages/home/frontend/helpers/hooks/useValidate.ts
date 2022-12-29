import { useCallback } from 'react';

const useValidate = () => {
  const validateName = useCallback((name: string) => name.length >= 2, []);

  const validatePassword = useCallback((password: string) => {
    const passwordRules = new RegExp('((?=.{8,})(?=.*[A-Z]))');
    return passwordRules.test(password);
  }, []);

  const validateEmail = useCallback((email: string) => {
    const emailRules =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailRules.test(email);
  }, []);

  return { validatePassword, validateEmail, validateName };
};

export default useValidate;
