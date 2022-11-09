import { sdk } from '@commercetools/sdk';
import { ComposableCommerce } from '@commercetools/composable-commerce';
import { mapSDKLanguage } from 'project.config';
import { LocaleStorage, resolveApiHubUrl } from 'frontastic';

export class SDK {
  static configureSDK() {
    sdk.configure({
      locale: mapSDKLanguage(LocaleStorage.locale),
      currency: 'EUR',
      endpoint: resolveApiHubUrl().split('/frontastic')[0],
    });
  }

  static getExtensions() {
    this.configureSDK();

    return new ComposableCommerce(sdk);
  }
}
