import { apiClient } from "./client";
import type { Employee } from "../types/employee.types";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await apiClient.get<Employee[]>("/employees");

  return response.data;
};
export const getEmployeeById = async (
  employeeId: number,
): Promise<Employee> => {
  const response = await apiClient.get<Employee>(
    `/employees/${employeeId}`,
  );

  return response.data;
};
export const updateEmployee = async (
  employeeId: number,
  employee: Employee,
): Promise<Employee> => {
  const response = await apiClient.put<Employee>(
    `/employees/${employeeId}`,
    employee,
  );

  return response.data;
};
export const deleteEmployee = async (
  employeeId: number,
): Promise<void> => {
  await apiClient.delete(`/employees/${employeeId}`);
};
export const createEmployee = async (
  employee: Omit<Employee, "id">,
): Promise<Employee> => {
  const response = await apiClient.post<Employee>(
    "/employees",
    employee,
  );

  return response.data;
};