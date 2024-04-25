package com.springBoot.adminSite.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;
    @Column(name = "phone", length = 14)
    private String phone;
    @Column(name = "password")
    private String password;
    @Column(name = "role", length = 6)
    private String role;
    @Column(name = "department", length = 100)
    private String department;
    @Lob
    @Column(name = "photo")
    private String profileImage;
    @Column(name = "x_handle", length = 100)
    private String xhandle;
    @Column(name = "ln_handle", length = 100)
    private String lnHandle;
}
