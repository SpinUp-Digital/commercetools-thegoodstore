export {};

declare global {
  declare const gtag: (type: string, label: string, payload: unknown) => void;
}
