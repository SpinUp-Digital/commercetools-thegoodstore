import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from 'components/commercetools-ui/atoms/select';
import { payments } from '..';

const useEditPaymentMethods = (paymentId: string) => {
  const router = useRouter();
  const payment = payments.find((payment) => payment.id === paymentId);
  const [cardHolder, setCardHolder] = useState(payment?.cardHolder);
  const [cardNumber, setCardNumber] = useState(payment?.cardNumber);
  const [cardExpMonthDate, setCardExpMonthDate] = useState<Option | undefined>(payment?.cardExpiryMonth);
  const [cardExpYearDate, setCardExpYearDate] = useState<Option | undefined>(payment?.cardExpiryYear);

  const handleCardHolderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardHolder(e.target.value);
    },
    [setCardHolder],
  );

  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardNumber(e.target.value);
    },
    [setCardNumber],
  );

  const handleExpiryDateMonthChange = useCallback(
    (option: Option) => {
      setCardExpMonthDate(option);
    },
    [setCardExpMonthDate],
  );

  const handleExpiryDateYearChange = useCallback(
    (option: Option) => {
      setCardExpYearDate(option);
    },
    [setCardExpYearDate],
  );

  const handleDeleteClick = () => {
    router.push('/account#payment');
    payments.splice(
      payments.findIndex((payment) => payment.id === paymentId),
      1,
    );
  };

  const handleSaveClick = () => {
    payments[payments.findIndex((payment) => payment.id === paymentId)] = {
      ...payments[payments.findIndex((payment) => payment.id === paymentId)],
      cardHolder: cardHolder ?? '',
      cardNumber: cardNumber ?? '',
      cardExpiryMonth: cardExpMonthDate ?? { name: '02', value: '02' },
      cardExpiryYear: cardExpYearDate ?? { name: '69', value: '69' },
    };

    router.push('/account#payment');
  };

  return {
    cardHolder,
    cardNumber,
    cardExpMonthDate,
    cardExpYearDate,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryDateMonthChange,
    handleExpiryDateYearChange,
    handleDeleteClick,
    handleSaveClick,
  };
};
export default useEditPaymentMethods;
