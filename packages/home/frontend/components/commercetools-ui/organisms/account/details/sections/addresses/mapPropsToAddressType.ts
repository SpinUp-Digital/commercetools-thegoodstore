import { useCallback } from 'react';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import {
  addBillingAddress,
  addShippingAddress,
  setDefaultBillingAddress,
  setDefaultShippingAddress,
  updateAddress,
} from 'frontastic/actions/account';
import { AddressFormData } from './address-form';

const usePropsToAddressType = () => {
  const { country } = useI18n();
  const { formatMessage } = useFormat({ name: 'checkout' });

  const getAddressType = useCallback((address: AddressFormData) => {
    if (address?.addressType) return address?.addressType;
    return address?.isBillingAddress ? 'billing' : 'shipping';
  }, []);

  const mapPropsToAddress = useCallback(
    (address: AddressFormData) => {
      const addressType = getAddressType(address);

      const typeBasedProps = {
        billing: {
          checked: address?.isDefaultBillingAddress,
          label: formatMessage({ id: 'billing', defaultMessage: 'Billing' }),
          addressType: addressType,
          setAsDefault: async () => {
            await setDefaultBillingAddress(address?.addressId);
          },
          addAddress: async () => {
            await addBillingAddress({ ...address, country, isDefaultBillingAddress: address?.isDefaultAddress });
          },
          updateAddress: async () => {
            await updateAddress({ ...address, isDefaultBillingAddress: address?.isDefaultAddress });
          },
        },
        shipping: {
          checked: address?.isDefaultShippingAddress,
          label: formatMessage({ id: 'shipping', defaultMessage: 'Shipping' }),
          addressType: addressType,
          setAsDefault: async () => {
            await setDefaultShippingAddress(address?.addressId);
          },
          addAddress: async () => {
            await addShippingAddress({ ...address, country, isDefaultShippingAddress: address?.isDefaultAddress });
          },
          updateAddress: async () => {
            await updateAddress({ ...address, isDefaultShippingAddress: address?.isDefaultAddress });
          },
        },
      };

      return typeBasedProps[addressType];
    },
    [country, formatMessage, getAddressType],
  );

  return { mapPropsToAddress };
};

export default usePropsToAddressType;
