import React from "react";

const EmployeeList = ({ employees, onEdit }) => {
  return (
    <div className="overflow-x-auto max-h-60">
      <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Full Name
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Employee ID
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Email
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Department
            </th>
            <th className="p-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr
                key={employee.employeeId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 text-sm">{employee.fullName}</td>
                <td className="p-4 text-sm">{employee.employeeId}</td>
                <td className="p-4 text-sm">{employee.email}</td>
                <td className="p-4 text-sm">{employee.phoneNumber}</td>
                <td className="p-4 text-sm">{employee.department}</td>
                <td className="p-4 text-sm">
                  <button
                    onClick={() => onEdit(employee)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition duration-150"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
