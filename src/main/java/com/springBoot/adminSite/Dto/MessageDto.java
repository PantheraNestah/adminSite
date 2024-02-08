package com.springBoot.adminSite.Dto;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
public class MessageDto {
    private String subject;
    private String msg;
    private Long prodId;
    private List<ClientDto> clients;
}
