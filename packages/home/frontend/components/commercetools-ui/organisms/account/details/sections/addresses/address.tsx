import React from 'react';
import type { Address as AddressType } from '@commercetools/frontend-domain-types/account/Address';
import Typography from 'components/commercetools-ui/atoms/typography';
import { TypographyProps } from 'components/commercetools-ui/atoms/typography/types';
import EditCTA from '../../../account-atoms/edit-cta';
import { AddressFormData } from './address-form';
import usePropsToAddressType from './mapPropsToAddressType';

export interface AddressProps {
  address: AddressType;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  const { mapPropsToAddress } = usePropsToAddressType();
  const { checked, label, setAsDefault } = mapPropsToAddress(address as AddressFormData);

  const addressInfoTypographyProps: TypographyProps = {
    fontSize: 14,
    lineHeight: 'loose',
    className: 'text-secondary-black',
  };

  const addressInfoTypographyElements = [
    address.firstName,
    address.streetName,
    `${address.postalCode} ${address.city}`,
  ];

  return (
    <div className="flex items-center justify-between border border-neutral-400 p-28" key={address.addressId}>
      <div className="flex items-center gap-28">
        <input
          className="hover:cursor-pointer"
          type="radio"
          name={label}
          defaultChecked={checked}
          onClick={!checked ? () => setAsDefault : undefined}
        />

        <div className="grid">
          <Typography className="mb-4" medium fontSize={16}>
            {label}
          </Typography>
          {addressInfoTypographyElements.map((element) => (
            <Typography key={element} {...addressInfoTypographyProps}>
              {element}
            </Typography>
          ))}
        </div>
      </div>

      <EditCTA editHref={`#edit-address/${address.addressId}`} />
    </div>
  );
};

export default Address;
