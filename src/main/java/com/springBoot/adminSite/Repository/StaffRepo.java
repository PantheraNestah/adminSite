package com.springBoot.adminSite.Repository;

import com.springBoot.adminSite.Entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepo extends JpaRepository<Staff, Long> {
    Staff findByEmail(String email);
}
