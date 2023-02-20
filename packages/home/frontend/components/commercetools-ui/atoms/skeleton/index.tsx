import { FC } from 'react';
import ReactSkeleton from 'react-loading-skeleton';

const Skeleton: FC = () => {
  return (
    <span className="absolute top-0 left-0 z-10 h-full w-full">
      <ReactSkeleton className="h-full w-full" />
    </span>
  );
};

export default Skeleton;
