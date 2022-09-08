import React from 'react';

type Props = {
  className?: string;
  pathClassName?: string;
};

const Icon: React.FC<Props> = ({ className, pathClassName }: Props) => (
  <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M25.0005 7.54545C25.0005 3.93091 22.2018 1 18.7498 1C16.1698 1 13.9538 2.63782 13.0005 4.97527C12.0472 2.63782 9.83116 1 7.24982 1C3.80049 1 1.00049 3.93091 1.00049 7.54545C1.00049 18.0473 13.0005 25 13.0005 25C13.0005 25 25.0005 18.0473 25.0005 7.54545Z"
      stroke="#212121"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="transparent"
      className={pathClassName}
    />
  </svg>
);

export default Icon;
