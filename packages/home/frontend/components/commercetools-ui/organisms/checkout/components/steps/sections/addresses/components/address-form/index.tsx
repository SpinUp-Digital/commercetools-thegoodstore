import React, { useCallback, useState } from 'react';
import Input from 'components/commercetools-ui/atoms/input';
import { Address } from '../../types';
import { Fields, FieldsOptions } from './types';

interface Props {
  className?: string;
  address: Address;
  fields: (options: FieldsOptions) => Fields[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}

const AddressForm: React.FC<Props> = ({
  className: containerClassName,
  fields,
  address,
  onChange,
  onSubmit,
  children,
}) => {
  const [enableAddress2, setEnableAddress2] = useState(false);

  const onEnableAddress2 = useCallback(() => setEnableAddress2(true), []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit?.();
    },
    [onSubmit],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className={`grid grid-cols-3 gap-12 ${containerClassName}`}>
        {fields({ enableAddress2, onEnableAddress2 }).map(
          ({ name, label, labelDesc, type, required, className, render }) => (
            <React.Fragment key={name}>
              <div className={className}>
                <Input
                  name={name}
                  label={label}
                  labelDesc={labelDesc}
                  type={type}
                  required={required}
                  value={address[name as keyof Address]}
                  labelPosition="top"
                  onChange={onChange}
                />
                {render?.()}
              </div>
            </React.Fragment>
          ),
        )}
      </div>
      {children}
    </form>
  );
};

export default AddressForm;
