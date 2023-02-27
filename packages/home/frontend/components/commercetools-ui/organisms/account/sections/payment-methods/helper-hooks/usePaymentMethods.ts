import { useCallback, useMemo, useState } from 'react';
import { Option } from 'components/commercetools-ui/atoms/select';

const usePaymentMethods = () => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [cardExpDate, setCardExpDate] = useState<Option | undefined>(undefined);

  const expiryDateOptions = useMemo(() => {
    const now = new Date();

    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    const options = [{ name: 'MM/YY', value: 'MM/YY' }] as Option[];

    while (year < now.getFullYear() + 10) {
      options.push({
        name: `${month} / ${year.toString().slice(2)}`,
        value: `${month} / ${year}`,
      });

      if (month == 12) (month = 1), (year += 1);
      else month += 1;
    }

    return options;
  }, []);

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

  return {
    expiryDateOptions,
    cardHolder,
    cardNumber,
    cardExpDate,
    cardCVC,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryDateChange,
    handleCVCChange,
  };
};
export default usePaymentMethods;
