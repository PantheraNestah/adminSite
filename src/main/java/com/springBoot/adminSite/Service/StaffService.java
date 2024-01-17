package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;

public interface StaffService {
    String registerStaff(StaffDto staff);
    String staffSetPasswordMail(String eMail);
    String saveStaffPassword(IdnPassword idnPassword);
}
