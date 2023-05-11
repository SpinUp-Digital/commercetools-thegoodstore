import { ComponentProps, FC, ReactElement } from 'react';
import Skeleton from '../skeleton';
import FeedbackIconLayer from './feedbackIconLayer';
import useButtonClassNames from './useButtonClassNames';

export type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'underlined' | 'ghost';
export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'fit' | 'full' | 'icon';
export type ButtonIconPosition = 'left' | 'middle' | 'right';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: ButtonIconPosition;
  icon?: ReactElement;
  loading?: boolean;
  added?: boolean;
  asSkeleton?: boolean;
}

const Button: FC<React.PropsWithChildren<ButtonProps>> = ({
  icon,
  added,
  loading,
  children,
  className,
  disabled,
  asSkeleton = false,
  variant = 'primary',
  iconPosition = 'middle',
  size = children ? 's' : 'icon',
  ...props
}) => {
  const buttonClassName = useButtonClassNames({
    variant,
    size,
    className,
    includesIcon: !!icon && !!children,
    loading,
    asSkeleton,
  });

  return (
    <button {...props} className={buttonClassName} disabled={disabled || loading}>
      {(loading || added) && <FeedbackIconLayer loading={loading} variant={variant} />}
      {icon && iconPosition !== 'right' && icon}
      {children}
      {icon && iconPosition == 'right' && icon}
      {asSkeleton && <Skeleton />}
    </button>
  );
};

export default Button;
