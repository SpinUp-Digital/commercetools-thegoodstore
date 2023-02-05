import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Slider from 'components/commercetools-ui/atoms/slider';
import Typography from 'components/commercetools-ui/atoms/typography';
import Wrapper from 'components/HOC/wrapper';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import OrderItem from './OrderItem';

export interface StatusTab {
  name: string;
  slug: string;
}

const Orders = () => {
  const router = useRouter();

  const orders = useMemo(
    () => [
      {
        id: '334455 6639',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'registered',
      },
      {
        id: '334455 6640',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'registered',
      },
      {
        id: '334455 6641',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'delivered',
      },
      {
        id: '334455 6642',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'delivered',
      },
      {
        id: '334455 6643',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'delivered',
      },
      {
        id: '334455 6644',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 10033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'delivered',
      },
      {
        id: '334455 6645',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 30033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'returned',
      },
      {
        id: '334455 6646',
        date: '2022-03-12',
        total: { fractionDigits: 2, centAmount: 50033, currencyCode: router.locale === 'de' ? 'EUR' : 'GBP' },
        status: 'returned',
      },
    ],
    [router.locale],
  );

  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });

  const statusTabs: StatusTab[] = [
    { name: formatOrdersMessage({ id: 'all.orders', defaultMessage: 'All orders' }), slug: 'allOrders' },
    { name: formatOrdersMessage({ id: 'registered', defaultMessage: 'Registered' }), slug: 'registered' },
    { name: formatOrdersMessage({ id: 'delivered', defaultMessage: 'Delivered' }), slug: 'delivered' },
    { name: formatOrdersMessage({ id: 'returned', defaultMessage: 'Returned' }), slug: 'returned' },
  ];
  const [selectedTab, setSelectedTab] = useState(statusTabs[0].slug);
  const [leftArrowAppear, setLeftArrowAppear] = useState(false);
  const [rightArrowAppear, setRightArrowAppear] = useState(true);

  const orderHistoryContent = useMemo(() => {
    if (selectedTab === 'allOrders') return orders;
    else return orders.filter((order) => order.status === selectedTab);
  }, [selectedTab, orders]);

  const tabTextClassNames = (tab: StatusTab) => {
    return `border-primary-black pb-12 ${
      tab.slug === selectedTab ? 'border-b-[1.5px] text-primary-black' : 'text-secondary-black'
    }`;
  };

  const mobileStatusWrapper = useClassNames([
    'h-fit w-[100%]',
    leftArrowAppear ? 'pl-36' : 'pl-16',
    rightArrowAppear ? 'pr-36' : 'pr-16',
  ]);

  return (
    <>
      <div className="hidden pb-12 md:block">
        <Typography as="h2" fontFamily="libre" className="text-22 text-primary-black lg:text-24">
          {formatOrdersMessage({
            id: 'orders',
            defaultMessage: 'Orders',
          })}
        </Typography>
      </div>
      <div className="px-16 pt-12 pb-16 md:px-0">
        <Typography as="h3" fontSize={14} fontFamily="inter" className="text-secondary-black md:text-16">
          {formatOrdersMessage({
            id: 'help.question',
            defaultMessage: 'Check status of recent orders, manage your returns and download invoices.',
          })}
        </Typography>
      </div>

      <Wrapper className="h-56 w-full border-b-2 border-neutral-400 pt-12 md:hidden">
        <div className={mobileStatusWrapper}>
          <Slider
            onReachEnd={() => {
              setLeftArrowAppear(true);
              setRightArrowAppear(false);
            }}
            onReachBeginning={() => {
              setLeftArrowAppear(false);
              setRightArrowAppear(true);
            }}
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
                  fontSize={14}
                  medium={tab.slug === selectedTab}
                  className={`border-primary-black py-12 ${
                    tab.slug === selectedTab ? 'border-b-2 text-primary-black' : 'text-secondary-black'
                  }`}
                >
                  {tab.name}
                </Typography>
              </div>
            ))}
          </Slider>
        </div>
      </Wrapper>

      <div className="px-16 md:px-0">
        <div className="relative hidden h-57 w-full border-b-[1.5px] border-neutral-400 pt-24 md:flex">
          <div className="absolute flex h-fit w-[40%] justify-between">
            {statusTabs.map((tab) => (
              <div
                key={tab.slug}
                onClick={() => setSelectedTab(tab.slug)}
                className="cursor-pointer whitespace-nowrap pr-36"
              >
                <Typography fontSize={16} medium={tab.slug === selectedTab} className={tabTextClassNames(tab)}>
                  {tab.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" overflow-auto py-24 px-16 md:px-0">
        {orderHistoryContent.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </>
  );
};

export default Orders;
