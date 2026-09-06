export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  location: string;
  role: string;
  status: EmployeeStatus;
  joinedDate: string;
}