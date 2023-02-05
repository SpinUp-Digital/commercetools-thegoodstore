import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useCart } from 'frontastic';
import Footer from './components/footer';
import Header, { Props as HeaderProps } from './components/header';
import Secure from './components/secure';
import Steps from './components/steps';
import Summary from './components/summary';
import CheckoutProvider from './provider';

export type Props = HeaderProps;

const Checkout: React.FC<HeaderProps> = ({ logo }) => {
  const router = useRouter();

  const { orderCart } = useCart();

  const [isFinalStep, setIsFinalStep] = useState(false);

  const purchase = useCallback(async () => {
    await orderCart();

    router.push('/thank-you');
  }, [orderCart, router]);

  return (
    <CheckoutProvider>
      <div className="min-h-screen lg:bg-neutral-200">
        <Header logo={logo} />
        <div className="lg:mx-auto lg:max-w-[1200px]">
          <Secure />
          <div className="flex-row-reverse items-start gap-24 lg:flex">
            <Summary onPurchase={purchase} isFinalStep={isFinalStep} />
            <Steps onPurchase={purchase} onFinalStepChange={setIsFinalStep} />
          </div>
        </div>
        <Footer />
      </div>
    </CheckoutProvider>
  );
};

export default Checkout;
