package com.employee.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;

    @Temporal(TemporalType.DATE)
    private Date dateOfJoining;

    @Column(unique = true)
    private String email;

 
    public Employee() {}

    public Employee(String name, String role, Date dateOfJoining, String email) {
        this.name = name;
        this.role = role;
        this.dateOfJoining = dateOfJoining;
        this.email = email;
    }

  
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Date getDateOfJoining() { return dateOfJoining; }
    public void setDateOfJoining(Date dateOfJoining) { this.dateOfJoining = dateOfJoining; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
