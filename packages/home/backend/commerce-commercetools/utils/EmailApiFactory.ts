import { Context } from '@frontastic/extension-types';
import { EmailApi as SendgridEmailApi } from '../../email-sendgrid/apis/EmailApi';

export class EmailApiFactory {

  static getSendgridApi(context: Context, locale: string) {
    return new SendgridEmailApi(context, locale);
  }

  static getDefaultApi(context: Context, locale: string) {
    return this.getSendgridApi(context, locale);
  }
}
