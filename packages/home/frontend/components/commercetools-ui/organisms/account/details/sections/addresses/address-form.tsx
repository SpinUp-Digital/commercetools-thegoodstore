import { useEffect, useMemo, useState } from 'react';
import { Account } from '@commercetools/frontend-domain-types/account/Account';
import { Address } from '@commercetools/frontend-domain-types/account/Address';
import { TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import Button from 'components/commercetools-ui/atoms/button';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import Dropdown from 'components/commercetools-ui/atoms/dropdown';
import Input from 'components/commercetools-ui/atoms/input';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import useValidate from 'helpers/hooks/useValidate';
import { useAccount } from 'frontastic';
import AccountForm from '../../../account-atoms/account-form';
import useFeedbackToasts from '../../../hooks/useFeedbackToasts';
import useDiscardForm from '../../../useDiscardForm';
import DeleteModal from './deleteModal';
import usePropsToAddressType from './mapPropsToAddressType';

export interface AddressFormProps {
  addressId?: string;
  editedAddressId?: Address['addressId'];
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

const AddressForm: React.FC<AddressFormProps> = ({ editedAddressId }) => {
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });
  const { formatMessage } = useFormat({ name: 'common' });

  const { validateTextExists, validatePostalCode } = useValidate();

  const { removeAddress, account } = useAccount();
  const { mapPropsToAddress } = usePropsToAddressType();
  const { discardForm } = useDiscardForm();
  const { notifyDataUpdated, notifyWentWrong } = useFeedbackToasts();
  const { country } = useI18n();

  //new address data
  const defaultData = useMemo(
    () =>
      (editedAddressId
        ? account?.addresses?.find((address) => address.addressId === editedAddressId)
        : { country }) as AddressFormData,
    [account?.addresses, country, editedAddressId],
  );

  const [data, setData] = useState<AddressFormData>(defaultData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addressTypes: AddressTypeOptions = [
    { label: formatCheckoutMessage({ id: 'shippingAddress', defaultMessage: 'Shipping Address' }), value: 'shipping' },
    { label: formatCheckoutMessage({ id: 'billingAddress', defaultMessage: 'Billing Address' }), value: 'billing' },
  ];

  const formTitle = formatAccountMessage(
    editedAddressId
      ? { id: 'address.edit', defaultMessage: 'Edit address' }
      : { id: 'address.add', defaultMessage: 'Add an address' },
  );

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const discardFormAndNotify = (promise: Promise<Account | void>) => {
    discardForm();
    promise.then(notifyDataUpdated).catch(notifyWentWrong);
  };

  const handleDelete = () => {
    removeAddress(data.addressId)
      .then(closeModal)
      .then(() =>
        toast.success(formatAccountMessage({ id: 'address.deleted', defaultMessage: 'Account deleted successfully' })),
      )
      .then(discardForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { addAddress, updateAddress } = mapPropsToAddress(data);

    if (editedAddressId) {
      if (defaultData.addressType !== data.addressType) {
        discardFormAndNotify(removeAddress(defaultData.addressId).then(addAddress));
      } else {
        discardFormAndNotify(updateAddress());
      }

      return;
    }
    discardFormAndNotify(addAddress());
  };

  return (
    <AccountForm onSubmit={handleSubmit} title={formTitle} containerClassName="grid gap-12">
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
        validation={validateTextExists}
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
        validation={validateTextExists}
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
            validation={validatePostalCode}
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
            validation={validateTextExists}
          />
        </div>
      </div>

      <Dropdown
        name="addressType"
        items={addressTypes}
        className="w-full border-neutral-500"
        onChange={handleChange}
        value={editedAddressId ? mapPropsToAddress(data).addressType : addressTypes[0].value}
        label={formatAccountMessage({
          id: 'address.type',
          defaultMessage: 'Address type',
        })}
      />

      <Checkbox
        name="isDefaultAddress"
        id="is-default-address"
        checked={data?.isDefaultAddress ?? false}
        onChange={handleChange}
        containerClassName="mt-4 mb-20"
        label={formatAccountMessage({
          id: 'address.setDefault',
          defaultMessage: 'Save as default address',
        })}
      />

      <div className="mt-20 flex h-fit items-center justify-between">
        {editedAddressId && (
          <div
            className="flex items-center gap-8 hover:cursor-pointer hover:opacity-[0.7]"
            onClick={() => setModalIsOpen(true)}
          >
            <TrashIcon className="h-20 w-20 text-secondary-black" />
            <Typography className="leading-[114%] text-secondary-black" fontSize={14} as="span">
              {formatMessage({ id: 'delete', defaultMessage: 'Delete' })}
            </Typography>
          </div>
        )}

        <div className="flex gap-12">
          <Button
            type="button"
            onClick={discardForm}
            variant="secondary"
            className="h-40 w-112 border border-primary-black"
          >
            {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
          </Button>
          <Button type="submit" className="h-40 w-112">
            {formatMessage({ id: 'save', defaultMessage: 'Save' })}
          </Button>
        </div>
      </div>

      <DeleteModal modalIsOpen={modalIsOpen} closeModal={closeModal} handleDelete={handleDelete} />
    </AccountForm>
  );
};

export default AddressForm;
