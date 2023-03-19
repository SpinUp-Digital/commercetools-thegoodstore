import React from 'react';
import dynamic from 'next/dynamic';

const France = dynamic(() => import('./france'));
const Germany = dynamic(() => import('./germany'));
const Greece = dynamic(() => import('./greece'));
const Italy = dynamic(() => import('./italy'));
const Netherlands = dynamic(() => import('./netherlands'));
const Portugal = dynamic(() => import('./portugal'));
const Spain = dynamic(() => import('./spain'));
const Sweden = dynamic(() => import('./sweden'));
const UnitedKingdom = dynamic(() => import('./united-kingdom'));
const UnitedStates = dynamic(() => import('./united-states'));

type Props = {
  flagName: string;
  className?: string;
};

const Icon: React.FC<Props> = ({ className, flagName }: Props) => {
  const flags = {
    france: <France className={className} />,
    DE: <Germany className={className} />,
    greece: <Greece className={className} />,
    italy: <Italy className={className} />,
    netherlands: <Netherlands className={className} />,
    portugal: <Portugal className={`${className} h-14 w-21`} />,
    spain: <Spain className={`${className} h-14 w-21`} />,
    sweden: <Sweden className={className} />,
    GB: <UnitedKingdom className={className} />,
    US: <UnitedStates className={className} />,
  };
  return <>{flags[flagName as keyof typeof flags]}</>;
};

export default Icon;
