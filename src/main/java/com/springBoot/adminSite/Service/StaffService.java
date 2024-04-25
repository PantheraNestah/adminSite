package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;
import jakarta.mail.Multipart;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StaffService {
    String registerStaff(StaffDto staff);
    String registerStaffs(List<StaffDto> staffDtos);
    String updateStaff(StaffDto staffDto);
    String updatePhoto(MultipartFile file, Long staffId);
    public Resource retrieveStaffPhoto(String filename);
    String staffSetPasswordMail(String eMail);
    String saveStaffPassword(IdnPassword idnPassword);
    Staff findUserByEmail(String email);
    StaffDto findStaffByEmail(String email);
    List<StaffDto> getAllStaff();
}
