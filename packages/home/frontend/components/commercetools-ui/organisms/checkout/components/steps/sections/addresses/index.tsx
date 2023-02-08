import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Address as AccountAddress } from '@commercetools/frontend-domain-types/account/Address';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import Button from 'components/commercetools-ui/atoms/button';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import Info from 'components/commercetools-ui/atoms/info';
import Input from 'components/commercetools-ui/atoms/input';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import useProcessing from 'helpers/hooks/useProcessing';
import { useAccount, useCart } from 'frontastic';
import { CartDetails } from 'frontastic/hooks/useCart/types';
import { Address } from './types';

export interface Props {
  goToNextStep: () => void;
}

const Addresses: React.FC<Props> = ({ goToNextStep }) => {
  const { formatMessage } = useFormat({ name: 'common' });
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const { account } = useAccount();

  const { updateCart } = useCart();

  const { country } = useI18n();

  const [enableAddress2, setEnableAddress2] = useState({ shipping: false, billing: false });

  const initialAddressData = {
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    postalCode: '',
    city: '',
  } as Address;

  const [shippingAddress, setShippingAddress] = useState(initialAddressData);
  const [billingAddress, setBillingAddress] = useState(initialAddressData);
  const [sameShippingAddress, setSameShippingAddress] = useState(true);

  const accountAddressToAddress = useCallback(
    (address: AccountAddress) => {
      return {
        name: `${address.firstName ?? ''} ${address.lastName ?? ''}`,
        email: account?.email ?? '',
        phone: address.phone,
        line1: address.streetName ?? '',
        line2: address.additionalAddressInfo,
        postalCode: address.postalCode ?? '',
        city: address.city ?? '',
      } as Address;
    },
    [account],
  );

  const addressToAccountAddress = useCallback(
    (address: Address) => {
      const [firstName, lastName] = address.name.split(' ');
      return {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        phone: address.phone,
        streetName: address.line1,
        additionalAddressInfo: address.line2,
        postalCode: address.postalCode,
        city: address.city,
        country,
      } as AccountAddress;
    },
    [country],
  );

  useEffect(() => {
    if (account) {
      const defaultShippingAddress = account.addresses?.find((address) => address.isDefaultShippingAddress);
      const defaultBillingAddress = account.addresses?.find((address) => address.isDefaultBillingAddress);

      if (defaultShippingAddress) setShippingAddress(accountAddressToAddress(defaultShippingAddress));
      if (defaultBillingAddress) setBillingAddress(accountAddressToAddress(defaultBillingAddress));
    }
  }, [account, accountAddressToAddress]);

  const currentBillingAddress = useMemo(
    () => (sameShippingAddress ? shippingAddress : billingAddress),
    [sameShippingAddress, shippingAddress, billingAddress],
  );

  const addressValidationScehma = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().optional(),
      line1: yup.string().required(),
      line2: yup.string().optional(),
      postalCode: yup.string().required(),
      city: yup.string().required(),
    });
  }, []);

  const isValidShippingAddress = useMemo(() => {
    try {
      addressValidationScehma.validateSync(shippingAddress);
      return true;
    } catch (err) {
      return false;
    }
  }, [addressValidationScehma, shippingAddress]);

  const isValidBillingAddress = useMemo(() => {
    try {
      addressValidationScehma.validateSync(currentBillingAddress);
      return true;
    } catch (err) {
      return false;
    }
  }, [addressValidationScehma, currentBillingAddress]);

  const handleShippingAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    },
    [shippingAddress],
  );

  const handleBillingAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value });
    },
    [billingAddress],
  );

  const { processing, startProcessing, stopProcessing } = useProcessing();

  const submit = useCallback(async () => {
    if (!isValidShippingAddress || !isValidBillingAddress || processing) return;

    startProcessing();

    const data = {
      account: { email: account?.email || shippingAddress.email || currentBillingAddress.email },
      shipping: addressToAccountAddress(shippingAddress),
      billing: addressToAccountAddress(currentBillingAddress),
    } as CartDetails;

    const res = await updateCart(data);

    stopProcessing();

    if (res.cartId) goToNextStep();
    else
      toast.error(
        formatCheckoutMessage({
          id: 'update.addresses.error',
          defaultMessage: "Couldn't update your addresses information, please try again later.",
        }),
        { position: 'bottom-left' },
      );
  }, [
    account,
    isValidShippingAddress,
    isValidBillingAddress,
    shippingAddress,
    currentBillingAddress,
    addressToAccountAddress,
    updateCart,
    goToNextStep,
    formatCheckoutMessage,
    processing,
    startProcessing,
    stopProcessing,
  ]);

  const fields = useCallback(
    (address: 'shipping' | 'billing') => {
      return [
        {
          name: 'name',
          label: formatMessage({ id: 'name', defaultMessage: 'Name' }),
          labelDesc: '',
          required: true,
          type: 'string',
          className: 'col-span-3',
          render() {
            return <></>;
          },
        },
        {
          name: 'email',
          label: formatMessage({ id: 'email', defaultMessage: 'Email' }),
          labelDesc: '',
          required: true,
          type: 'email',
          className: 'col-span-3',
          render() {
            return <></>;
          },
        },
        {
          name: 'phone',
          label: `${formatMessage({ id: 'phone', defaultMessage: 'Phone' })}`,
          labelDesc: formatCheckoutMessage({
            id: 'for.other.updates',
            defaultMessage: 'for other updates',
          }),
          type: 'string',
          className: 'col-span-3',
          render() {
            return <></>;
          },
        },
        {
          name: 'line1',
          label: formatMessage({ id: 'address', defaultMessage: 'Address' }),
          labelDesc: '',
          required: true,
          type: 'string',
          className: 'col-span-3',
          render() {
            if (enableAddress2[address]) return <></>;

            return (
              <div className="col-span-3 mt-16">
                <p
                  className="w-fit text-14 text-secondary-black"
                  onClick={() => setEnableAddress2({ ...enableAddress2, [address]: true })}
                >
                  + {formatCheckoutMessage({ id: 'add.address', defaultMessage: 'Add another address line' })}
                </p>
              </div>
            );
          },
        },
        ...(enableAddress2[address]
          ? [
              {
                name: 'line2',
                label: `${formatMessage({ id: 'address', defaultMessage: 'Address' })} 2`,
                labelDesc: '',
                type: 'string',
                className: 'col-span-3',
                render() {
                  return <></>;
                },
              },
            ]
          : []),
        {
          name: 'postalCode',
          label: formatMessage({ id: 'zipCode', defaultMessage: 'Postcode' }),
          labelDesc: '',
          required: true,
          className: 'col-span-1 mt-12',
          render() {
            return <></>;
          },
        },
        {
          name: 'city',
          label: formatMessage({ id: 'city', defaultMessage: 'City' }),
          labelDesc: '',
          required: true,
          className: 'col-span-2 mt-12',
          render() {
            return <></>;
          },
        },
      ];
    },
    [formatMessage, formatCheckoutMessage, enableAddress2],
  );

  return (
    <div className="bg-white pt-16 lg:px-36 lg:pt-0 lg:pb-36">
      <form className="grid grid-cols-3 gap-12 md:max-w-[400px]">
        {fields('shipping').map(({ name, label, labelDesc, type, required, className, render }) => (
          <React.Fragment key={name}>
            <div className={className}>
              <Input
                name={name}
                label={label}
                labelDesc={labelDesc}
                type={type}
                required={required}
                value={shippingAddress[name as keyof Address]}
                labelPosition="top"
                onChange={handleShippingAddressChange}
              />
              {render()}
            </div>
          </React.Fragment>
        ))}
      </form>
      <div className="mt-48">
        <div className="flex items-center gap-8">
          <h5 className="text-16 capitalize">
            {formatCheckoutMessage({ id: 'billingAddress', defaultMessage: 'Billing Address' })}
          </h5>
          <Info
            message={`${formatCheckoutMessage({
              id: 'enter.associated.address.with.payment',
              defaultMessage: 'Enter the address that is associated with your payment method',
            })}.`}
          />
        </div>

        <div className="mt-28 flex items-center gap-12 p-2">
          <Checkbox
            label={formatCheckoutMessage({
              id: 'billingDetailsLabel',
              defaultMessage: 'My billing address is the same as my delivery address',
            })}
            labelPosition="on-right"
            checked={sameShippingAddress}
            onChange={(e) => setSameShippingAddress(e.target.checked)}
          />
        </div>

        {!sameShippingAddress && (
          <form className="mt-28 grid grid-cols-3 gap-12">
            {fields('billing').map(({ name, label, labelDesc, type, required, className, render }) => (
              <React.Fragment key={name}>
                <div className={className}>
                  <Input
                    name={name}
                    label={label}
                    labelDesc={labelDesc}
                    type={type}
                    required={required}
                    value={billingAddress[name as keyof Address]}
                    labelPosition="top"
                    onChange={handleBillingAddressChange}
                  />
                  {render()}
                </div>
              </React.Fragment>
            ))}
          </form>
        )}

        <div className="mt-24">
          <Button
            variant="primary"
            className="w-full min-w-[200px] lg:w-fit lg:px-36"
            disabled={!isValidShippingAddress || !isValidBillingAddress}
            loading={processing}
            type="submit"
            onClick={submit}
          >
            {formatCartMessage({ id: 'continue.to', defaultMessage: 'Continue to' })}{' '}
            <span className="lowercase">{formatCartMessage({ id: 'shipping', defaultMessage: 'Shipping' })}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
