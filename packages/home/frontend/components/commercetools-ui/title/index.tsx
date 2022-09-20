import { FC } from 'react';

type TitleProps = {
  title: string;
  className?: string;
};

const Title: FC<TitleProps> = ({ title, className }) => {
  return <h3 className={`${className ?? ''} text-18 font-bold md:text-22 lg:text-28`}>{title}</h3>;
};

export default Title;
