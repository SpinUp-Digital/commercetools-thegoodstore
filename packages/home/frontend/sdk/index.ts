import { sdk } from '@commercetools/frontend-sdk';
import { ComposableCommerce } from '@commercetools/frontend-composable-commerce';
import { mapSDKLanguage } from 'project.config';
import { resolveApiHubUrl } from 'frontastic';

export class SDK {
  private static extensions: ComposableCommerce;

  static configure(locale: string) {
    sdk.configure({
      locale: mapSDKLanguage(locale),
      currency: locale === 'de' ? 'EUR' : 'GBP',
      endpoint: resolveApiHubUrl().split('/frontastic')[0],
    });

    this.extensions = new ComposableCommerce(sdk);
  }

  static getExtensions() {
    return this.extensions;
  }
}
