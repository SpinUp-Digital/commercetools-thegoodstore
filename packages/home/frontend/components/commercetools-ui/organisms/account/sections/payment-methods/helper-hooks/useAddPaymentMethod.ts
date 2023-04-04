import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from 'components/commercetools-ui/atoms/select';
import { useFormat } from 'helpers/hooks/useFormat';
import { payments } from '..';
import useCardNumberFormatter from './useFormatCredit';
import usePaymentHelpers from './usePaymentHelpers';

const useAddPaymentMethod = () => {
  const router = useRouter();
  const { formatMessage: formatPaymentMessage } = useFormat({ name: 'payment' });
  const [error, setError] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const cardNumberFormatted = useCardNumberFormatter(cardNumber ?? '');

  const { expiryDateMonthOptions, expiryDateYearOptions, hasNumbersAndSpaces } = usePaymentHelpers();

  const [cardExpMonthDate, setCardExpMonthDate] = useState<Option>(expiryDateMonthOptions[1]);
  const [cardExpYearDate, setCardExpYearDate] = useState<Option>(expiryDateYearOptions[1]);

  const handleCardHolderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardHolder(e.target.value);
    },
    [setCardHolder],
  );

  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (hasNumbersAndSpaces(e.target.value)) {
        setError('');
        setCardNumber(e.target.value);
      }
    },
    [setCardNumber, hasNumbersAndSpaces],
  );

  const handleExpiryMonthDateChange = useCallback(
    (option: Option) => {
      setCardExpMonthDate(option);
    },
    [setCardExpMonthDate],
  );

  const handleExpiryYearDateChange = useCallback(
    (option: Option) => {
      setCardExpYearDate(option);
    },
    [setCardExpYearDate],
  );

  const concatCardNumber = useMemo(() => {
    return cardNumber.replaceAll(' ', '');
  }, [cardNumber]);

  const handleAddClick = () => {
    if (concatCardNumber && concatCardNumber.length < 16) {
      setError(formatPaymentMessage({ id: 'card.number.error', defaultMessage: 'Please insert all 16 numbers' }));
    } else {
      setError('');
      payments.push({
        id: (payments.length + 1).toString(),
        cardHolder: cardHolder ?? '',
        cardNumber: concatCardNumber ?? '',
        cardExpiryMonth: cardExpMonthDate ?? { name: '', value: '' },
        cardExpiryYear: cardExpYearDate ?? { name: '', value: '' },
      });
      router.push('/account#payment');
    }
  };

  return {
    error,
    expiryDateMonthOptions,
    expiryDateYearOptions,
    cardHolder,
    cardNumber,
    cardNumberFormatted,
    cardExpMonthDate,
    cardExpYearDate,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryMonthDateChange,
    handleExpiryYearDateChange,
    handleAddClick,
  };
};
export default useAddPaymentMethod;
