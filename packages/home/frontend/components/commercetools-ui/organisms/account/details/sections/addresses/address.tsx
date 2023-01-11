import React from 'react';
import type { Address as AddressType } from '@commercetools/frontend-domain-types/account/Address';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { TypographyProps } from 'components/commercetools-ui/atoms/typography/types';
import { useFormat } from 'helpers/hooks/useFormat';
import { AddressFormData } from './address-form';
import usePropsToAddressType from './mapPropsToAddressType';

export interface AddressProps {
  address: AddressType;
}

const Address: React.FC<AddressProps> = ({ address }) => {
  const { formatMessage } = useFormat({ name: 'common' });

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

      <Link
        link={`#edit-address/${address.addressId}`}
        className="h-fit text-14 font-medium text-primary-black hover:underline"
      >
        {formatMessage({ id: 'update', defaultMessage: 'Update' })}
      </Link>
    </div>
  );
};

export default Address;
