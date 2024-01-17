package com.springBoot.adminSite.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "staff")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    @Column(name = "email", nullable = false, length = 100)
    private String email;
    @Column(name = "phone", length = 14)
    private String phone;
    @Column(name = "password")
    private String password;
    @Lob
    @Column(name = "photo", columnDefinition = "BLOB")
    private byte[] profileImage;
    @Column(name = "x_handle", length = 100)
    private String xHandle;
    @Column(name = "ln_handle", length = 100)
    private String lnHandle;
}
