import React, { useRef, useEffect, useLayoutEffect, useMemo, useState, useCallback } from 'react';
import { Order } from '@commercetools/frontend-domain-types/cart/Order';
import Skeleton from 'react-loading-skeleton';
import Slider from 'components/commercetools-ui/atoms/slider';
import Typography from 'components/commercetools-ui/atoms/typography';
import Wrapper from 'components/HOC/wrapper';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import useOrderFetch from './helper-hooks/useOrderFetch';
import OrderItem from './OrderItem';

export interface StatusTab {
  name: string;
  slug: string;
}

const Orders = () => {
  const { orders, loading } = useOrderFetch();
  const ref = useRef<HTMLDivElement>(null);
  const [isLargeMobileScreen] = useMediaQuery(325);
  const { formatMessage: formatOrdersMessage } = useFormat({ name: 'orders' });
  const [overflow, setOverflow] = useState<boolean | undefined>(undefined);

  const statusTabs: StatusTab[] = [
    { name: formatOrdersMessage({ id: 'all.orders', defaultMessage: 'All orders' }), slug: 'allOrders' },
    { name: formatOrdersMessage({ id: 'Open', defaultMessage: 'Registered' }), slug: 'Open' },
    { name: formatOrdersMessage({ id: 'Complete', defaultMessage: 'Delivered' }), slug: 'Complete' },
    { name: formatOrdersMessage({ id: 'Cancelled', defaultMessage: 'Returned' }), slug: 'Cancelled' },
  ];
  const [selectedTab, setSelectedTab] = useState(statusTabs[0].slug);
  const [leftArrowAppear, setLeftArrowAppear] = useState<boolean | undefined>(undefined);
  const [rightArrowAppear, setRightArrowAppear] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (overflow || !isLargeMobileScreen) {
      setRightArrowAppear(true);
    }
  }, [leftArrowAppear, rightArrowAppear, isLargeMobileScreen, overflow]);

  const orderHistoryContent = useMemo(() => {
    if (selectedTab === 'allOrders') return orders;
    else return orders?.filter((order: Order) => order.orderState === selectedTab);
  }, [selectedTab, orders]);

  const tabTextClassNames = (tab: StatusTab) => {
    return `border-primary-black pb-12 ${
      tab.slug === selectedTab ? 'border-b-[1.5px] text-primary-black' : 'text-secondary-black'
    }`;
  };

  const mobileStatusWrapper = useClassNames([
    'h-fit w-full',
    leftArrowAppear === true && 'pl-36',
    rightArrowAppear === true && 'pr-36',
    !overflow ? 'flex justify-center pl-16 pr-16' : '',
  ]);

  const swiperReachBeginning = useCallback(() => {
    !overflow ? setRightArrowAppear(false) : setRightArrowAppear(true);
    setLeftArrowAppear(false);
  }, [overflow]);

  const swiperReachEnd = useCallback(() => {
    !overflow ? setLeftArrowAppear(false) : setLeftArrowAppear(true);
    setRightArrowAppear(false);
  }, [overflow]);

  useLayoutEffect(() => {
    if (ref?.current && ref.current.clientWidth < ref?.current.scrollWidth) setOverflow(true);
  }, [ref]);

  return (
    <>
      {loading ? (
        <Skeleton className="h-[30px]" />
      ) : (
        <>
          <div className="hidden px-24 pb-12 md:block lg:px-0">
            <Typography as="h2" fontFamily="libre" className="text-22 text-primary-black lg:text-24">
              {formatOrdersMessage({
                id: 'orders',
                defaultMessage: 'Orders',
              })}
            </Typography>
          </div>
          <div className="px-16 pt-12 pb-16 md:px-24 lg:px-0">
            <Typography as="h3" fontSize={14} fontFamily="inter" className="text-secondary-black md:text-16">
              {formatOrdersMessage({
                id: 'help.question',
                defaultMessage: 'Check status of recent orders, manage your returns and download invoices.',
              })}
            </Typography>
          </div>

          <Wrapper className="h-56 w-full border-b-2 border-neutral-400 pt-12 md:hidden">
            <div className={mobileStatusWrapper} ref={ref}>
              <Slider
                onReachEnd={swiperReachEnd}
                onReachBeginning={swiperReachBeginning}
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
                arrows={overflow}
                spaceBetween={20}
              >
                {statusTabs.map((tab) => (
                  <div
                    key={tab.slug}
                    onClick={() => setSelectedTab(tab.slug)}
                    className="w-fit cursor-pointer whitespace-nowrap"
                  >
                    <Typography fontSize={14} medium={tab.slug === selectedTab} className={tabTextClassNames(tab)}>
                      {tab.name}
                    </Typography>
                  </div>
                ))}
              </Slider>
            </div>
          </Wrapper>

          <div className="px-16 md:px-24 lg:px-0">
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

          <div className=" overflow-auto py-24 px-16 md:px-24 lg:px-0">
            {orderHistoryContent?.map((order?: Order) => (
              <OrderItem key={order?.orderId} order={order} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
