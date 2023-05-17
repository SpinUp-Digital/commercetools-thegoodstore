import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Option } from 'components/commercetools-ui/atoms/select';
import { payments } from '..';
import useCardNumberFormatter from './useFormatCredit';
import usePaymentHelpers from './usePaymentHelpers';

const useAddPaymentMethod = () => {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState('');
  const cardNumberFormatted = useCardNumberFormatter(cardNumber ?? '');
  const { expiryDateMonthOptions, expiryDateYearOptions, hasNumbersAndSpaces } = usePaymentHelpers();
  const [cardExpMonthDate, setCardExpMonthDate] = useState<Option>(expiryDateMonthOptions[1]);
  const [cardExpYearDate, setCardExpYearDate] = useState<Option>(expiryDateYearOptions[1]);

  const concatCardNumber = useMemo(() => {
    return cardNumber.replaceAll(' ', '');
  }, [cardNumber]);

  const isCardNumber = () => concatCardNumber.length >= 12 && concatCardNumber.length <= 19;

  const handleCardNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (hasNumbersAndSpaces(e.target.value)) {
        if (e.target.value.replaceAll(' ', '').length > 19) {
          e.preventDefault();
          setCardNumber(e.target.value.substring(0, e.target.value.length - 1));
        } else {
          setCardNumber(e.target.value);
        }
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

  const handleAddClick = () => {
    if (!isCardNumber()) return;

    payments.push({
      id: Date.now().toString(),
      cardNumber: concatCardNumber ?? '',
      cardExpiryMonth: cardExpMonthDate ?? { name: '', value: '' },
      cardExpiryYear: cardExpYearDate ?? { name: '', value: '' },
    });
    router.push('/account#payment');
  };

  return {
    expiryDateMonthOptions,
    expiryDateYearOptions,
    cardNumber,
    cardNumberFormatted,
    cardExpMonthDate,
    cardExpYearDate,
    isCardNumber,
    handleCardNumberChange,
    handleExpiryMonthDateChange,
    handleExpiryYearDateChange,
    handleAddClick,
  };
};
export default useAddPaymentMethod;
