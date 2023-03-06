import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from 'components/commercetools-ui/atoms/select';
import { payments } from '..';

const useEditPaymentMethods = (paymentId: string) => {
  const router = useRouter();
  const payment = payments.find((payment) => payment.id === paymentId);
  const [cardHolder, setCardHolder] = useState(payment?.cardHolder);
  const [cardNumber, setCardNumber] = useState(payment?.cardNumber);
  const [cardCVC, setCardCVC] = useState(payment?.cardCVC);
  const [cardExpDate, setCardExpDate] = useState<Option | undefined>(payment?.cardExpiry);

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

  const handleExpiryDateChange = useCallback(
    (option: Option) => {
      setCardExpDate(option);
    },
    [setCardExpDate],
  );

  const handleCVCChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardCVC(e.target.value);
    },
    [setCardCVC],
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
      cardExpiry: cardExpDate ?? { name: '02/69', value: '02/69' },
      cardCVC: cardCVC ?? '',
    };

    router.push('/account#payment');
  };

  return {
    cardHolder,
    cardNumber,
    cardExpDate,
    cardCVC,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCVCChange,
    handleDeleteClick,
    handleSaveClick,
  };
};
export default useEditPaymentMethods;
