import { ComposableCommerce } from '@commercetools/frontend-composable-commerce';
import { SDK as BaseSDK } from '@commercetools/frontend-sdk';
import { getLocalizationInfo } from 'project.config';

export const sdk = new BaseSDK();

export class SDK {
  private static extensions: ComposableCommerce;

  static configure(nextLocale: string) {
    const { locale, currency, useCurrencyInLocale } = getLocalizationInfo(nextLocale);

    sdk.configure({
      locale,
      currency,
      useCurrencyInLocale,
      endpoint: (process.env.NEXT_PUBLIC_FRONTASTIC_HOST as string).split('/frontastic')[0],
    });

    this.extensions = new ComposableCommerce(sdk);
  }

  static getExtensions() {
    return this.extensions;
  }
}
