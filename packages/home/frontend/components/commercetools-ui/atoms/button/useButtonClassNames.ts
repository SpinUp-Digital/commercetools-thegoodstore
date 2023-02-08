import useClassNames from 'helpers/hooks/useClassNames';
import { ButtonProps, ButtonSize, ButtonVariant } from '.';

type variantBasedClassName = { [key in ButtonVariant]?: string };
type IncludesIcon = { includesIcon: boolean };
type UseButtonClassNames = (
  props: Pick<ButtonProps, 'variant' | 'size' | 'className' | 'loading'> & IncludesIcon,
) => string;

const useButtonClassNames: UseButtonClassNames = ({ variant, size, className = '', includesIcon, loading }) => {
  const sizeClassNames: { [key in ButtonSize]: string } = {
    xs: 'p-8',
    s: 'py-12 px-24',
    m: 'py-12 px-36',
    l: 'py-12 px-48',
    full: 'py-12 w-full',
    icon: 'w-40 h-40 grid items-center justify-center',
  };

  const primaryClassName = useClassNames([
    'bg-gray-700 text-neutral-100 outline-offset-0',
    'hover:bg-gray-500',
    'active:shadow-button active:bg-secondary-black',
    'focus-visible:outline focus-visible:outline-gray-700 border-gray-700 focus-visible:border focus-visible:outline-offset-[3px]',
    'disabled:bg-neutral-400 disabled:text-neutral-100',
  ]);

  const secondaryClassName = useClassNames([
    'bg-white-100 text-gray-700 bg-white rounded-md border border-secondary-black',
    'hover:shadow-bottom',
    'active:outline-2 active:shadow-button active:outline-1 active:outline-gray-300 active:outline-offset-0',
    'focus-visible:outline focus-visible:border-white-100 focus-visible:border focus-visible:outline-offset-[3px]',
    'disabled:text-neutral-100 disabled:bg-neutral-400',
  ]);

  const underlineClassName = 'pb-2 text-gray-700 hover:underline disabled:text-neutral-400';

  const ghostClassName = 'disabled:text-neutral-400';

  const variantClassNames: variantBasedClassName = {
    primary: primaryClassName,
    secondary: secondaryClassName,
    underlined: underlineClassName,
    ghost: ghostClassName,
  };

  const buttonClassName = useClassNames([
    sizeClassNames[size as ButtonSize],
    variantClassNames[variant as ButtonVariant] as string,
    { 'rounded-md': variant !== 'ghost' },
    { 'flex gap-10 items-center': includesIcon },
    { 'cursor-not-allowed': !!loading },
    'relative text-14 leading-4 transition overflow-hidden font-medium',
    className,
  ]);

  return buttonClassName;
};

export default useButtonClassNames;
