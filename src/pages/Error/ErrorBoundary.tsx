import { Link, useRouteError } from "react-router-dom";
import "./ErrorBoundary.scss";

function ErrorBoundary() {
  const error = useRouteError() as {
    status?: number;
    statusText?: string;
    message?: string;
  };

  return (
    <main className="error-page">
      <section className="error-card" aria-labelledby="error-heading">
        <span className="error-code">{error.status ?? 500}</span>

        <h1 id="error-heading">
          {error.statusText || "Something went wrong"}
        </h1>

        <p>
          {error.message ||
            "We couldn't load this page. Please try again."}
        </p>

        <Link to="/dashboard" className="error-home-link">
          Go to Dashboard
        </Link>
      </section>
    </main>
  );
}

export default ErrorBoundary;