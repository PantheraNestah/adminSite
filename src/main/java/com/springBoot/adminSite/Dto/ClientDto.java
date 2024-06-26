package com.springBoot.adminSite.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    private Long id;
    private Long prodId;
    private String name;
    private String email;
    private String phone;
    private LocalDate registrationDate;
}
