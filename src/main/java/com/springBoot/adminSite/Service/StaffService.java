package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;

import java.util.List;

public interface StaffService {
    String registerStaff(StaffDto staff);
    String registerStaffs(List<StaffDto> staffDtos);
    String updateStaff(StaffDto staffDto);
    String staffSetPasswordMail(String eMail);
    String saveStaffPassword(IdnPassword idnPassword);
    Staff findUserByEmail(String email);
    StaffDto findStaffByEmail(String email);
    List<StaffDto> getAllStaff();
}
