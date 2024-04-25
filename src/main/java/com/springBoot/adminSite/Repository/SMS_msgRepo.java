package com.springBoot.adminSite.Repository;

import com.springBoot.adminSite.Entities.SMS_msg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SMS_msgRepo extends JpaRepository<SMS_msg, Long> {
    @Query(
            value = "SELECT * FROM sms_msg m WHERE m.projId = ?1",
            nativeQuery = true
    )
    List<SMS_msg> findByProjId(Long projId);
}
