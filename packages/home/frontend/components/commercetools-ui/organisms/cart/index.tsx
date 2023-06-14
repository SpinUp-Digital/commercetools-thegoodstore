import React, { useCallback, useMemo, useState } from 'react';
import { XMarkIcon as CloseIcon } from '@heroicons/react/24/solid';
import Button from 'components/commercetools-ui/atoms/button';
import Link from 'components/commercetools-ui/atoms/link';
import Modal from 'components/commercetools-ui/atoms/modal';
import CartItem from 'components/commercetools-ui/organisms/cart/cart-item';
import { useFormat } from 'helpers/hooks/useFormat';
import useMediaQuery from 'helpers/hooks/useMediaQuery';
import { tablet } from 'helpers/utils/screensizes';
import { Category } from 'types/category';
import { useAccount, useCart } from 'frontastic';
import Login from '../authentication/login';
import OrderSummary, { PaymentMethod } from '../order-summary';

export interface Props {
  paymentMethods: Array<PaymentMethod>;
  categories: Category[];
  emptyStateDescription?: string;
}

const Cart: React.FC<Props> = ({ categories, paymentMethods, emptyStateDescription }) => {
  const { formatMessage: formatCartMessage } = useFormat({ name: 'cart' });
  const { formatMessage: formatAccountMessage } = useFormat({ name: 'account' });
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  const [isTablet] = useMediaQuery(tablet);

  const { isEmpty, totalItems, data, hasOutOfStockItems } = useCart();

  const { loggedIn } = useAccount();

  const lineItems = useMemo(() => {
    return (data?.lineItems ?? []).filter((lineItem) => lineItem.variant.isOnStock);
  }, [data?.lineItems]);

  const soldoutItems = useMemo(() => {
    return (data?.lineItems ?? []).filter((lineItem) => !lineItem.variant.isOnStock);
  }, [data?.lineItems]);

  const loginLink = '/login?lvp=cart';

  return (
    <div className="relative bg-neutral-200">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-26 lg:px-20 lg:py-48 xl:px-48">
        <div className="bg-white px-16 py-12 md:px-24 md:py-12 lg:w-[70%] lg:rounded-md lg:px-20 lg:py-36 xl:px-48">
          <div className="flex items-center justify-between">
            <h3 className="text-16 md:text-18 lg:text-22">
              {formatCartMessage({ id: 'cart', defaultMessage: 'Cart' })}
              {!isEmpty && ': '}
              {!isEmpty && (
                <span className="text-secondary-black">
                  ({totalItems} {formatCartMessage({ id: 'items', defaultMessage: 'Items' })})
                </span>
              )}
            </h3>
          </div>

          {!isEmpty ? (
            <div className="mt-12 divide-y divide-neutral-400 border-t border-neutral-400 lg:mt-34 lg:border-none">
              {lineItems.map((lineItem) => (
                <div key={lineItem.lineItemId}>
                  <CartItem item={lineItem} classNames={{ moveToWishlist: 'text-14' }} />
                </div>
              ))}

              {soldoutItems.length > 0 && (
                <div className="border-t border-neutral-400 pt-36">
                  <h3 className="text-16 md:text-18 lg:text-22">
                    {formatProductMessage({ id: 'sold.out', defaultMessage: 'Sold out' })}
                  </h3>
                  <div className="mt-52">
                    {soldoutItems.map((lineItem) => (
                      <div key={lineItem.lineItemId}>
                        <CartItem item={lineItem} classNames={{ moveToWishlist: 'text-14' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-28">
              <p>
                {emptyStateDescription ??
                  formatCartMessage({ id: 'cart.empty.ask', defaultMessage: 'Your cart is empty. Continue shopping?' })}
              </p>
              <ul className="mt-48 flex flex-col items-center gap-y-20 pb-8 lg:items-start">
                {categories
                  .filter((category) => category.depth === 0)
                  .map((category) => (
                    <li key={category.name}>
                      <Link link={category.path}>
                        <Button
                          className="w-200 rounded-md border border-primary-black text-16 text-secondary-black"
                          variant="secondary"
                        >
                          {category.name}
                        </Button>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>

        <div className="bg-white pb-12 pt-24 md:py-12 lg:mt-0 lg:w-[30%] lg:rounded-md lg:py-36">
          <div className="px-16 pb-32 md:px-24 lg:px-36">
            <h4 className="hidden text-18 lg:block">
              {formatCartMessage({ id: 'order.summary', defaultMessage: 'Order Summary' })}
            </h4>
            {!loggedIn && (
              <>
                <p className="mt-18 border-t border-neutral-400 pt-16 text-14 leading-[20px] text-secondary-black md:text-16 lg:border-none">
                  {formatCartMessage({
                    id: 'order.summary.login',
                    defaultMessage: 'Log in to use your personal offers!',
                  })}
                </p>
                <button
                  className="mt-18 w-full rounded-md border border-primary-black px-24 py-6 text-14 font-medium transition hover:border-secondary-black hover:text-secondary-black md:px-36 md:text-16"
                  onClick={openLoginModal}
                >
                  {formatAccountMessage({ id: 'sign.in', defaultMessage: ' Login in' })}
                </button>
              </>
            )}
          </div>
          <div className="px-16 md:px-24 lg:px-36">
            <OrderSummary
              classNames={{
                applyDiscountButton: 'py-14 text-16',
                infoContainer: 'pt-16 pb-18 text-16',
                totalAmountContainer: 'text-18',
              }}
              hideCheckoutButton={!isTablet}
              paymentMethods={paymentMethods}
              button={{
                text: formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' }),
                link: '/checkout',
                disabled: isEmpty || hasOutOfStockItems,
              }}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 w-full border-t border-neutral-400 bg-white p-16 md:hidden">
        <Link link="/checkout">
          <button
            disabled={isEmpty || hasOutOfStockItems}
            className="w-full rounded-md bg-primary-black py-12 font-medium text-white transition hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            {formatCartMessage({ id: 'checkout.go', defaultMessage: 'Go to checkout' })}
          </button>
        </Link>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        className="relative w-[90%] rounded-md bg-white"
        style={{ content: { maxWidth: '600px' } }}
        closeTimeoutMS={200}
      >
        <CloseIcon
          className="absolute right-20 top-20 h-24 w-24 cursor-pointer text-secondary-black"
          onClick={closeLoginModal}
        />
        <div className="p-1 pb-48 pt-72">
          <Login onLogin={closeLoginModal} signInLink={{ type: 'link', link: loginLink }} />
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
