import { useEffect, useMemo, useState } from 'react';
import { Money } from 'shared/types/product/Money';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import mapCosts from 'helpers/utils/mapCosts';
import { useCart } from 'frontastic';
import { CostsProps, CostRef } from '../types';

export type UseCostsData = (props: Pick<CostsProps, 'dataReference' | 'order'>) => {
  costsToRender: CostRef[];
  total: CostRef;
  loading: boolean;
};

const useCostsData: UseCostsData = ({ dataReference = 'cart', order }) => {
  const { transaction } = useCart();
  const { currency } = useI18n();
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });

  const [costsToRender, setCostsToRender] = useState<CostRef[]>([]);
  const [loading, setLoading] = useState(true);

  const skeletonMoney: Money = useMemo(() => {
    return { fractionDigits: 2, centAmount: 999, currencyCode: 'GBP' };
  }, []);

  const skeletonCosts = useMemo(
    () => [
      {
        key: 'subtotal',
        label: formatCartMessage({ id: 'subtotal', defaultMessage: 'Subtotal' }),
        value: skeletonMoney,
      },
      {
        key: 'shipping',
        label: formatCartMessage({ id: 'shipping.estimate', defaultMessage: 'Est. Shipping' }),
        value: skeletonMoney,
      },
      {
        key: 'tax',
        label: formatCartMessage({ id: 'tax', defaultMessage: 'Tax' }),
        value: skeletonMoney,
      },
      {
        key: 'discount',
        label: formatCartMessage({
          id: 'discount',
          defaultMessage: 'Discount',
        }),
        value: skeletonMoney,
      },
    ],
    [formatCartMessage, skeletonMoney],
  ) as CostRef[];

  useEffect(() => {
    const dataIsHydrated =
      (dataReference === 'order' && order) || (dataReference === 'cart' && transaction.total.centAmount > 0);
    if (dataIsHydrated && !costsToRender.length) {
      const costsToUse = dataReference === 'cart' ? transaction : mapCosts({ order, currency });
      console.log('🚀 ~ useEffect ~ order:', order, dataReference);

      const costs = [...skeletonCosts].map(({ key, label }) => {
        return {
          key,
          label,
          value: costsToUse[key],
        };
      }) as CostRef[];

      setCostsToRender(costs);
      setLoading(false);
    }
  }, [costsToRender, currency, dataReference, order, skeletonCosts, transaction]);

  const total: CostRef = {
    key: 'total',
    label: formatCartMessage({ id: 'total', defaultMessage: 'Total' }),
    value: dataReference === 'cart' ? transaction.total : (order?.sum as Money),
  };

  return { loading, costsToRender: costsToRender.length ? costsToRender : skeletonCosts, total };
};

export default useCostsData;
