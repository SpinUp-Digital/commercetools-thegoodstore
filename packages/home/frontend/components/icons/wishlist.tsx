import React from 'react';

type Props = {
  className?: string;
};

const Icon: React.FC<Props> = ({ className }: Props) => (
  <svg className={className} width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.5 6.625C22.5 3.72583 20.0512 1.375 17.0307 1.375C14.7732 1.375 12.8342 2.68867 12 4.5635C11.1658 2.68867 9.22683 1.375 6.96817 1.375C3.95 1.375 1.5 3.72583 1.5 6.625C1.5 15.0483 12 20.625 12 20.625C12 20.625 22.5 15.0483 22.5 6.625Z"
      stroke="#494949"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Icon;
