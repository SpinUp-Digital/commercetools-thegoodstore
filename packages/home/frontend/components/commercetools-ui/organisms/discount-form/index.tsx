import React, { useEffect, useState } from 'react';
import { Discount } from '@commercetools/domain-types/cart/Discount';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic/provider';

export interface Props {
  className?: string;
}

const DiscountForm: React.FC<Props> = ({ className }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const [code, setCode] = useState('');
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [codeIsInvalid, setCodeIsInvalid] = useState(false);
  const { redeemDiscountCode, removeDiscountCode, data } = useCart();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setDiscounts(data.discountCodes);
  }, [data]);

  const inputClassName = useClassNames([
    'h-40 w-full rounded-sm px-10 py-12 text-14 placeholder:text-secondary-black disabled:bg-neutral-300',
    codeIsInvalid ? 'border-accent-red text-accent-red' : 'border-neutral-300',
  ]);

  const discountsContainerClassName = useClassNames([
    'mt-8 flex flex-wrap justify-items-start gap-12',
    discounts?.length === 0 ? 'pt-0' : 'pt-4',
  ]);

  const onApplyDiscount = () => {
    if (processing || !code) return;

    setProcessing(true);

    redeemDiscountCode(code)
      .then(() => setCode(''))
      .catch(() => {
        setCodeIsInvalid(true);
        setCode(code);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCodeIsInvalid(false);
  };

  const handleRemove = (discount) => {
    removeDiscountCode(discount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyDiscount();
  };

  return (
    <div className={className}>
      <div className="w-full">
        <p className="text-16 font-semibold">
          {formatCartMessage({ id: 'discount.apply', defaultMessage: 'Apply a discount' })}
        </p>
      </div>
      <div>
        <div>
          <form className="mt-16" onSubmit={handleSubmit}>
            <input
              className={inputClassName}
              type="text"
              value={code}
              placeholder={formatCartMessage({
                id: 'cart.discount.enter',
                defaultMessage: 'Enter discount code',
              })}
              onChange={handleChange}
              disabled={processing}
            />
            {codeIsInvalid && (
              <p className="mt-16 font-body text-12 font-medium leading-normal text-accent-red">
                {formatCartMessage({ id: 'codeNotValid', defaultMessage: 'The discount code is not valid' })}
              </p>
            )}
          </form>
        </div>

        {discounts && !!discounts.length && (
          <div className={discountsContainerClassName}>
            {discounts.map((discount) => (
              <div
                key={discount.discountId}
                className="mr-2 flex w-fit justify-between gap-8 rounded-sm border border-neutral-400 bg-white px-8 py-4"
              >
                <label className="text-12 uppercase leading-[16px] text-secondary-black">{discount.code}</label>
                <button type="button" onClick={() => handleRemove(discount)}>
                  <XMarkIcon className="h-16 w-16 text-secondary-black" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountForm;
