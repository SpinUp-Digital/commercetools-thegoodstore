import { FC } from 'react';

type SubtitleProps = {
  subtitle: string;
};

const Subtitle: FC<SubtitleProps> = ({ subtitle }) => {
  return <p className="mb-24 text-12 font-thin leading-loose md:text-14 lg:text-16">{subtitle}</p>;
};

export default Subtitle;
