import React from 'react';

export type BreadcrumbProps = {
  Separator?: React.ReactNode;
  className?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ children, Separator, className = '' }) => {
  return (
    <nav className={className} aria-label="Breadcrumb">
      <ol role="list" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-22">
        {React.Children.map(children, (Child, index) => (
          <>
            <li>
              <button>{Child}</button>
            </li>
            {Separator && <li>{index < React.Children.count(children) - 1 && <span>{Separator}</span>}</li>}
          </>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
