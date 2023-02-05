import React from 'react';
import { useCart } from 'frontastic';
import Preview from '../wrapper';

const AddressesPreview = () => {
  const { data } = useCart();

  const shippingAddress = data?.shippingAddress ?? {};
  return (
    <Preview>
      <p className="text-14 text-secondary-black">
        {`${shippingAddress.firstName} ${shippingAddress.lastName ?? ''}`}
        <span className="mt-8 block" />
        {shippingAddress.streetName}
        <span className="mt-8 block" />
        {shippingAddress.postalCode} {shippingAddress.city}
      </p>
    </Preview>
  );
};

export default AddressesPreview;
