import { useEmployees } from "../../hooks/useEmployees";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import "./Dashboard.scss";

function Dashboard() {
  const { data: employees, isLoading, isError, refetch } = useEmployees();

  if (isLoading) {
    return <Loading message="Loading dashboard..." />;
  }

  if (isError) {
    return <ErrorState message="Failed to load dashboard." onRetry={refetch} />;
  }

  const employeeList = Array.isArray(employees) ? employees : [];

  const totalEmployees = employeeList.length;

  const activeEmployees = employeeList.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveEmployees = employeeList.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  const departmentCount = new Set(
    employeeList.map((employee) => employee.department),
  ).size;

  return (
    <main className="dashboard" aria-labelledby="dashboard-heading">
      <div className="dashboard-header">
        <h1 id="dashboard-heading">Employee Operations Dashboard</h1>
        <p>Monitor employee operations and organizational activity.</p>
      </div>

      <section
        className="dashboard-overview"
        aria-labelledby="dashboard-overview-heading"
      >
        <h2 id="dashboard-overview-heading">Overview</h2>

        <dl className="dashboard-stats">
          <div className="dashboard-stat">
            <dt>Total Employees</dt>
            <dd>{totalEmployees}</dd>
          </div>

          <div className="dashboard-stat">
            <dt>Active Employees</dt>
            <dd>{activeEmployees}</dd>
          </div>

          <div className="dashboard-stat">
            <dt>Inactive Employees</dt>
            <dd>{inactiveEmployees}</dd>
          </div>

          <div className="dashboard-stat">
            <dt>Departments</dt>
            <dd>{departmentCount}</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}

export default Dashboard;
