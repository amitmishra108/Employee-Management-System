import React, { useState } from 'react';
import { createEmployee } from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const EmployeeComponent = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Function to validate form inputs
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Name validation (only letters and spaces, min 3 characters)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    } else if (!nameRegex.test(name)) {
      newErrors.name = 'Name should not contain numbers or special characters';
      isValid = false;
    }

    // Role validation (required, min 3 characters)
    if (!role.trim()) {
      newErrors.role = 'Role is required';
      isValid = false;
    } else if (role.length < 3) {
      newErrors.role = 'Role must be at least 3 characters';
      isValid = false;
    }

    // Date validation (must be today or a past date)
    if (!dateOfJoining) {
      newErrors.dateOfJoining = 'Date of Joining is required';
      isValid = false;
    } else {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      if (dateOfJoining > today) {
        newErrors.dateOfJoining = 'Date of Joining cannot be a future date';
        isValid = false;
      }
    }

    // Email validation (must be in correct format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  function saveEmployee(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const employee = { name, role, dateOfJoining, email };
    console.log('Adding Employee:', employee);

    createEmployee(employee)
      .then(() => {
        console.log('Employee added successfully');
        navigate('/employees', { replace: true });
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
      });
  }

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-3xl font-bold text-center mb-6">👨‍💼 Add Employee </h2>
          <div className="card-body">
            <form>
              {/* Name Field */}
              <div className="form-group mb-2">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Name"
                  className="w-full p-2 border rounded-lg form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
              </div>

              {/* Role Field */}
              <div className="form-group mb-4">
                <label className="form-label font-semibold">Role</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  className="w-full p-2 border rounded-lg form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                {errors.role && <p className="text-danger">{errors.role}</p>}
              </div>

              {/* Date of Joining Field */}
              <div className="form-group mb-4">
                <label className="form-label font-semibold">Date of Joining</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-lg form-control"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                />
                {errors.dateOfJoining && <p className="text-danger">{errors.dateOfJoining}</p>}
              </div>

              {/* Email Field */}
              <div className="form-group mb-4">
                <label className="form-label font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-2 border rounded-lg form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-success bg-blue-600 text-dark py-3 rounded-lg hover:bg-blue-700 w-100"
                onClick={saveEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
