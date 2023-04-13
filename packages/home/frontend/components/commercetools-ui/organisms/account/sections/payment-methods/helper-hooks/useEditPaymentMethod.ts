import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from 'components/commercetools-ui/atoms/select';
import { useFormat } from 'helpers/hooks/useFormat';
import { payments } from '..';
import useCardNumberFormatter from './useFormatCredit';
import usePaymentHelpers from './usePaymentHelpers';

const useEditPaymentMethods = (paymentId: string) => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const payment = payments.find((payment) => payment.id === paymentId);
  const cardNumberFormatted = useCardNumberFormatter(payment?.cardNumber ?? '');
  const { hasNumbersAndSpaces } = usePaymentHelpers();
  const [cardHolderError, setCardHolderError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardHolder, setCardHolder] = useState(payment?.cardHolder);
  const [cardNumber, setCardNumber] = useState(cardNumberFormatted);
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
      if (hasNumbersAndSpaces(e.target.value)) {
        setCardNumberError('');
        setCardNumber(e.target.value);
      }
    },
    [setCardNumber, hasNumbersAndSpaces],
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

  const concatCardNumber = useMemo(() => {
    return cardNumber.replaceAll(' ', '');
  }, [cardNumber]);

  const handleSaveClick = () => {
    if (!cardHolder || cardHolder.length === 0) {
      setCardHolderError(
        formatPaymentMessage({ id: 'card.holder.error', defaultMessage: 'Please insert your name on the card' }),
      );
    } else if (concatCardNumber.length < 16) {
      setCardNumberError(
        formatPaymentMessage({ id: 'card.number.error', defaultMessage: 'Please insert all 16 numbers' }),
      );
    } else {
      setCardNumberError('');
      const updatedPaymentIndex = payments.findIndex((payment) => payment.id === paymentId);
      payments[updatedPaymentIndex] = {
        ...payments[updatedPaymentIndex],
        cardHolder: cardHolder ?? '',
        cardNumber: concatCardNumber ?? '',
        cardExpiryMonth: cardExpMonthDate ?? { name: '02', value: '02' },
        cardExpiryYear: cardExpYearDate ?? { name: '69', value: '69' },
      };

      router.push('/account#payment');
    }
  };

  return {
    cardHolderError,
    cardNumberError,
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
