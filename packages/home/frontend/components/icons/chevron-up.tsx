import React from 'react';

type Props = {
  className?: string;
};

const Icon: React.FC<React.PropsWithChildren<Props>> = ({ className }: Props) => (
  <svg
    width="100%"
    height="100%"
    className={className}
    viewBox="0 0 24 24"
    fill="#2D3748"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.29998 8.70001C9.15555 8.50744 9.08543 8.26923 9.10249 8.02912C9.11956 7.78901 9.22266 7.56311 9.39287 7.3929C9.56308 7.22269 9.78898 7.11959 10.0291 7.10252C10.2692 7.08546 10.5074 7.15558 10.7 7.30001L14.7 11.3C14.8832 11.4869 14.9858 11.7383 14.9858 12C14.9858 12.2618 14.8832 12.5131 14.7 12.7L10.7 16.7C10.5074 16.8444 10.2692 16.9146 10.0291 16.8975C9.78898 16.8804 9.56308 16.7773 9.39287 16.6071C9.22266 16.4369 9.11956 16.211 9.10249 15.9709C9.08543 15.7308 9.15555 15.4926 9.29998 15.3L12.59 12L9.28998 8.70001H9.29998Z" />
  </svg>
);

export default Icon;
