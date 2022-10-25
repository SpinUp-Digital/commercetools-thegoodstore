import useClassNames from 'helpers/hooks/useClassNames';
import { FC, useMemo } from 'react';

export type TitleProps = {
  title: string;
  className?: string;
  variant?: 'sm' | 'lg';
};

const Title: FC<TitleProps> = ({ title, className = '', variant = 'lg' }) => {
  const fontClassName = useMemo(
    () =>
      ({
        sm: 'text-16 md:text-18 lg:text-22',
        lg: 'text-18 md:text-22 lg:text-28',
      }[variant]),
    [variant],
  );

  const classNames = useClassNames([className, fontClassName, 'font-bold']);

  return <h3 className={classNames}>{title}</h3>;
};

export default Title;
