import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEmployee } from "../api/employeeApi";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      employee,
    }: {
      employeeId: number;
      employee: Parameters<typeof updateEmployee>[1];
    }) => updateEmployee(employeeId, employee),

    onSuccess: (updatedEmployee, variables) => {
      queryClient.setQueryData(
        ["employee", variables.employeeId],
        updatedEmployee,
      );

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};