import React, { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { Cart } from '@Types/cart/Cart';
import { Discount } from '@Types/cart/Discount';
import toast from 'react-hot-toast';
import { useFormat } from 'helpers/hooks/useFormat';
import { useCart } from 'frontastic/provider';

export interface Props {
  className?: string;
}

const DiscountForm: React.FC<Props> = ({ className }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const [code, setCode] = useState('');
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const { redeemDiscountCode, removeDiscountCode, data } = useCart();

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setDiscounts(data.discountCodes);
  }, [data]);

  const onApplyDiscount = () => {
    if (processing || !code) return;

    setProcessing(true);

    redeemDiscountCode(code)
      .catch((e: Error) => {
        if ((e.message = '101')) {
          toast.error(formatCartMessage({ id: 'codeNotValid', defaultMessage: 'Code is not valid' }));
        }
      })
      .finally(() => {
        setCode('');
        setProcessing(false);
      });
  };

  const handleRemove = (discount) => {
    removeDiscountCode(discount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyDiscount();
  };

  return (
    <div className={`${className}`}>
      <div className="w-full">
        <p className="text-16 font-semibold">
          {formatCartMessage({ id: 'discount.apply', defaultMessage: 'Apply a discount' })}
        </p>
      </div>
      <div>
        <div>
          <form className="mt-16" onSubmit={handleSubmit}>
            <input
              className="rounded-sm border-neutral-300 px-10 py-12 placeholder:text-secondary-black disabled:bg-neutral-300"
              type="text"
              value={code}
              placeholder={formatCartMessage({
                id: 'cart.discount.enter',
                defaultMessage: 'Enter discount code',
              })}
              onChange={(e) => setCode(e.target.value)}
              disabled={processing}
            />
          </form>
          {/* <button
            type="button"
            onClick={onApplyDiscount}
            disabled={code === '' ? true : false}
            className="border-accent-400 text-accent-400 hover:bg-accent-400 w-24 cursor-pointer content-center rounded border-2 bg-white p-2 font-bold hover:text-white focus:outline-none disabled:cursor-not-allowed disabled:border-none disabled:bg-gray-300 disabled:text-gray-500"
          >
            {formatCartMessage({
              id: 'cart.apply',
              defaultMessage: 'Apply',
            })}
          </button> */}
        </div>

        <div className={`mt-8 flex flex-wrap justify-items-start ${discounts?.length === 0 ? 'pt-0' : 'pt-4'}`}>
          {discounts?.map((discount) => (
            <div
              key={discount.discountId}
              className="mr-2 flex w-fit justify-between gap-8 rounded border border-neutral-400 bg-white px-8 py-4"
            >
              <label className="text-12 leading-[16px] text-secondary-black">{discount.code}</label>
              <button type="button" onClick={() => handleRemove(discount)}>
                <XIcon className="h-16 w-16 text-secondary-black" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountForm;
