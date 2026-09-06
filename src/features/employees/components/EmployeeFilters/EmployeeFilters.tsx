import type { Employee } from "../../../../types/employee.types";
import { getFilterOptions } from "../../../../features/employees/utils/employeeUtils";
import "./EmployeeFilters.scss";
interface EmployeeFiltersProps {
  employees: Employee[];
  department: string;
  status: string;
  location: string;
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

function EmployeeFilters({
  employees,
  search,
  department,
  status,
  location,
  onDepartmentChange,
  onStatusChange,
  onLocationChange,
  onClearFilters,
  onSearchChange,
}: EmployeeFiltersProps) {
  const { departments, locations, statuses } = getFilterOptions(employees);
  const activeFilterCount = [
    search,
    department !== "all",
    status !== "all",
    location !== "all",
  ].filter(Boolean).length;
  return (
    <section className="employee-filters" aria-label="Employee filters">
      <div className="filter-search">
        <label htmlFor="employee-search">Search</label>

        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">
            🔍
          </span>

          <input
            id="employee-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email..."
          />
          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="department-filter">Department</label>
        <select
          id="department-filter"
          value={department}
          onChange={(event) => onDepartmentChange(event.target.value)}
          aria-label="Filter employees by department"
        >
          <option value="all">All Departments</option>

          {departments.map((departmentName) => (
            <option key={departmentName} value={departmentName}>
              {departmentName}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <select
          id="status-filter"
          value={status}
          aria-label="Filter employees by status"
          onChange={(event) => onStatusChange(event.target.value)}
        >
          <option value="all">All Status</option>

          {statuses.map((statusName) => (
            <option key={statusName} value={statusName}>
              {statusName}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location-filter">Location</label>
        <select
          id="location-filter"
          value={location}
          aria-label="Filter employees by location"
          onChange={(event) => onLocationChange(event.target.value)}
        >
          <option value="all">All Locations</option>

          {locations.map((locationName) => (
            <option key={locationName} value={locationName}>
              {locationName}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="clear-filters"
        onClick={onClearFilters}
        aria-label="Clear all employee filters"
        disabled={
          !search &&
          department === "all" &&
          status === "all" &&
          location === "all"
        }
      >
        Clear Filters
      </button>
      {activeFilterCount > 0 && (
        <span className="active-filter-count">
          {activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"}{" "}
          active
        </span>
      )}
    </section>
  );
}

export default EmployeeFilters;
