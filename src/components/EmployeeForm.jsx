import React, { useState, useEffect } from "react";

const EmployeeForm = ({ employee, onSubmit, closeForm }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    phoneNumber: "",
    department: "",
    message: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        fullName: employee.fullName,
        employeeId: employee.employeeId,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        department: employee.department,
        message: employee.message,
      });
    } else {
      setFormData({
        fullName: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        message: "",
      }); // Clear form for new employee
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto overflow-auto max-h-[80vh] sm:max-h-none">
      <h3 className="text-lg font-semibold mb-4 text-center">
        {employee ? "Edit Employee" : "Add New Employee"}
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter full name"
          />
        </div>

        {/* Employee ID */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="employeeId"
          >
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            required
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter employee ID"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter email"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter phone number"
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="department"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter department"
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter any additional message"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={closeForm}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {employee ? "Update Employee" : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
