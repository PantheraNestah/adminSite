package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Client;

import java.util.List;

public interface EmailService {
    String setPasswordMail(StaffDto staffDto);
    List<String> bulkClientMail(List<ClientDto> clientList, String subject, String message);
}
