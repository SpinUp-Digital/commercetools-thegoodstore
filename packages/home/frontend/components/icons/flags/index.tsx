import React from 'react';
import France from './france';
import Germany from './germany';
import Greece from './greece';
import Italy from './italy';
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
    ['france']: <France className={className} />,
    ['DE']: <Germany className={className} />,
    ['greece']: <Greece className={className} />,
    ['italy']: <Italy className={className} />,
    ['spain']: <Spain className={className} />,
    ['sweden']: <Sweden className={className} />,
    ['united-kingdom']: <UnitedKingdom className={className} />,
    ['US']: <UnitedStates className={className} />,
  };
  return <>{flags[flagName]}</>;
};

export default Icon;
