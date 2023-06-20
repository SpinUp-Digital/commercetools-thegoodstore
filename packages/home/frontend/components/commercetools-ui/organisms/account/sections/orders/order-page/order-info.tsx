import React, { FC } from 'react';
import { Address } from 'shared/types/account';
import { Order } from 'shared/types/cart/Order';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useFormat } from 'helpers/hooks/useFormat';
import OrderSummaryMobile from './order-summary/order-summary-mobile';

export interface Props {
  order: Order;
  shippingInfo: string;
  paymentInfo: string;
  shippingAddress: Address;
  orderState: string;
}

const OrderInfoSection: FC<Props> = ({ order, shippingInfo, paymentInfo, shippingAddress, orderState }) => {
  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-fit w-full rounded-none lg:rounded-md lg:border lg:py-44 2xl:w-[60%] 2xl:px-36">
      <div className="mb-24 block w-full px-16 md:px-24 lg:hidden">
        <div className="h-1 w-full bg-neutral-400 px-24" />
      </div>

      <div className="flex px-16 md:px-24 lg:px-44 2xl:pl-0">
        <Typography fontSize={14} fontFamily="inter" className="whitespace-nowrap text-secondary-black md:text-16">
          {formatOrdersMessage({
            id: 'shipping.method',
            defaultMessage: 'Shipping method:',
          })}
        </Typography>

        <Typography
          fontSize={14}
          medium
          fontFamily="inter"
          className="pl-8 text-primary-black md:pl-20 md:text-16 2xl:whitespace-nowrap 2xl:pl-44"
        >
          {shippingInfo}
        </Typography>
      </div>

      <div className="mt-24 flex px-16 md:px-24 lg:px-44 2xl:pl-0">
        <Typography fontSize={14} fontFamily="inter" className="whitespace-nowrap text-secondary-black md:text-16">
          {formatOrdersMessage({
            id: 'shipping.address',
            defaultMessage: 'Shipping address:',
          })}
        </Typography>

        <div className="pl-8 md:pl-20 2xl:pl-44">
          <Typography fontSize={14} medium fontFamily="inter" className="pb-8 text-primary-black md:text-16">
            {`${shippingAddress.firstName} ${shippingAddress.lastName}`}
          </Typography>
          <Typography fontSize={14} fontFamily="inter" className="text-primary-black md:text-16">
            {`${shippingAddress.streetName}, ${shippingAddress.city}, ${shippingAddress.postalCode}`}
          </Typography>
          {shippingAddress.additionalAddressInfo && (
            <Typography fontSize={14} fontFamily="inter" className="mt-8 text-primary-black md:text-16">
              {shippingAddress.additionalAddressInfo}
            </Typography>
          )}
        </div>
      </div>

      <div className="mt-32 flex px-16 md:px-24 lg:px-44 2xl:pl-0">
        <Typography fontSize={14} fontFamily="inter" className="whitespace-nowrap text-secondary-black md:text-16">
          {formatOrdersMessage({
            id: 'payment.method',
            defaultMessage: 'Payment method:',
          })}
        </Typography>

        <Typography
          fontSize={14}
          medium
          fontFamily="inter"
          className="pl-8 uppercase text-primary-black md:pl-20 md:text-16 2xl:pl-44"
        >
          {paymentInfo}
        </Typography>
      </div>

      <OrderSummaryMobile order={order} />

      <div className="flex flex-col px-16 md:px-24 lg:mt-40 lg:px-44 2xl:px-0">
        <div className="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-1 2xl:gap-y-16">
          <div className="lg:w-full lg:pr-10 2xl:w-[276px] 2xl:pr-0">
            <Button variant="secondary" className="h-fit w-full" onClick={handlePrint}>
              <Typography fontSize={14} align="center" fontFamily="inter" className="md:text-16">
                {formatOrdersMessage({
                  id: 'print.invoice',
                  defaultMessage: 'Print invoice',
                })}
              </Typography>
            </Button>
          </div>

          {orderState === 'Confirmed' && (
            <div className="mt-20 lg:mt-0 lg:w-full lg:pl-10 2xl:w-[276px] 2xl:pl-0">
              <Button variant="secondary" className="h-fit w-full">
                <Typography fontSize={14} align="center" fontFamily="inter" className="md:text-16">
                  {formatOrdersMessage({
                    id: 'request.cancellation',
                    defaultMessage: 'Request cancellation',
                  })}
                </Typography>
              </Button>
            </div>
          )}

          {orderState === 'Complete' && (
            <div className="mt-20 lg:mt-0 lg:w-full lg:pl-10 2xl:w-[276px] 2xl:pl-0">
              <Button variant="secondary" className="h-fit w-full">
                <Typography fontSize={14} align="center" fontFamily="inter" className="md:text-16">
                  {formatOrdersMessage({
                    id: 'create.return',
                    defaultMessage: 'Create return',
                  })}
                </Typography>
              </Button>
            </div>
          )}
        </div>

        <Typography
          fontSize={14}
          fontFamily="inter"
          className="mt-40 w-full text-center text-primary-black md:text-16 lg:text-left 2xl:text-left"
        >
          {formatOrdersMessage({
            id: 'questions',
            defaultMessage: 'Do you have questions about your order?',
          })}
        </Typography>

        <Link link={'#support'} className="mt-16 flex cursor-pointer">
          <Typography
            fontSize={14}
            fontFamily="inter"
            medium
            className="w-full text-center text-primary-black hover:underline md:text-16 lg:text-left 2xl:text-left"
          >
            {formatOrdersMessage({
              id: 'contact.support',
              defaultMessage: 'Contact customer support',
            })}
          </Typography>
        </Link>
      </div>
    </div>
  );
};

export default OrderInfoSection;
