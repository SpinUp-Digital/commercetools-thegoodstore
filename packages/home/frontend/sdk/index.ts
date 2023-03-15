import { ComposableCommerce } from '@commercetools/frontend-composable-commerce';
import { SDK as BaseSDK } from '@commercetools/frontend-sdk';
import { getLocalizationInfo } from 'project.config';
import { resolveApiHubUrl } from 'frontastic';

export const sdk = new BaseSDK();

export class SDK {
  private static extensions: ComposableCommerce;
  static locale: string;

  static configure(nextLocale: string) {
    const { locale, currency } = getLocalizationInfo(nextLocale);

    sdk.configure({
      locale,
      currency,
      useCurrencyInLocale: true,
      endpoint: resolveApiHubUrl().split('/frontastic')[0],
    });

    this.locale = locale;
    this.extensions = new ComposableCommerce(sdk);
  }

  static getExtensions() {
    return this.extensions;
  }
}
