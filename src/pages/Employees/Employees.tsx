import { useEffect, useState } from "react";

import { useEmployees } from "../../hooks/useEmployees";
import { useDebounce } from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import EmployeeStats from "../../features/employees/components/EmployeeStats/EmployeeStats";
import EmployeeFilters from "../../features/employees/components/EmployeeFilters/EmployeeFilters";
import EmployeeTable from "../../features/employees/components/EmployeeTable/EmployeeTable";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Loading from "../../components/common/Loading/Loading";
import ErrorState from "../../components/common/ErrorState/ErrorState";
import Pagination from "../../components/common/Pagination/Pagination";

import {
  filterEmployees,
  sortEmployees,
  paginateEmployees,
  type SortField,
  type SortDirection,
} from "../../features/employees/utils/employeeUtils";

import "./Employees.scss";

function Employees() {
  const {
    data: employees,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useEmployees();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const navigate = useNavigate();
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [location, setLocation] = useState("all");

  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, department, status, location]);

  if (isLoading || isFetching) {
    return <Loading message="Loading employees..." />;
  }

  if (isError) {
    return <ErrorState message="Failed to load employees." onRetry={refetch} />;
  }

  const clearFilters = () => {
    setSearch("");
    setDepartment("all");
    setStatus("all");
    setLocation("all");
  };

  const handleSort = (field: SortField) => {
    setCurrentPage(1);

    if (sortField === field) {
      setSortDirection((currentDirection) =>
        currentDirection === "asc" ? "desc" : "asc",
      );
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredEmployees = filterEmployees({
    employees: employees ?? [],
    search: debouncedSearch,
    department,
    status,
    location,
  });

  const sortedEmployees = sortEmployees({
    employees: filteredEmployees,
    sortField,
    sortDirection,
  });

  const {
    employees: paginatedEmployees,
    totalPages,
    totalItems,
  } = paginateEmployees({
    employees: sortedEmployees,
    currentPage,
    pageSize,
  });

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="employees-page">
     <PageHeader
  title="Employees"
  description="Manage employees, departments and employee status."
  actions={
    <button
      type="button"
      className="create-employee-button"
      onClick={() => navigate("/employees/new")}
    >
      + Create Employee
    </button>
  }
/>
      
      <EmployeeStats employees={employees ?? []} />

      <EmployeeFilters
        employees={employees ?? []}
        search={search}
        onSearchChange={setSearch}
        department={department}
        status={status}
        location={location}
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
        onLocationChange={setLocation}
        onClearFilters={clearFilters}
      />

      <EmployeeTable
        employees={paginatedEmployees}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <div className="employee-count">
        Showing {startItem}–{endItem} of {totalItems} employees
        {isFetching && (
          <span className="refreshing-indicator" role="status">
            Refreshing...
          </span>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((page) => page - 1)}
        onNext={() => setCurrentPage((page) => page + 1)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Employees;
