package com.springBoot.adminSite.Repository;

import com.springBoot.adminSite.Entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepo extends JpaRepository<Project, Long> {
    Project findByName(String name);
}
