import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEmployee } from "../api/employeeApi";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeId: number) => deleteEmployee(employeeId),

    onSuccess: (_, employeeId) => {
      queryClient.removeQueries({
        queryKey: ["employee", employeeId],
      });

      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
    },
  });
};