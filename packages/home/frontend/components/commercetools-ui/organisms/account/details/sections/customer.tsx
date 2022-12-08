import React, { useState } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';

const CustomerSupport = () => {
  //account data
  const { changePassword } = useAccount();
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  //new passwords
  const initialData = { oldPassword: '', password: '', confirmPassword: '' };
  const [data, setData] = useState(initialData);

  //error
  const [error, setError] = useState('');

  //success
  const [success, setSuccess] = useState('');

  //loading..
  const [processing, setProcessing] = useState(false);

  //input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //loading starts
    setProcessing(true);
    //try updating user's password
    try {
      const response = await changePassword(data.oldPassword, data.password);
      if (response.accountId) {
        setSuccess('Password successfully changed!');
        setError('');
      } else {
        setError("Sorry, we couldn't fulfill your request");
        setSuccess('');
      }
    } catch (err) {
      setError('Wrong password entered');
      setSuccess('');
    } finally {
      setProcessing(false);
      setData(initialData);
    }
  };

  //save button disabled
  const submitDisabled =
    !(data.password && data.confirmPassword && data.oldPassword) || data.password !== data.confirmPassword;

  return <div>Customer Support</div>;
};

export default CustomerSupport;
