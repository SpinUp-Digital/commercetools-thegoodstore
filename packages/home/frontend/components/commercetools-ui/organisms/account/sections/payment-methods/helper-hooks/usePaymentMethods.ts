import { useCallback, useMemo, useState } from 'react';
import { Option } from 'components/commercetools-ui/atoms/select';

const usePaymentMethods = () => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const expiryDateMonthOptions = useMemo(() => {
    const now = new Date();

    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    const options = [{ name: 'MM', value: 'MM' }] as Option[];

    while (year < now.getFullYear() + 1) {
      options.push({
        name: `${month}`,
        value: `${month}`,
      });

      if (month == 12) (month = 1), (year += 1);
      else month += 1;
    }

    return options;
  }, []);

  const expiryDateYearOptions = useMemo(() => {
    const now = new Date();
    let year = now.getFullYear();

    const options = [{ name: 'YY', value: 'YY' }] as Option[];

    while (year < now.getFullYear() + 10) {
      options.push({
        name: `${year.toString().slice(2)}`,
        value: `${year}`,
      });

      year += 1;
    }

    return options;
  }, []);

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
      setCardNumber(e.target.value);
    },
    [setCardNumber],
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

  return {
    expiryDateMonthOptions,
    expiryDateYearOptions,
    cardHolder,
    cardNumber,
    cardExpMonthDate,
    cardExpYearDate,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryMonthDateChange,
    handleExpiryYearDateChange,
  };
};
export default usePaymentMethods;
