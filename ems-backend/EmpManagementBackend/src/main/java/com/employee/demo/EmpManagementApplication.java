package com.employee.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.employee")

@EntityScan("com.employee.entity")
@EnableJpaRepositories("com.employee.repository")


public class EmpManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmpManagementApplication.class, args);
    }
}
