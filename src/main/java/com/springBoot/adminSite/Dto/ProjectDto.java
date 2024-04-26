package com.springBoot.adminSite.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDto {
    private Long id;
    private String prodName;
    private Long prodValue;
    private String photo;
    private LocalDate creationDate;
    private List<ClientDto> clientDtos;
}
