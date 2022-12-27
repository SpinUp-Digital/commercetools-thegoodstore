export interface Tastic<T = unknown, U = unknown> {
  data: U & {
    data: {
      dataSource: T;
    };
  };
}
