import { FC, useEffect, useState } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import { Account } from 'types/account';
import { Order } from 'types/order';
import useOrderInfoData from '../hooks/useOrderInfoData';

type ThankYouOrderInfoProps = {
  firstName?: Account['firstName'];
  order: Order;
};

type OrderInfoType = Array<{ label: string; value: string; subValue?: string }>;
const skeletonPlaceholder: OrderInfoType = [
  { label: 'Order number', value: '3737 3737 73737' },
  { label: 'Delivery by', value: 'Express' },
  {
    label: 'Delivery to',
    value: 'Guest User',
    subValue: 'street, city, 11 111',
  },
  { label: 'Payment by', value: 'VISA **111' },
];

const ThankYouOrderInfo: FC<ThankYouOrderInfoProps> = ({ firstName, order }) => {
  const { formatMessage } = useFormat({ name: 'thank-you' });
  const [orderInfo, setOrderInfo] = useState<OrderInfoType>(skeletonPlaceholder);
  const [loading, setLoading] = useState(true);

  const { orderNumber, deliveryMethod, shippingAddress, paymentInfo } = useOrderInfoData(order);

  useEffect(() => {
    if (orderNumber && deliveryMethod && shippingAddress) {
      setOrderInfo([
        { label: formatMessage({ id: 'order.number', defaultMessage: 'Order number' }), value: orderNumber },
        { label: formatMessage({ id: 'delivery.by', defaultMessage: 'Delivery by' }), value: deliveryMethod },
        {
          label: formatMessage({ id: 'delivery.to', defaultMessage: 'Delivery to' }),
          value: firstName ?? '',
          subValue: shippingAddress,
        },
        { label: formatMessage({ id: 'payment.by', defaultMessage: 'Payment by' }), value: paymentInfo },
      ]);

      setLoading(false);
    }
  }, [firstName, deliveryMethod, orderNumber, shippingAddress, paymentInfo, formatMessage]);

  return (
    <div className="grid gap-16 border-b border-neutral-400 py-24 md:gap-24 lg:py-36">
      {orderInfo.map(({ label, value, subValue }, index) => (
        <div key={index}>
          <div className="flex flex-wrap gap-5 md:gap-0">
            <div className="md:w-136">
              <Typography
                className="w-fit text-secondary-black md:text-16"
                fontSize={14}
                lineHeight="loose"
                asSkeleton={loading}
              >
                {label + ':'}
              </Typography>
            </div>
            <Typography
              className="text-primary-black md:text-16"
              fontSize={14}
              lineHeight="loose"
              medium
              asSkeleton={loading}
            >
              {value}
            </Typography>
          </div>
          {subValue && (
            <Typography
              className="mt-4 w-fit text-primary-black md:ml-136 md:text-16"
              fontSize={14}
              lineHeight="loose"
              asSkeleton={loading}
            >
              {subValue}
            </Typography>
          )}
        </div>
      ))}
    </div>
  );
};

export default ThankYouOrderInfo;
