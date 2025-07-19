import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";

const UpdateEmployeeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    dateOfJoining: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    const today = new Date().toISOString().split("T")[0];
    
    if (!employee.name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (!/^[A-Za-z ]+$/.test(employee.name)) {
      tempErrors.name = "Name should only contain letters and spaces.";
    }
    if (!employee.role.trim()) {
      tempErrors.role = "Role is required.";
    } else if (!/^[A-Za-z ]+$/.test(employee.role)) {
      tempErrors.role = "Role should only contain letters and spaces.";
    }
    if (!employee.dateOfJoining) {
      tempErrors.dateOfJoining = "Date of Joining is required.";
    } else if (employee.dateOfJoining > today) {
      tempErrors.dateOfJoining = "Date of Joining cannot be in the future.";
    }
    if (!employee.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)) {
      tempErrors.email = "Invalid email format.";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveUpdatedEmployee = (e) => {
    e.preventDefault();
    if (validate()) {
      updateEmployee(id, employee)
        .then(() => {
          navigate("/employees");
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
        });
    }
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-3xl font-bold text-center mb-6">✏ Edit Employee</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={employee.name}
                  onChange={handleChange}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-semibold">Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={employee.role}
                  onChange={handleChange}
                />
                {errors.role && <small className="text-danger">{errors.role}</small>}
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-semibold">Date of Joining</label>
                <input
                  type="date"
                  name="dateOfJoining"
                  className="form-control"
                  value={employee.dateOfJoining}
                  onChange={handleChange}
                />
                {errors.dateOfJoining && <small className="text-danger">{errors.dateOfJoining}</small>}
              </div>

              <div className="form-group mb-4">
                <label className="form-label font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={employee.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <button
                type="submit"
                className="btn btn-success bg-blue-600 text-dark py-3 rounded-lg hover:bg-blue-700 w-100 hover-effec"
                onClick={saveUpdatedEmployee}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateEmployeeComponent;
