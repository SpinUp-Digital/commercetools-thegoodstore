import React, { useState } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { useAccount } from 'frontastic';
import { removeAddress, updateAddress } from 'frontastic/actions/account';
import Address from '../address';
import AddressForm, { AddressFormData } from '../address/address-form';
import usePropsToAddressType from '../address/mapPropsToAddressType';

const Addresses = () => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });

  const { account } = useAccount();
  const addresses = account?.addresses;

  const [formIsOpen, setFormIsOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState<AddressFormData>();
  const openModal = () => setFormIsOpen(true);
  const closeModal = () => {
    setDefaultValues(undefined);
    setFormIsOpen(false);
  };

  const { mapPropsToAddress } = usePropsToAddressType();

  const handleSubmit = (address: Partial<AddressFormData>) => {
    if (defaultValues) {
      if (defaultValues.addressType !== address.addressType) {
        const { addAddress } = mapPropsToAddress(address as AddressFormData);
        removeAddress(defaultValues.addressId).then(addAddress).then(closeModal);
      } else {
        updateAddress(address).then(closeModal);
      }
    } else {
      const { addAddress } = mapPropsToAddress(address as AddressFormData);
      addAddress().then(closeModal);
    }
  };

  const handleEdit = (address: AddressFormData) => {
    setDefaultValues(address);
    openModal();
  };

  return (
    <div>
      {formIsOpen ? (
        <AddressForm onClose={closeModal} onSubmit={handleSubmit} defaultValues={defaultValues} />
      ) : (
        <>
          <div>
            <Typography
              as="h2"
              className="mb-20 text-primary-black md:text-22 2xl:mb-28 2xl:text-24"
              fontFamily="libre"
              fontSize={18}
            >
              {formatAccountMessage({ id: 'addresses', defaultMessage: 'Addresses' })}
            </Typography>
            <Typography fontSize={14} lineHeight="loose" className="mb-24 text-secondary-black md:text-14 2xl:text-16">
              {formatAccountMessage({
                id: 'address.desc',
                defaultMessage: 'Manage or add addresses for your account.',
              })}
            </Typography>
            <Button
              onClick={openModal}
              size="full"
              className="bg-gray-700 py-8 px-16 text-14 font-medium leading-[114%] md:w-fit 2xl:p-12"
            >
              {formatAccountMessage({ id: 'address.add', defaultMessage: 'Add an address' })}
            </Button>
          </div>

          <div className="mt-32 grid gap-20">
            {addresses?.map((address) => (
              <Address key={address.addressId} address={address} onEdit={handleEdit} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Addresses;
