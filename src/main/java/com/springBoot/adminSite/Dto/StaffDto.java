package com.springBoot.adminSite.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StaffDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String password;
    private String role;
    private String xhandle;
    private String lnHandle;
    private String photo;
    private String department;
}
