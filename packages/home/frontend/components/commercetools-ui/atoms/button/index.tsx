import { ComponentProps, FC, ReactElement } from 'react';
import FeedbackIconLayer from './feedbackIconLayer';
import useButtonClassNames from './useButtonClassNames';

export type ButtonVariant = 'primary' | 'secondary' | 'underlined' | 'ghost';
export type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'full' | 'icon';
export type ButtonIconPosition = 'left' | 'middle' | 'right';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconPosition?: ButtonIconPosition;
  icon?: ReactElement;
  loading?: boolean;
  added?: boolean;
}

const Button: FC<ButtonProps> = ({
  icon,
  added,
  loading,
  children,
  className,
  disabled,
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
  });

  return (
    <button {...props} className={buttonClassName} disabled={disabled || loading}>
      {(loading || added) && <FeedbackIconLayer loading={loading} variant={variant} />}
      {icon && iconPosition !== 'right' && icon}
      {children}
      {icon && iconPosition == 'right' && icon}
    </button>
  );
};

export default Button;
