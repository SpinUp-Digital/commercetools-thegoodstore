import React from 'react';

type SubtitleProps = {
  subtitle: string;
  className?: string;
};

const Subtitle: React.FC<SubtitleProps> = ({ subtitle, className }) => {
  return <p className={`${className ?? ''} text-14 font-thin leading-loose md:text-14 lg:text-16`}>{subtitle}</p>;
};

export default Subtitle;
