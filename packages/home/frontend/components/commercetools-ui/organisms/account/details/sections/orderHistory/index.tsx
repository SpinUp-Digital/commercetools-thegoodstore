import React, { useMemo, useState } from 'react';
import Slider from 'components/commercetools-ui/atoms/slider';
import Typography from 'components/commercetools-ui/atoms/typography';
import Wrapper from 'components/commercetools-ui/organisms/content/wrapper';
import { useFormat } from 'helpers/hooks/useFormat';
import OrderItem from './OrderItem';

export const orders = [
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'registered',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'registered',
  },

  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'delivered',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'delivered',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'delivered',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'delivered',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'returned',
  },
  {
    id: '334455 6644',
    date: '2022-03-12',
    total: '145, 90 E',
    status: 'returned',
  },
];

const Orders = () => {
  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const statusTabs = [
    { name: formatOrdersMessage({ id: 'all.orders', defaultMessage: 'All orders' }), slug: 'allOrders' },
    { name: formatOrdersMessage({ id: 'registered', defaultMessage: 'Registered' }), slug: 'registered' },
    { name: formatOrdersMessage({ id: 'delivered', defaultMessage: 'Delivered' }), slug: 'delivered' },
    { name: formatOrdersMessage({ id: 'returned', defaultMessage: 'Returned' }), slug: 'returned' },
  ];
  const [selectedTab, setSelectedTab] = useState(statusTabs[0].slug);

  const orderHistoryContent = useMemo(() => {
    if (selectedTab === 'allOrders') return orders;
    else return orders.filter((order) => order.status === selectedTab);
  }, [selectedTab]);

  return (
    <>
      <div className="pt-12 pb-16">
        <Typography as="h3" fontSize={16} fontFamily="inter" className="text-primary-black">
          {formatOrdersMessage({
            id: 'help.question',
            defaultMessage: 'Check status of recent orders, manage your returns and download invoices.',
          })}
        </Typography>
      </div>

      <Wrapper className="flex border-b-[1.5px] border-neutral-400 pt-12 md:hidden">
        <div className="mx-auto h-fit w-[85%]">
          <Slider
            slideWidthIsFlexible
            dots={false}
            prevButtonStyles={{
              left: '-20px',
              transform: 'translateY(-50%) rotateZ(135deg) scale(0.55)',
              borderWidth: '0 3px 3px 0',
            }}
            nextButtonStyles={{
              right: '-20px',
              transform: ' translateY(-50%) rotateZ(-45deg) scale(0.55)',
              borderWidth: '0 3px 3px 0',
            }}
            allowTouchMove
            allowArrowsOnTouchDevice
            arrows
            spaceBetween={20}
          >
            {statusTabs.map((tab) => (
              <div
                key={tab.slug}
                onClick={() => setSelectedTab(tab.slug)}
                className="w-fit cursor-pointer whitespace-nowrap"
              >
                <Typography
                  fontSize={16}
                  medium={tab.slug === selectedTab}
                  className={`border-primary-black py-12 ${
                    tab.slug === selectedTab ? 'border-b-[1.5px] text-primary-black' : 'text-secondary-black'
                  }`}
                >
                  {tab.name}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
      </Wrapper>

      <div className="hidden w-full border-b-[1.5px] border-neutral-400 pt-12 md:flex">
        {statusTabs.map((tab) => (
          <div
            key={tab.slug}
            onClick={() => setSelectedTab(tab.slug)}
            className="w-fit cursor-pointer whitespace-nowrap pr-36"
          >
            <Typography
              fontSize={16}
              medium={tab.slug === selectedTab}
              className={`border-primary-black py-12 ${
                tab.slug === selectedTab ? 'border-b-[1.5px] text-primary-black' : 'text-secondary-black'
              }`}
            >
              {tab.name}
            </Typography>
          </div>
        ))}
      </div>

      <div className="h-[75%] overflow-auto py-24">
        {orderHistoryContent.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
