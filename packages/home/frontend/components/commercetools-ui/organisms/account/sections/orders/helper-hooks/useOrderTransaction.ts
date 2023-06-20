import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Order } from 'shared/types/cart/Order';
import { Money } from 'shared/types/product/Money';
import { CurrencyHelpers } from 'helpers/currencyHelpers';
import useI18n from 'helpers/hooks/useI18n';

const useOrderTransactions = (order?: Order) => {
  const { locale } = useRouter();

  const hiddenItemsCount = (order?.lineItems?.length ?? 0) - 3;

  const { currency } = useI18n();

  const subtotal = useMemo(() => {
    const subTotalAmount = order?.lineItems?.reduce(
      (acc, curr) => acc + (curr.price?.centAmount || 0) * (curr.count as number),
      0,
    );
    return CurrencyHelpers.formatForCurrency(
      { centAmount: subTotalAmount, fractionDigits: 2, currencyCode: currency } as Money,
      locale,
    );
  }, [order, currency, locale]);

  const shipmentFees = useMemo(() => {
    return CurrencyHelpers.formatForCurrency(
      { centAmount: order?.shippingInfo?.price?.centAmount, fractionDigits: 2, currencyCode: currency } as Money,
      locale,
    );
  }, [order, currency, locale]);

  const totalTax = useMemo(() => {
    return CurrencyHelpers.formatForCurrency(
      { centAmount: order?.taxed?.amount.centAmount, fractionDigits: 2, currencyCode: currency } as Money,
      locale,
    );
  }, [order, currency, locale]);

  const total = useMemo(() => {
    const subTotalAmount =
      order?.lineItems?.reduce((acc, curr) => acc + (curr.price?.centAmount || 0) * (curr.count as number), 0) ?? 0;
    const totalTaxed = order?.taxed?.amount.centAmount ?? 0;

    const shippingCosts = order?.shippingInfo?.price?.centAmount ?? 0;

    const sum = subTotalAmount + shippingCosts + totalTaxed;

    return CurrencyHelpers.formatForCurrency(
      { centAmount: sum, fractionDigits: 2, currencyCode: currency } as Money,
      locale,
    );
  }, [order, currency, locale]);

  return {
    hiddenItemsCount,
    subtotal,
    shipmentFees,
    totalTax,
    total,
  };
};
export default useOrderTransactions;
