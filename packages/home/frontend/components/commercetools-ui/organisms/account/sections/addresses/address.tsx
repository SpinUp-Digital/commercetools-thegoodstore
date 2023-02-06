import React, { useEffect, useState } from 'react';
import type { Address as AddressType } from '@commercetools/frontend-domain-types/account/Address';
import Typography from 'components/commercetools-ui/atoms/typography';
import { TypographyProps } from 'components/commercetools-ui/atoms/typography/types';
import { useFormat } from 'helpers/hooks/useFormat';
import EditCTA from '../../account-atoms/edit-cta';
import { AddressFormData } from './address-form';
import usePropsToAddressType from './mapPropsToAddressType';

export interface AddressProps {
  address: AddressType;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  const { mapPropsToAddress } = usePropsToAddressType();
  const { checked: defaultChecked, label, setAsDefault } = mapPropsToAddress(address as AddressFormData);

  const { formatMessage } = useFormat({ name: 'account' });

  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

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

  const handleChange = (e: React.ChangeEvent) => {
    setChecked((e.target as HTMLInputElement).checked);
    setAsDefault();
  };

  return (
    <div
      className="flex items-center justify-between rounded-md border border-neutral-400 p-12 md:py-24 md:px-20 2xl:px-24"
      key={address.addressId}
    >
      <div className="flex items-center gap-28">
        <input
          className="hidden hover:cursor-pointer md:block"
          type="radio"
          name={label}
          checked={checked ?? false}
          onChange={handleChange}
        />

        <div className="grid">
          <div className="flex gap-5">
            <Typography className="mb-24 md:mb-4 md:text-16" medium fontSize={14}>
              {label}
            </Typography>
            <Typography fontSize={14} className="text-secondary-black md:hidden">
              {'- ' + formatMessage({ id: 'default', defaultMessage: 'Default' })}
            </Typography>
          </div>

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
