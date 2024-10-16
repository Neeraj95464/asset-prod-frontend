import React, { useState, useEffect } from "react";
import { getEmployees, createEmployee, updateEmployee } from "../services/api";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employees from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeData = await getEmployees();
        if (Array.isArray(employeeData)) {
          setEmployees(employeeData);
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError("Error fetching employees. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (newEmployee) => {
    try {
      // Call API to create a new employee
      const createdEmployee = await createEmployee(newEmployee);
      setEmployees((prev) => [...prev, createdEmployee]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      setError("Error adding employee. Please try again.");
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleUpdateEmployee = async (updatedEmployee) => {
    try {
      await updateEmployee(updatedEmployee.employeeId, updatedEmployee);
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.employeeId === updatedEmployee.employeeId ? updatedEmployee : emp
        )
      );
      setShowForm(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Error updating employee. Please try again.");
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Management</h2>

      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setShowForm(true);
                setSelectedEmployee(null);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Add Employee
            </button>
          </div>

          {showForm && (
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={
                selectedEmployee ? handleUpdateEmployee : handleAddEmployee
              }
              closeForm={handleCloseForm}
            />
          )}

          <div className="overflow-x-auto">
            <EmployeeList employees={employees} onEdit={handleEditEmployee} />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeManagement;
