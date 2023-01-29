import { ComposableCommerce } from '@commercetools/frontend-composable-commerce';
import { SDK as BaseSDK } from '@commercetools/frontend-sdk';
import { mapSDKLanguage } from 'project.config';
import { resolveApiHubUrl } from 'frontastic';

export const sdk = new BaseSDK();

export class SDK {
  private static extensions: ComposableCommerce;
  static locale: string;

  static configure(locale: string) {
    sdk.configure({
      locale: mapSDKLanguage(locale),
      currency: locale === 'de' ? 'EUR' : 'GBP',
      endpoint: resolveApiHubUrl().split('/frontastic')[0],
    });

    this.locale = locale;
    this.extensions = new ComposableCommerce(sdk);
  }

  static getExtensions() {
    return this.extensions;
  }
}
