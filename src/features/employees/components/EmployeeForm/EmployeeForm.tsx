import { useState } from "react";

import type { Employee } from "../../../../types/employee.types";

import "./EmployeeForm.scss";

interface EmployeeFormProps {
  employee: Employee;
  onSubmit: (employee: Employee) => void;
  onCancel: () => void;
  isSaving?: boolean;
  mode?: "create" | "edit";
}

function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  isSaving = false,
  mode = "edit",
}: EmployeeFormProps) {
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(employee.department);
  const [location, setLocation] = useState(employee.location);
  const [role, setRole] = useState(employee.role);
  const [status, setStatus] = useState(employee.status);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [roleError, setRoleError] = useState("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setNameError("");
  setEmailError("");
  setDepartmentError("");
  setLocationError("");
  setRoleError("");

  let hasError = false;

  if (!name.trim()) {
    setNameError("Name is required.");
    hasError = true;
  } else if (name.trim().length < 2) {
    setNameError("Name must be at least 2 characters.");
    hasError = true;
  }

  if (!email.trim()) {
    setEmailError("Email is required.");
    hasError = true;
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      hasError = true;
    }
  }

  if (!department.trim()) {
    setDepartmentError("Department is required.");
    hasError = true;
  }

  if (!location.trim()) {
    setLocationError("Location is required.");
    hasError = true;
  }

  if (!role.trim()) {
    setRoleError("Role is required.");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  onSubmit({
    ...employee,
    name: name.trim(),
    email: email.trim(),
    department: department.trim(),
    location: location.trim(),
    role: role.trim(),
    status,
  });
};

  return (
    <form className="employee-edit-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="employee-name">Name</label>
        <input
          id="employee-name"
          name="name"
          type="text"
          value={name}
          required
          onChange={(event) => {
            setName(event.target.value);
            setNameError("");
          }}
          aria-required="true"
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "employee-name-error" : undefined}
        />
        {nameError && (
          <span id="employee-name-error" className="form-error" role="alert">
            {nameError}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-email">Email</label>
        <input
          id="employee-email"
          name="email"
          type="email"
          value={email}
          aria-required="true"
          required
          onChange={(event) => {
            setEmail(event.target.value);
            setEmailError("");
          }}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "employee-email-error" : undefined}
        />
        {emailError && (
          <span id="employee-email-error" className="form-error" role="alert">
            {emailError}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-department">Department</label>
        <input
          id="employee-department"
          name="department"
          type="text"
          value={department}
          aria-required="true"
          required
          onChange={(event) => {
            setDepartment(event.target.value);
            setDepartmentError("");
          }}
          aria-invalid={Boolean(departmentError)}
          aria-describedby={
            departmentError ? "employee-department-error" : undefined
          }
        />
        {departmentError && (
          <span
            id="employee-department-error"
            className="form-error"
            role="alert"
          >
            {departmentError}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-location">Location</label>
        <input
          id="employee-location"
          name="location"
          type="text"
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            setLocationError("");
          }}
          aria-required="true"
          required
          aria-invalid={Boolean(locationError)}
          aria-describedby={
            locationError ? "employee-location-error" : undefined
          }
        />

        {locationError && (
          <span
            id="employee-location-error"
            className="form-error"
            role="alert"
          >
            {locationError}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-role">Role</label>
        <input
          id="employee-role"
          name="role"
          type="text"
          aria-required="true"
          value={role}
          onChange={(event) => {
            setRole(event.target.value);
            setRoleError("");
          }}
          required
          aria-invalid={Boolean(roleError)}
          aria-describedby={roleError ? "employee-role-error" : undefined}
        />
        {roleError && (
          <span id="employee-role-error" className="form-error" role="alert">
            {roleError}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="employee-status">Status</label>
        <select
          id="employee-status"
          name="status"
          value={status}
          aria-required="true"
          required
          onChange={(event) =>
            setStatus(event.target.value as Employee["status"])
          }
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="employee-edit-actions">
        <button type="submit" disabled={isSaving}>
          {isSaving
    ? mode === "create"
      ? "Creating..."
      : "Saving..."
    : mode === "create"
      ? "Create Employee"
      : "Save Changes"}
        </button>
        <button type="button" onClick={onCancel} disabled={isSaving}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
