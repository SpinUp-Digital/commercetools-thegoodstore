import { FC } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import useClassNames from 'helpers/hooks/useClassNames';
import { ButtonProps } from '.';
import LoadingIcon from './loadingIcon';

type FeedbackIconLayerProps = {
  loading?: ButtonProps['loading'];
  variant?: ButtonProps['variant'];
};

const FeedbackIconLayer: FC<FeedbackIconLayerProps> = ({ loading, variant }) => {
  const layerClassName = useClassNames([
    'absolute top-0 left-0 grid h-full w-full items-center justify-center',
    variant == 'primary' ? 'bg-gray-700' : 'bg-white',
  ]);

  const checkIconClassName = useClassNames(['w-20', { 'text-white': variant == 'primary' }]);
  const loadingIconClassName = variant == 'primary' ? 'fill-white' : 'fill-gray-700';

  return (
    <span className={layerClassName}>
      {loading ? <LoadingIcon className={loadingIconClassName} /> : <CheckIcon className={checkIconClassName} />}
    </span>
  );
};

export default FeedbackIconLayer;
