import React from 'react';
import France from './france';
import Germany from './germany';
import Greece from './greece';
import Italy from './italy';
import Netherlands from './netherlands';
import Portugal from './portugal';
import Spain from './spain';
import Sweden from './sweden';
import UnitedKingdom from './united-kingdom';
import UnitedStates from './united-states';

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
    portugal: <Portugal className={`${className} h-20 w-30`} />,
    spain: <Spain className={`${className} h-20 w-30`} />,
    sweden: <Sweden className={className} />,
    GB: <UnitedKingdom className={className} />,
    US: <UnitedStates className={className} />,
  };
  return <>{flags[flagName]}</>;
};

export default Icon;
