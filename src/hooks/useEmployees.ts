import { useQuery } from "@tanstack/react-query";

import {
  getEmployees,
  getEmployeeById,
} from "../api/employeeApi";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
};

export const useEmployee = (employeeId: number) => {
  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: Number.isFinite(employeeId),
  });
};