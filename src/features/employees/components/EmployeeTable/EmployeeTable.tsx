import type { Employee } from "../../../../types/employee.types";
import { useDeleteEmployee } from "../../../../hooks/useDeleteEmployee";
import "./EmployeeTable.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type SortField = "name" | "department" | "joinedDate";
type SortDirection = "asc" | "desc";
interface EmployeeTableProps {
  employees: Employee[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}
function EmployeeTable({
  employees,
  sortField,
  sortDirection,
  onSort,
}: EmployeeTableProps) {
  const navigate = useNavigate();
  const deleteEmployeeMutation = useDeleteEmployee();
  const [deleteError, setDeleteError] = useState("");
  const [deletingEmployeeId, setDeletingEmployeeId] = useState<number | null>(
    null,
  );
  return (
    <section
      className="employee-table"
      aria-labelledby="employee-table-heading"
    >
      <h2 id="employee-table-heading">Employees</h2>
      <table aria-labelledby="employee-table-heading">
        <caption className="sr-only">
          Employee list with department, location, role, status, and joined
          date.
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              aria-sort={
                sortField === "name"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() => onSort("name")}
                aria-label={`Sort by name ${
                  sortField === "name" && sortDirection === "asc"
                    ? "descending"
                    : "ascending"
                }`}
              >
                Name{" "}
                {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>

            <th scope="col">Email</th>

            <th
              scope="col"
              aria-sort={
                sortField === "department"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() => onSort("department")}
                aria-label={`Sort by department ${
                  sortField === "department" && sortDirection === "asc"
                    ? "descending"
                    : "ascending"
                }`}
              >
                Department{" "}
                {sortField === "department" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>

            <th scope="col">Location</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>

            <th
              scope="col"
              aria-sort={
                sortField === "joinedDate"
                  ? sortDirection === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              <button
                type="button"
                onClick={() => onSort("joinedDate")}
                aria-label={`Sort by joined date ${
                  sortField === "joinedDate" && sortDirection === "asc"
                    ? "descending"
                    : "ascending"
                }`}
              >
                Joined Date{" "}
                {sortField === "joinedDate" &&
                  (sortDirection === "asc" ? "↑" : "↓")}
              </button>
            </th>

            <th scope="col" aria-label="Employee actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {deleteError && (
            <p className="employee-delete-error" role="alert">
              {deleteError}
            </p>
          )}
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="empty-state"
                role="status"
                aria-live="polite"
              >
                <strong>No employees found</strong>
                <span>Try changing your search or filters.</span>
              </td>{" "}
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  {" "}
                  <span className="employee-name">{employee.name}</span>
                </td>
                <td>
                  {" "}
                  <span className="employee-email">{employee.email}</span>
                </td>
                <td>{employee.department}</td>
                <td>{employee.location}</td>
                <td>{employee.role}</td>
                <td>
                  <span
                    className={`employee-status employee-status--${employee.status.toLowerCase()}`}
                  >
                    {" "}
                    {employee.status}
                  </span>
                </td>
                <td>{employee.joinedDate}</td>
                <td>
                  <div className="employee-actions">
                    <button
                      type="button"
                      aria-label={`View ${employee.name}`}
                      onClick={() => navigate(`/employees/${employee.id}`)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      aria-label={`Edit ${employee.name}`}
                      onClick={() => navigate(`/employees/${employee.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${employee.name}`}
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Are you sure you want to delete ${employee.name}?`,
                        );
                        if (confirmed) {
                          setDeleteError("");
                          setDeletingEmployeeId(employee.id);

                          deleteEmployeeMutation.mutate(employee.id, {
                            onSuccess: () => {
                              setDeletingEmployeeId(null);
                            },
                            onError: () => {
                              setDeleteError(
                                `Failed to delete ${employee.name}. Please try again.`,
                              );
                              setDeletingEmployeeId(null);
                            },
                          });
                        }
                      }}
                      disabled={deletingEmployeeId === employee.id}
                    >
                      {deletingEmployeeId === employee.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default EmployeeTable;
