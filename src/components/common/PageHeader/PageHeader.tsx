import type { ReactNode } from "react";

import "./PageHeader.scss";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header-content">
        <h1>{title}</h1>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {actions && (
        <div className="page-header-actions">
          {actions}
        </div>
      )}
    </header>
  );
}

export default PageHeader;