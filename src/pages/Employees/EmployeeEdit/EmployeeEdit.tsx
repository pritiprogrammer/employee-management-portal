import { useParams, useNavigate } from "react-router-dom";
import { useEmployee } from "../../../hooks/useEmployees";
import Loading from "../../../components/common/Loading/Loading";
import ErrorState from "../../../components/common/ErrorState/ErrorState";
import EmployeeForm from "../../../features/employees/components/EmployeeForm/EmployeeForm";
import { useUpdateEmployee } from "../../../hooks/useUpdateEmployee";
import PageHeader from "../../../components/common/PageHeader/PageHeader";
import "./EmployeeEdit.scss";

function EmployeeEdit() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const id = Number(employeeId);
  const { data: employee, isLoading, isError, refetch } = useEmployee(id);
  const updateEmployeeMutation = useUpdateEmployee();


  if (isLoading) {
    return <Loading message="Loading employee..." />;
  }

  if (!employee) {
    return <ErrorState message="Employee not found." onRetry={refetch} />;
  }

  if (isError) {
    return (
      <ErrorState
        message="Failed to load employee details."
        onRetry={refetch}
      />
    );
  }

  return (
    <section className="employee-edit" aria-labelledby="employee-edit-heading">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate(`/employees/${employee.id}`)}
      >
        ← Back to Employee Details
      </button>
     <PageHeader
  title={`Edit ${employee.name}`}
  description="Update employee information and save your changes."
/>
      {updateEmployeeMutation.isError && (
        <p className="employee-edit-error" role="alert">
          Failed to update employee. Please try again.
        </p>
      )}
    
      <EmployeeForm
        employee={employee}
      onSubmit={(updatedEmployee) => {
  updateEmployeeMutation.mutate({
    employeeId: id,
    employee: updatedEmployee,
  });
}}
        onCancel={() => navigate(`/employees/${employee.id}`)}
        isSaving={updateEmployeeMutation.isPending}
      />
    </section>
  );
}

export default EmployeeEdit;
