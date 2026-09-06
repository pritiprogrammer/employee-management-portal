import type { Employee } from "../../../types/employee.types";

interface FilterEmployeesParams {
  employees: Employee[];
  search: string;
  department: string;
  status: string;
  location: string;
}

export function filterEmployees({
  employees,
  search,
  department,
  status,
  location,
}: FilterEmployeesParams): Employee[] {
  const normalizedSearch = search.toLowerCase().trim();

  return employees?.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(normalizedSearch) ||
      employee.email.toLowerCase().includes(normalizedSearch);

    const matchesDepartment =
      department === "all" || employee.department === department;

    const matchesStatus = status === "all" || employee.status === status;

    const matchesLocation =
      location === "all" || employee.location === location;

    return (
      matchesSearch && matchesDepartment && matchesStatus && matchesLocation
    );
  });
}
export type SortField = "name" | "department" | "joinedDate";
export type SortDirection = "asc" | "desc";

interface SortEmployeesParams {
  employees: Employee[];
  sortField: SortField;
  sortDirection: SortDirection;
}

export function sortEmployees({
  employees,
  sortField,
  sortDirection,
}: SortEmployeesParams): Employee[] {
  const sortedEmployees = [...employees].sort((a, b) => {
    let comparison = 0;

    if (sortField === "name") {
      comparison = a.name.localeCompare(b.name);
    }

    if (sortField === "department") {
      comparison = a.department.localeCompare(b.department);
    }

    if (sortField === "joinedDate") {
      comparison =
        new Date(a.joinedDate).getTime() - new Date(b.joinedDate).getTime();
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return sortedEmployees;
}

interface PaginateEmployeesParams {
  employees: Employee[];
  currentPage: number;
  pageSize: number;
}

interface PaginatedEmployeesResult {
  employees: Employee[];
  totalPages: number;
  totalItems: number;
}

export function paginateEmployees({
  employees,
  currentPage,
  pageSize,
}: PaginateEmployeesParams): PaginatedEmployeesResult {
  const totalPages = Math.max(1, Math.ceil(employees.length / pageSize));

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedEmployees = employees.slice(startIndex, startIndex + pageSize);

  return {
    employees: paginatedEmployees,
    totalPages,
    totalItems: employees.length,
  };
}

interface EmployeeFilterOptions {
  departments: string[];
  locations: string[];
  statuses: string[];
}

export function getFilterOptions(employees: Employee[]): EmployeeFilterOptions {
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  const locations = [
    ...new Set(employees.map((employee) => employee.location)),
  ];

  const statuses = [...new Set(employees.map((employee) => employee.status))];

  return {
    departments,
    locations,
    statuses,
  };
}
