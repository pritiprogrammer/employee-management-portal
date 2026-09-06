import { http, HttpResponse } from "msw";
import { employees } from "./data/employees";
import type { Employee } from "../types/employee.types";

export const handlers = [
  http.get("/api/employees", () => {
    return HttpResponse.json(employees);
  }),

  http.get("/api/employees/:id", ({ params }) => {
    const employeeId = Number(params.id);

    const employee = employees.find(
      (employee) => employee.id === employeeId,
    );

    if (!employee) {
      return HttpResponse.json(
        { message: "Employee not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(employee);
  }),

  http.put("/api/employees/:id", async ({ params, request }) => {
  const employeeId = Number(params.id);

  const employeeIndex = employees.findIndex(
    (employee) => employee.id === employeeId,
  );

  if (employeeIndex === -1) {
    return HttpResponse.json(
      { message: "Employee not found" },
      { status: 404 },
    );
  }

  const updatedEmployee = (await request.json()) as Employee;

  employees[employeeIndex] = updatedEmployee;

  return HttpResponse.json(updatedEmployee);
}),
http.delete("/api/employees/:id", ({ params }) => {
  const employeeId = Number(params.id);

  const employeeIndex = employees.findIndex(
    (employee) => employee.id === employeeId,
  );

  if (employeeIndex === -1) {
    return HttpResponse.json(
      { message: "Employee not found" },
      { status: 404 },
    );
  }

  employees.splice(employeeIndex, 1);

  return new HttpResponse(null, {
    status: 204,
  });
}),
http.post("/api/employees", async ({ request }) => {
  const employeeData = (await request.json()) as Omit<Employee, "id">;

  const nextId =
    employees.length > 0
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 1;

  const newEmployee: Employee = {
    id: nextId,
    ...employeeData,
  };

  employees.push(newEmployee);

  return HttpResponse.json(newEmployee, {
    status: 201,
  });
}),
];