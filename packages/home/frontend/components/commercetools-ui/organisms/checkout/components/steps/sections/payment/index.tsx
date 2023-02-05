import React, { useCallback } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import { useFormat } from 'helpers/hooks/useFormat';

interface Props {
  goToNextStep: () => void;
}

const Payment: React.FC<Props> = ({ goToNextStep }) => {
  const { formatMessage: formatCheckoutMessage } = useFormat({ name: 'checkout' });

  const submit = useCallback(() => {
    goToNextStep();
  }, [goToNextStep]);

  return (
    <div className="lg:px-36 lg:pt-0 lg:pb-36">
      <div className="mt-24">
        <Button variant="primary" className="w-full min-w-[200px] lg:w-fit lg:px-36" type="submit" onClick={submit}>
          {formatCheckoutMessage({ id: 'review.order', defaultMessage: 'Review order' })}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
