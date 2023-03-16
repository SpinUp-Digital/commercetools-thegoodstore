export interface Tastic<T = unknown, U = unknown> {
  data: U & { mobile: boolean; tablet: boolean; desktop: boolean } & {
    data: {
      dataSource: T;
    };
  };
}
