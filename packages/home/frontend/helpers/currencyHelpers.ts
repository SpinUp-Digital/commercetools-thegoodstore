import { Money } from '@commercetools/domain-types/product/Money';
import { Log } from './errorLogger';
import { StringHelpers } from './stringHelpers';

export class CurrencyHelpers {
  private static formatNumberForCurrency = function (costInCents: number, locale?: string) {
    return CurrencyHelpers.formatMoneyCurrency(
      {
        centAmount: costInCents,
        currencyCode: 'EUR',
        fractionDigits: 2,
      },
      locale,
    );
  };

  private static formatStringForCurrency = function (costInCents: string, locale?: string) {
    if (!StringHelpers.isNumeric(costInCents)) {
      Log.error(`Value (${costInCents}) passed for currency formatting cannot be parsed to a number`);
      return '';
    }
    return CurrencyHelpers.formatNumberForCurrency(parseInt(costInCents, 10), locale);
  };

  private static getLocaleFromShorthenedLocale = function (locale: string) {
    return (
      {
        en: 'en-GB',
        de: 'de-DE',
      }[locale] ?? 'de-DE'
    );
  };

  private static formatMoneyCurrency = function (price: Money, locale?: string) {
    return Intl.NumberFormat(CurrencyHelpers.getLocaleFromShorthenedLocale(locale), {
      style: 'currency',
      currency: price?.currencyCode ?? 'EUR',
      maximumFractionDigits: price?.fractionDigits ?? 2,
      minimumFractionDigits: price?.fractionDigits ?? 2,
    }).format((price?.centAmount ?? 0) / 100);
  };

  /**
   * formatForCurrency formats a string of number into a cost representation. If
   * passing a string it must be numeric only.
   */
  static formatForCurrency = (costInCents: string | number | Money, locale?: string) =>
    typeof costInCents === 'string'
      ? CurrencyHelpers.formatStringForCurrency(costInCents, locale)
      : typeof costInCents === 'number'
      ? CurrencyHelpers.formatNumberForCurrency(costInCents, locale)
      : CurrencyHelpers.formatMoneyCurrency(costInCents, locale);

  static addCurrency: (value1?: Money, value2?: Money) => Money = (value1?: Money, value2?: Money) => {
    if (!value1) value1 = { centAmount: 0 };
    if (!value2) value2 = { centAmount: 0 };

    if (value1.fractionDigits !== value2.fractionDigits && value1.fractionDigits && value2.fractionDigits) {
      Log.warn(
        `Money with different fraction codes passed to addCurrency, value returned will be innacurate. ` +
          `Value 1: ${value1.fractionDigits}, value 2: ${value2.fractionDigits}`,
      );
    }
    if (value1.currencyCode !== value2.currencyCode && value1.currencyCode && value2.currencyCode) {
      Log.warn(
        `Money with different currency codes passed to addCurrency, value returned will be innacurate. ` +
          `Value 1: ${value1.currencyCode}, value 2: ${value2.currencyCode}`,
      );
    }
    return {
      fractionDigits: value1.fractionDigits || value2.fractionDigits,
      centAmount: value1.centAmount + value2.centAmount,
      currencyCode: value1.currencyCode || value2.currencyCode,
    };
  };

  static subtractCurrency: (value1: Money, value2: Money) => Money = (value1: Money, value2: Money) => {
    if (value1.fractionDigits !== value2.fractionDigits) {
      Log.warn(
        `Money with different fraction codes passed to addCurrency, value returned will be innacurate. ` +
          `Value 1: ${value1.fractionDigits}, value 2: ${value2.fractionDigits}`,
      );
    }
    if (value1.currencyCode !== value2.currencyCode) {
      Log.warn(
        `Money with different currency codes passed to addCurrency, value returned will be innacurate. ` +
          `Value 1: ${value1.currencyCode}, value 2: ${value2.currencyCode}`,
      );
    }
    return {
      fractionDigits: value1.fractionDigits || value2.fractionDigits,
      centAmount: value1.centAmount - value2.centAmount,
      currencyCode: value1.currencyCode || value2.currencyCode,
    };
  };

  static multiplyCurrency: (value: Money, numberOfItems: number) => Money = (value: Money, numberOfItems: number) => ({
    fractionDigits: value.fractionDigits,
    centAmount: value.centAmount * numberOfItems,
    currencyCode: value.currencyCode,
  });
}
