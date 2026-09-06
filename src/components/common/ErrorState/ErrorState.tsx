import "./ErrorState.scss";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}
function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="error-state"
      role="alert"
      aria-live="assertive"
    >
      <strong>Unable to load data</strong>
      <span>{message}</span>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
export default ErrorState;