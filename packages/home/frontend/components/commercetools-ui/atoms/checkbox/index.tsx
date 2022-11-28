import React, { ChangeEvent } from 'react';

export interface Props extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = ({ onChange, className = '', ...props }) => {
  const checkboxClassName = `h-[24px] w-[24px] border-neutral-400 bg-white text-white checked:border-neutral-400 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgN0w1IDExTDE1IDEiIHN0cm9rZT0iIzQ5NDk0OSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] checked:bg-[length:auto_50%] checked:bg-center checked:bg-no-repeat hover:border-neutral-400 checked:hover:border-neutral-400 focus:border-neutral-400 focus:shadow-none focus:shadow-transparent focus:outline-none focus:ring-transparent checked:focus:border-neutral-400`;

  return (
    <div>
      <input
        className={`${className} ${checkboxClassName}`}
        type="checkbox"
        onChange={(e) => onChange?.(e)}
        {...props}
      />
    </div>
  );
};

export default Checkbox;
