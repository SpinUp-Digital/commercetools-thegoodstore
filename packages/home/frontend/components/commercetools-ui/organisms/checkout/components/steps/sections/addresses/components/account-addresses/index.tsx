import React, { useEffect, useMemo, useState } from 'react';
import Radio from 'components/commercetools-ui/atoms/radio';
import { useAccount } from 'frontastic';
import useMappers from '../../hooks/useMappers';
import { Address } from '../../types';

interface Props {
  className?: string;
  type: 'shipping' | 'billing';
  onSelectAddress: (address: Address) => void;
}

const AccountAddresses: React.FC<Props> = ({ className = '', type, onSelectAddress }) => {
  const { account } = useAccount();

  const { accountAddressToAddress } = useMappers();

  const addresses = useMemo(() => {
    return (account?.addresses ?? []).filter(
      (address) => address[type === 'shipping' ? 'isShippingAddress' : 'isBillingAddress'],
    );
  }, [account?.addresses, type]);

  const [selected, setSelected] = useState<Address>();

  useEffect(() => {
    const defaultAddress = addresses.find(
      (address) => address[type === 'shipping' ? 'isDefaultShippingAddress' : 'isDefaultBillingAddress'],
    );

    if (defaultAddress) setSelected(accountAddressToAddress(defaultAddress));
  }, [addresses, accountAddressToAddress, type]);

  useEffect(() => {
    if (selected) onSelectAddress(selected);
  }, [selected, onSelectAddress]);

  return (
    <div className={`flex grid-cols-3 flex-col gap-20 md:grid ${className}`}>
      {addresses
        .map((address) => accountAddressToAddress(address))
        .map((address) => (
          <div
            key={address.addressId}
            className="flex cursor-pointer items-center gap-20 rounded-md border border-neutral-400 py-38 px-20"
            onClick={() => setSelected(address)}
          >
            <Radio className="shrink-0" checked={address.addressId === selected?.addressId} />
            <p className="max-w-full overflow-hidden truncate text-14 text-secondary-black">
              {address.name}
              <span className="mt-8 block" />
              {address.line1}
              <span className="mt-8 block" />
              {address.postalCode} {address.city}
            </p>
          </div>
        ))}
    </div>
  );
};

export default AccountAddresses;
