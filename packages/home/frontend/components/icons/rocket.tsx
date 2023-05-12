import React from 'react';

type Props = {
  className?: string;
};

const Icon: React.FC<React.PropsWithChildren<Props>> = ({ className }: Props) => (
  <svg
    width="100%"
    height="100%"
    className={className}
    viewBox="0 0 29 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.613 19.6a6.667 6.667 0 01-5.36 6.533L10.12 27.16a1.333 1.333 0 01-1.2-.36l-.947-.933a2.666 2.666 0 010-3.774l1.92-1.933A17.563 17.563 0 018 18.28L6.08 20.2a2.667 2.667 0 01-3.773 0l-.934-.933a1.333 1.333 0 01-.373-1.2l1.027-5.147A6.666 6.666 0 018.56 7.56h1.147A17.427 17.427 0 0126.8.267a1.333 1.333 0 011.107 1.106A17.307 17.307 0 0120.6 18.467V19.6h.013zm-5.88 3.92a4 4 0 003.213-3.92v-1.867a1.333 1.333 0 01.627-1.12A14.72 14.72 0 0025.4 2.773 14.64 14.64 0 0011.56 9.6a1.332 1.332 0 01-1.133.627H8.56a4 4 0 00-3.92 3.2l-.88 4.453.44.44 2.987-2.987a1.333 1.333 0 012.026.16 14.774 14.774 0 003.467 3.467 1.332 1.332 0 01.16 2.027l-2.987 2.986.44.44 4.44-.893zM19 10.333a1.334 1.334 0 110-2.667 1.334 1.334 0 010 2.667z" />
  </svg>
);

export default Icon;
