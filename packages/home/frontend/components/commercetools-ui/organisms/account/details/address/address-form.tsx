import { useCallback, useEffect, useMemo, useState } from 'react';
import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from 'components/commercetools-ui/atoms/button';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import Dropdown from 'components/commercetools-ui/atoms/dropdown';
import Input from 'components/commercetools-ui/atoms/input';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import { useAccount } from 'frontastic';

export interface AddressFormProps {
  onClose?: () => void;
  addressId?: string;
  defaultValues?: Address;
  onSubmit?: (address: Address) => void;
}

export interface AddressFormData extends Address {
  addressId: string;
  addressType?: 'shipping' | 'billing';
  isDefaultAddress?: boolean;
  isBillingAddress?: boolean;
  isDefaultBillingAddress?: boolean;
  isDefaultShippingAddress?: boolean;
}

type AddressType = 'shipping' | 'billing';
type AddressTypeOptions = Array<{ label: string; value: AddressType }>;

const AddressForm: React.FC<AddressFormProps> = ({ defaultValues, onClose, onSubmit }) => {
  //i18n messages
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });
  const { formatMessage } = useFormat({ name: 'common' });

  //account data
  const { removeAddress } = useAccount();

  //I18n info
  const { country } = useI18n();

  //new address data
  const defaultData = useMemo(
    () => (defaultValues as Address) ?? { country },
    [country, defaultValues],
  ) as AddressFormData;
  const [data, setData] = useState<AddressFormData>(defaultData);

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  const addressTypes: AddressTypeOptions = [
    { label: formatCheckoutMessage({ id: 'shippingAddress', defaultMessage: 'Shipping Address' }), value: 'shipping' },
    { label: formatCheckoutMessage({ id: 'billingAddress', defaultMessage: 'Billing Address' }), value: 'billing' },
  ];

  const resetData = useCallback(() => {
    setData(defaultData);
  }, [defaultData]);

  const handleClose = () => {
    resetData();
    onClose?.();
  };

  //input change handler
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    removeAddress(data.addressId).then(onClose);
  };

  //submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(data);
    resetData();
  };

  return (
    <div>
      <Typography fontFamily="libre" className="mb-24 text-secondary-black" fontSize={22} lineHeight="normal" as="h3">
        {formatAccountMessage(
          defaultValues
            ? { id: 'address.edit', defaultMessage: 'Edit address' }
            : { id: 'address.add', defaultMessage: 'Add an address' },
        )}
      </Typography>

      <div className="relative border border-neutral-400 py-40 px-32 md:py-24">
        <XMarkIcon
          className="absolute top-24 right-24 h-24 w-24 stroke-secondary-black stroke-1 hover:cursor-pointer"
          onClick={handleClose}
        />

        <form onSubmit={handleSubmit} className="grid max-w-[450px] gap-12">
          <Input
            label={formatMessage({ id: 'name', defaultMessage: 'Name' })}
            required
            type="text"
            name="firstName"
            id="first-name"
            value={data?.firstName ?? ''}
            autoComplete="first-name"
            className="border-neutral-500"
            onChange={handleChange}
          />

          <Input
            label={formatMessage({ id: 'address', defaultMessage: 'Address' })}
            required
            type="text"
            name="streetName"
            id="street-name"
            value={data?.streetName ?? ''}
            autoComplete="primary-address"
            className="border-neutral-500"
            onChange={handleChange}
          />

          <Input
            label={formatMessage({ id: 'address.optional', defaultMessage: 'Address 2 (optional)' })}
            type="text"
            name="additionalAddressInfo"
            id="additional-address-info"
            value={data?.additionalAddressInfo ?? ''}
            autoComplete="additional-address-info"
            className="border-neutral-500"
            onChange={handleChange}
          />

          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-3 md:col-span-1">
              <Input
                label={formatMessage({ id: 'zipCode', defaultMessage: 'Postal Code' })}
                required
                type="text"
                name="postalCode"
                id="postal-code"
                value={data?.postalCode ?? ''}
                autoComplete="postal-code"
                className="border-neutral-500"
                onChange={handleChange}
              />
            </div>

            <div className="col-span-3 md:col-span-2">
              <Input
                label={formatMessage({ id: 'city', defaultMessage: 'City' })}
                required
                type="text"
                name="city"
                id="city"
                value={data?.city ?? ''}
                autoComplete="city"
                className="border-neutral-500"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid w-full gap-8">
            <Typography as="label">{`${formatAccountMessage({
              id: 'address.type',
              defaultMessage: 'Address type',
            })} *`}</Typography>
            <Dropdown
              name="addressType"
              items={addressTypes}
              className="w-full border-neutral-500"
              onChange={handleChange}
              value={data?.addressType ?? addressTypes[0].value}
            />
          </div>

          <div className="mt-4 mb-20 flex gap-8 ">
            <Checkbox
              name="isDefaultAddress"
              id="is-default-address"
              defaultChecked={data?.isDefaultAddress ?? false}
              onChange={handleChange}
              className="h-16 w-16 rounded-sm border-neutral-500"
            />
            <Typography className="text-secondary-black" fontSize={14} as="label">
              {formatAccountMessage({
                id: 'address.setDefault',
                defaultMessage: 'Save as default address',
              })}
            </Typography>
          </div>

          <div className="mt-20 flex h-fit items-center justify-between">
            {defaultValues && (
              <div className="flex items-center gap-8 hover:cursor-pointer hover:opacity-[0.7]" onClick={handleDelete}>
                <TrashIcon className="h-20 w-20 text-secondary-black" />
                <Typography className="leading-[114%] text-secondary-black" fontSize={14} as="span">
                  {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
                </Typography>
              </div>
            )}

            <div className="flex gap-12">
              <Button onClick={handleClose} variant="secondary" className="h-40 w-112 border border-primary-black">
                {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
              </Button>
              <Button type="submit" className="h-40 w-112">
                {formatMessage({ id: 'save', defaultMessage: 'Save' })}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
