import { useNavigate, useParams } from "react-router-dom";

import { useEmployee } from "../../../../hooks/useEmployees";
import Loading from "../../../../components/common/Loading/Loading";
import ErrorState from "../../../../components/common/ErrorState/ErrorState";
import PageHeader from "../../../../components/common/PageHeader/PageHeader";
import "./EmployeeDetails.scss";
import { useLocation } from "react-router-dom";
function EmployeeDetails() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

const successMessage = location.state?.message as string | undefined;

  const id = Number(employeeId);

  const { data: employee, isLoading, isError, refetch } = useEmployee(id);

  if (isLoading) {
    return <Loading message="Loading employee..." />;
  }

  if (!employee) {
    return <ErrorState message="Employee not found." onRetry={refetch} />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load employee details."
        onRetry={refetch}
      />
    );
  }

  return (
    <main
      className="employee-details"
      aria-labelledby="employee-details-heading"
    >
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/employees")}
      >
        ← Back to Employees
      </button>
{successMessage && (
  <p className="employee-details-success" role="status">
    {successMessage}
  </p>
)}
    <PageHeader
  title={employee.name}
  description="Employee details and organizational information"
/>
      <div className="employee-details-card">
        <p>
          <strong>Name:</strong>
          {employee.name}
        </p>

        <p>
          <strong>Email:</strong>
          {employee.email}
        </p>

        <p>
          <strong>Department:</strong>
          {employee.department}
        </p>

        <p>
          <strong>Location:</strong>
          {employee.location}
        </p>

        <p>
          <strong>Role:</strong>
          {employee.role}
        </p>

        <p className="employee-details-status">
          <strong>Status</strong>

          <span
            className={`employee-status employee-status--${employee.status.toLowerCase()}`}
            aria-label={`Employee status: ${employee.status}`}
          >
            {employee.status}
          </span>
        </p>

        <p>
          <strong>Joined Date:</strong>
          {employee.joinedDate}
        </p>
      </div>
    </main>
  );
}

export default EmployeeDetails;
