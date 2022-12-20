import React from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { TypographyProps } from 'components/commercetools-ui/atoms/typography/types';
import type { Address as AddressType } from '@commercetools/frontend-domain-types/account/Address';
import { useFormat } from 'helpers/hooks/useFormat';
import { AddressFormData } from './address-form';
import usePropsToAddressType from './mapPropsToAddressType';

export interface AddressProps {
  address: AddressType;
  onEdit: (defaultValues: AddressFormData) => void;
}

const Address: React.FC<AddressProps> = ({ address, onEdit }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const { mapPropsToAddress } = usePropsToAddressType();
  const { addressType, checked, label, setAsDefault } = mapPropsToAddress(address as AddressFormData);

  const defaultAddressInfoTypographyProps: TypographyProps = {
    fontSize: 14,
    lineHeight: 'loose',
    className: 'text-secondary-black',
  };

  const defaultValues = {
    ...address,
    addressType,
    isDefaultAddress: checked,
  } as AddressFormData;

  return (
    <div className="flex items-center justify-between border border-neutral-400 p-28" key={address.addressId}>
      <div className="flex items-center gap-28">
        <input
          className="hover:cursor-pointer"
          type="radio"
          defaultChecked={checked}
          onClick={!checked ? setAsDefault : undefined}
        ></input>

        <div className="grid">
          <Typography className="mb-4" medium fontSize={16}>
            {label}
          </Typography>
          <Typography {...defaultAddressInfoTypographyProps}>{address.firstName}</Typography>
          <Typography {...defaultAddressInfoTypographyProps}>{address.streetName}</Typography>
          <Typography {...defaultAddressInfoTypographyProps}>{`${address.postalCode} ${address.city}`}</Typography>
        </div>
      </div>

      <Button
        className="h-fit text-14 font-medium text-primary-black hover:underline"
        variant="ghost"
        onClick={() => onEdit(defaultValues)}
      >
        {formatMessage({ id: 'update', defaultMessage: 'Update' })}
      </Button>
    </div>
  );
};

export default Address;
