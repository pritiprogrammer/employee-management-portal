import "./EmployeeStats.scss";
import type { Employee } from "../../../../types/employee.types";

interface EmployeeStatsProps {
  employees: Employee[];
}

function EmployeeStats({ employees }: EmployeeStatsProps) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  const departments = new Set(employees.map((employee) => employee.department))
    .size;

  return (
    <section
      aria-labelledby="employee-stats-heading"
      className="employee-stats-section"
    >
      <h2 id="employee-stats-heading">Overview</h2>

      <dl className="employee-stats">
        <div className="stat-card">
          <dt className="stat-label">Total Employees</dt>
          <dd className="stat-value">{totalEmployees}</dd>
        </div>

        <div className="stat-card stat-card--active">
          <dt className="stat-label">Active</dt>
          <dd className="stat-value">{activeEmployees}</dd>
        </div>

        <div className="stat-card stat-card--inactive">
          <dt className="stat-label">Inactive</dt>
          <dd className="stat-value">{inactiveEmployees}</dd>
        </div>

        <div className="stat-card">
          <dt className="stat-label">Departments</dt>
          <dd className="stat-value">{departments}</dd>
        </div>
      </dl>
    </section>
  );
}

export default EmployeeStats;
