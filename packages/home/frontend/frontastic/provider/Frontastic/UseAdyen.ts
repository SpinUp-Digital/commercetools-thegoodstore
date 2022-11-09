export interface UseAdyen {
  createSession: (value: number, currency: string, returnUrl: any, locale: string) => Promise<any>;
  adyenCheckout: (sessionId: string | string[], redirectResult: string | string[], locale: string) => Promise<void>;
}
