package com.employee.service;

import com.employee.entity.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

 
    public Employee saveEmployee(Employee employee) {
        try {
            return employeeRepository.save(employee);
        } catch (Exception e) {
            throw new RuntimeException("Error saving employee: " + e.getMessage());
        }
    }


  
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

 
    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        
        if (existingEmployee == null) {
            return null; // Employee not found
        }
        if (updatedEmployee.getName() != null) existingEmployee.setName(updatedEmployee.getName());
        if (updatedEmployee.getRole() != null) existingEmployee.setRole(updatedEmployee.getRole());
        if (updatedEmployee.getDateOfJoining() != null) existingEmployee.setDateOfJoining(updatedEmployee.getDateOfJoining());
        if (updatedEmployee.getEmail() != null) existingEmployee.setEmail(updatedEmployee.getEmail());

        return employeeRepository.save(existingEmployee);
    }


    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
