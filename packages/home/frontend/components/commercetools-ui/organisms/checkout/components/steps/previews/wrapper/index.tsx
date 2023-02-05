import React from 'react';

const Preview: React.FC = ({ children }) => {
  return (
    /*eslint-disable-next-line tailwindcss/no-custom-classname */
    <div className="border-x border-b border-neutral-400 px-20 py-16 md:border-[1px_0_0_0]">{children}</div>
  );
};

export default Preview;
