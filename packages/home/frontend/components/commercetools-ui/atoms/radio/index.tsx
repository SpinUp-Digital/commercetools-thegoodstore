import React from 'react';

interface Props extends React.ComponentProps<'input'> {
  className?: string;
  onChecked?: () => void;
}

const Radio: React.FC<Props> = ({ className = '', checked, onChecked, ...props }) => {
  return (
    <label
      className={`flex h-20 w-20 items-center justify-center rounded-full border border-secondary-black p-4 ${className}`}
    >
      <input {...props} hidden className="absolute opacity-0" type="radio" checked={checked} onChange={onChecked} />
      <span
        className={`block h-full w-full shrink-0 rounded-full bg-secondary-black ${
          checked ? 'opacity-1' : 'opacity-0'
        }`}
      />
    </label>
  );
};

export default Radio;
