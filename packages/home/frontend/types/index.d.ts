export {};

declare global {
  declare const gtag: (type: string, label: string, payload: unknown) => void;

  interface Window {
    gtag: (type: string, label: string, payload: unknown) => void;
  }
}
