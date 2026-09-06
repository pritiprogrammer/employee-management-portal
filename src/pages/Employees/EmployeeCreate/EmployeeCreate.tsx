import { useNavigate } from "react-router-dom";

import EmployeeForm from "../../../features/employees/components/EmployeeForm/EmployeeForm";
import { useCreateEmployee } from "../../../hooks/useCreateEmployee";
import type { Employee } from "../../../types/employee.types";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import "./EmployeeCreate.scss";

const initialEmployee: Employee = {
  id: 0,
  name: "",
  email: "",
  department: "",
  location: "",
  role: "",
  status: "Active",
  joinedDate: new Date().toISOString().split("T")[0],
};

function EmployeeCreate() {
  const navigate = useNavigate();
  const createEmployeeMutation = useCreateEmployee();

  const handleSubmit = (employee: Employee) => {
    const { id, ...employeeData } = employee;

    createEmployeeMutation.mutate(employeeData, {
    onSuccess: (newEmployee) => {
  navigate(`/employees/${newEmployee.id}`, {
    state: {
      message: "Employee created successfully.",
    },
  });
},
    });
  };

  return (
    <section
      className="employee-create"
      aria-labelledby="employee-create-heading"
    >
      <PageHeader
        title="Create Employee"
        description="Add a new employee to the organization."
      />

      <EmployeeForm
        employee={initialEmployee}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/employees")}
        mode="create"
        isSaving={createEmployeeMutation.isPending}
      />
    </section>
  );
}

export default EmployeeCreate;
