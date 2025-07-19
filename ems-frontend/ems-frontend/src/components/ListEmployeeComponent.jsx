import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  };

  // Delete Employee
  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  // Navigate to Update Employee Form
  const editEmployee = (id) => {
    navigate(`/update-employee/${id}`);
  };

  return (
    <div className="container">
      <h2 className="text-center fw-semibold">List Of Employees</h2>
      <button 
        className="btn btn-dark border-light text-white mx-2"
        onClick={() => navigate("/add-employee")}
      >➕ Add Employee</button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Name</th>
            <th>Role</th>
            <th>Date Of Joining</th>
            <th>Email</th>
            <th>Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.dateOfJoining}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => editEmployee(employee.id)}
                >
                  ✏ Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
