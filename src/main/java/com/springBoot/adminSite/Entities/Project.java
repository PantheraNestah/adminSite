package com.springBoot.adminSite.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", length = 100, unique = true, nullable = false)
    private String name;
    @Column(name = "value")
    private Long value;
    @Lob
    @Column(name = "photo")
    private String photo;
    @Column(name = "date_created")
    @Temporal(TemporalType.DATE)
    private LocalDate dateCreated;
    @OneToMany(mappedBy = "project")
    private List<Client> clients;

}
