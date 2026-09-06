import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEmployee } from "../api/employeeApi";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,

    onSuccess: (newEmployee) => {
      queryClient.setQueryData(
        ["employee", newEmployee.id],
        newEmployee,
      );

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};