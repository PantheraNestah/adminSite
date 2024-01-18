package com.springBoot.adminSite.Repository;

import com.springBoot.adminSite.Entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClientRepo extends JpaRepository<Client, Long> {
    Client findByEmail(String email);
    @Query(
            value = "SELECT * FROM clients a WHERE a.project_id=?1",
            nativeQuery = true
    )
    List<Client> findByProjId(Long projId);
}
