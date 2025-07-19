import axios from "axios";

const BASE_URL = "http://localhost:5050/employee";

export const listEmployees = () => axios.get(`${BASE_URL}/all`);

export const createEmployee = (employee) => axios.post(`${BASE_URL}/add`, employee);

export const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);

export const updateEmployee = (id, employee) => axios.put(`${BASE_URL}/update/${id}`, employee);

export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/delete/${id}`);
