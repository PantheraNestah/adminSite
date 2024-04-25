package com.springBoot.adminSite.Dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@Data
public class MessageDto {
    private String subject;
    private String message;
    private Long prodId;
    private List<ClientDto> clients;
    private LocalDate date;
}
