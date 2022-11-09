import { sdk } from '@commercetools/sdk';
import { ComposableCommerce } from '@commercetools/composable-commerce';
import { mapSDKLanguage } from 'project.config';
import { resolveApiHubUrl } from 'frontastic';

export class SDK {
  private static extensions: ComposableCommerce;

  static configure(locale: string) {
    sdk.configure({
      locale: mapSDKLanguage(locale),
      currency: 'EUR',
      endpoint: resolveApiHubUrl().split('/frontastic')[0],
    });

    this.extensions = new ComposableCommerce(sdk);
  }

  static getExtensions() {
    return this.extensions;
  }
}
