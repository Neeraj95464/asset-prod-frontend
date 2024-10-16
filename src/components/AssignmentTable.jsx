import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deleteAssignment } from "../services/api";

const AssignmentTable = ({ assignments, refreshAssignments }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await deleteAssignment(id);
        refreshAssignments();
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Person
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assignment Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <tr key={assignment.assignmentId}>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.asset.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.person.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.assignmentDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {assignment.returnDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    assignment.status === "ACTIVE"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {assignment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <FiEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(assignment.assignmentId)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
          {assignments.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No assignments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
