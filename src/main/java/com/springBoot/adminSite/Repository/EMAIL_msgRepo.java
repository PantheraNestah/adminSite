package com.springBoot.adminSite.Repository;

import com.springBoot.adminSite.Entities.EMAIL_msg;
import com.springBoot.adminSite.Entities.SMS_msg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EMAIL_msgRepo extends JpaRepository<EMAIL_msg, Long> {
    @Query(
            value = "SELECT * FROM email_msg m WHERE m.projId = ?1",
            nativeQuery = true
    )
    List<EMAIL_msg> findByProjId(Long projId);
}
