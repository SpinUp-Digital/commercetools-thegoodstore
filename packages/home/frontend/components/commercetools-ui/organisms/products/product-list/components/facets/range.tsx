import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRange } from 'react-instantsearch-hooks-web';
import Checkbox from 'components/commercetools-ui/atoms/checkbox';
import { useFormat } from 'helpers/hooks/useFormat';
import useI18n from 'helpers/hooks/useI18n';
import { FacetProps } from './types';

const RangeFacet: React.FC<FacetProps> = ({ attribute, pricesConfiguration }) => {
  const { formatMessage: formatProductMessage } = useFormat({ name: 'product' });

  const { range, refine, start } = useRange({ attribute, min: 0 });

  const { currencySymbol } = useI18n();

  const configuration = useMemo(() => pricesConfiguration[attribute], [pricesConfiguration, attribute]);

  const [appliedOptions, setAppliedOptions] = useState<Array<number>>([]);

  const appliedRanges = useMemo(() => appliedOptions.map((index) => configuration.ranges[index]), [appliedOptions]);

  const [customPriceRange, setCustomPriceRange] = useState({
    min: start ? start[0] / 100 : -1,
    max: start ? start[1] / 100 : -1,
    applied: false,
  });

  const handleRangeOptionChange = useCallback(
    (index: number, checked: boolean) => {
      if (checked) setAppliedOptions([...appliedOptions, index]);
      else setAppliedOptions(appliedOptions.filter((option) => option !== index));

      setCustomPriceRange({ min: -1, max: -1, applied: false });
    },
    [appliedOptions],
  );

  const handleRangeInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomPriceRange({ ...customPriceRange, [e.target.name]: e.target.value, applied: false });
    },
    [customPriceRange],
  );

  const handleCustomRangeSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      setAppliedOptions([]);
      setCustomPriceRange({ ...customPriceRange, applied: true });
    },
    [customPriceRange],
  );

  const rangeOptions = useMemo(() => {
    if (!configuration) return <></>;

    return configuration.ranges.map(({ min, max, refinements }, index) => (
      <div key={index} className="flex items-center justify-between gap-8">
        <div>
          {min}
          {currencySymbol} - {max}
          {currencySymbol}
        </div>
        <div className="flex items-center gap-12">
          <span className="text-14 text-secondary-black">{refinements}</span>
          <div className="w-fit rounded-sm border border-neutral-500 transition hover:border-secondary-black">
            <Checkbox
              checked={appliedOptions.includes(index)}
              className="border-none opacity-30"
              onChange={(e) => handleRangeOptionChange(index, e.target.checked)}
              placeholder={formatProductMessage({ id: 'max', defaultMessage: 'Max' })}
            />
          </div>
        </div>
      </div>
    ));
  }, [configuration, handleRangeOptionChange]);

  const currentRange = useMemo(() => {
    if (appliedRanges.length > 0)
      return appliedRanges.reduce(
        (acc, { min, max }) => ({ min: Math.min(min, acc.min), max: Math.max(max, acc.max) }),
        { min: Infinity, max: 0 },
      );

    if (customPriceRange.applied) return { min: customPriceRange.min, max: customPriceRange.max };

    if (start) return { min: start[0] / 100, max: start[1] / 100 };

    return { min: 0, max: Infinity };
  }, [appliedRanges, customPriceRange, start, range]);

  useEffect(() => {
    refine([currentRange.min * 100, currentRange.max * 100]);
  }, [currentRange]);

  return (
    <div>
      <div className="flex flex-col gap-44">{rangeOptions}</div>
      <div className="mt-48">
        <p className="text-16 font-medium">
          {formatProductMessage({ id: 'price.range.custom', defaultMessage: 'Custom price range' })}
        </p>
      </div>
      <form className="mt-36 flex items-center gap-16" onSubmit={handleCustomRangeSubmit}>
        <label
          htmlFor="min"
          className="flex w-[85px] items-center gap-4 border border-neutral-500 p-8"
          aria-label="min"
        >
          <input
            id="min"
            name="min"
            className="w-full outline-none"
            value={customPriceRange.min !== -1 ? customPriceRange.min.toString() : ''}
            placeholder={formatProductMessage({ id: 'min', defaultMessage: 'Min' })}
            onChange={handleRangeInputChange}
          />
          <span>{currencySymbol}</span>
        </label>

        <div className="w-16 border border-secondary-black" />

        <label
          htmlFor="max"
          className="flex w-[85px] items-center gap-4 border border-neutral-500 p-8"
          aria-label="max"
        >
          <input
            id="max"
            name="max"
            className="w-full outline-none"
            value={customPriceRange.max !== -1 ? customPriceRange.max.toString() : ''}
            placeholder={formatProductMessage({ id: 'max', defaultMessage: 'Max' })}
            onChange={handleRangeInputChange}
          />
          <span>{currencySymbol}</span>
        </label>

        <button
          type="submit"
          className="rounded-sm bg-primary-black py-8 px-14 font-medium leading-[24px] text-white transition hover:bg-gray-500"
        >
          {formatProductMessage({ id: 'go', defaultMessage: 'GO' })}
        </button>
      </form>
    </div>
  );
};

export default RangeFacet;
