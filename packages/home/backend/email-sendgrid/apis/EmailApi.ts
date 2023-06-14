import { Context } from '@frontastic/extension-types';
import { BaseEmailApi } from '../../interfaces/BaseEmailApi';
import SendgridEmailClient from '@sendgrid/mail';
import SendgridClient from '@sendgrid/client';
import { Account } from '@commercetools/frontend-domain-types/account/Account';
import { Order } from '@commercetools/frontend-domain-types/cart/Order';
import { formatPrice } from '../utils/Price';

export class EmailApi implements BaseEmailApi {
  client: typeof SendgridClient;
  emailClient: typeof SendgridEmailClient;

  locale?: string;

  configuration: {
    sender: string;
    clientHost: string;
    templateIds: Record<
      'welcomeCustomer' | 'accountDeletion' | 'passwordReset' | 'orderConfirmation' | 'accountVerification',
      string
    >;
    listIds: Record<'newsletter', string>;
  };

  constructor(frontasticContext: Context, locale?: string) {
    this.client = SendgridClient;
    this.emailClient = SendgridEmailClient;

    this.client.setApiKey(frontasticContext.projectConfiguration.EXTENSION_SENDGRID_API_KEY);
    this.emailClient.setApiKey(frontasticContext.projectConfiguration.EXTENSION_SENDGRID_API_KEY);

    this.locale = locale;

    this.configuration = {
      sender: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_SENDER,
      clientHost: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_CLIENT_HOST,
      templateIds: {
        welcomeCustomer: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_TEMPLATE_WELCOME_CUSTOMER,
        accountVerification: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_TEMPLATE_ACCOUNT_VERIFICATION,
        passwordReset: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_TEMPLATE_PASSWORD_RESET,
        accountDeletion: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_TEMPLATE_ACCOUNT_DELETION,
        orderConfirmation: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_TEMPLATE_ORDER_CONFIRMATION,
      },
      listIds: {
        newsletter: frontasticContext.projectConfiguration.EXTENSION_SENDGRID_LIST_NEWSLETTER,
      },
    };
  }

  async sendAccountVerificationEmail(customer: Account) {
    await this.emailClient.send({
      from: this.configuration.sender,
      personalizations: [
        {
          to: [customer.email],
          dynamicTemplateData: {
            customer,
            url: `${this.configuration.clientHost}/verify?token=${customer.confirmationToken.token}`,
          },
        },
      ],
      templateId: this.configuration.templateIds.accountVerification,
    });
  }

  async sendPasswordResetEmail(customer: Account, token: string) {
    await this.emailClient.send({
      from: this.configuration.sender,
      personalizations: [
        {
          to: [customer.email],
          dynamicTemplateData: {
            customer,
            url: `${this.configuration.clientHost}/reset-password?token=${token}`,
          },
        },
      ],
      templateId: this.configuration.templateIds.passwordReset,
    });
  }

  async sendOrderConfirmationEmail(order: Order) {
    const locale = this.locale?.replace('_', '-');

    await this.emailClient.send({
      from: this.configuration.sender,
      personalizations: [
        {
          to: [order.email],
          dynamicTemplateData: {
            order: {
              ...order,
              formattedTotalPrice: formatPrice(order.sum, locale),
              lineItems: order.lineItems.map((lineItem) => ({
                ...lineItem,
                formattedPrice: formatPrice(lineItem.totalPrice, locale),
                imageUrl: lineItem.variant.images[0],
              })),
              shippingInfo: {
                ...order.shippingInfo,
                formattedPrice: formatPrice(
                  order.shippingInfo?.price ?? {
                    centAmount: 0,
                    currencyCode: order.sum.currencyCode,
                    fractionDigits: 2,
                  },
                  locale,
                ),
              },
            },
          },
        },
      ],
      templateId: this.configuration.templateIds.orderConfirmation,
    });
  }

  async sendWelcomeCustomerEmail(customer: Account) {
    await this.emailClient.send({
      from: this.configuration.sender,
      personalizations: [
        {
          to: [customer.email],
          dynamicTemplateData: { customer },
        },
      ],
      templateId: this.configuration.templateIds.welcomeCustomer,
    });
  }

  async sendAccountDeletionEmail(customer: Account) {
    await this.emailClient.send({
      from: this.configuration.sender,
      personalizations: [
        {
          to: [customer.email],
          dynamicTemplateData: { customer },
        },
      ],
      templateId: this.configuration.templateIds.accountDeletion,
    });
  }

  async subscribe(account: Account, lists?: string[]) {
    const listIds = lists?.map((list) => this.configuration.listIds[list]).filter(Boolean);

    const data = {
      ...(listIds && listIds.length > 0 ? { list_ids: listIds } : {}),
      contacts: [
        {
          email: account.email,
          first_name: account.firstName,
          last_name: account.lastName,
        },
      ],
    };

    const [body, statusCode] = await this.client.request({
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: data,
    });

    return [body, statusCode];
  }

  async unsubscribe(account: Account, list: string) {
    const [contactResponse, contactBody] = await this.client.request({
      url: `/v3/marketing/contacts/search/emails`,
      method: 'POST',
      body: { emails: [account.email] },
    });

    const contact = (Object.values(contactBody.result)[0] as { contact: { id: string } }).contact;

    const [deleteResponse, deleteBody] = await this.client.request({
      url: `/v3/marketing/lists/${this.configuration.listIds[list]}/contacts`,
      method: 'DELETE',
      qs: { contact_ids: contact.id },
    });

    return [deleteResponse, deleteBody];
  }
}
