package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.StaffDto;

public interface EmailService {
    String setPasswordMail(StaffDto staffDto);
}
