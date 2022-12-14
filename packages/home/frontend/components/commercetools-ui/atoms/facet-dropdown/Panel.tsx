import { ComponentProps, forwardRef, PropsWithChildren, ReactNode } from 'react';
import useClassNames from 'helpers/hooks/useClassNames';

export type PanelProps = ComponentProps<'div'> &
  PropsWithChildren<{
    header: string | ReactNode;
    footer: string | ReactNode;
    classNames?: Partial<PanelClassNames>;
  }>;

export type PanelClassNames = {
  root: string;
  header: string;
  body: string;
  footer: string;
};

const Panel = (
  { children, header, footer, className, classNames = {}, ...props }: PanelProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  return (
    <div {...props} className={useClassNames(['ais-Panel', classNames.root, className])} ref={ref}>
      <div className={useClassNames(['ais-Panel-header', classNames.header])}>{header}</div>
      <div className={useClassNames(['ais-Panel-body z-20', classNames.body])}>{children}</div>
      <div className={useClassNames(['ais-Panel-footer', classNames.footer])}>{footer}</div>
    </div>
  );
};

export default forwardRef<HTMLDivElement, PanelProps>(Panel);
