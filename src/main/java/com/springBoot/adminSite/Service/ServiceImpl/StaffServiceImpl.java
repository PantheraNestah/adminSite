package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;
import com.springBoot.adminSite.Repository.StaffRepo;
import com.springBoot.adminSite.Service.EmailService;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffDto staffDto;
    @Autowired
    private StaffRepo staffRepo;
    @Autowired
    private EmailService emailService;
    @Override
    public String registerStaff(StaffDto staff) {
        Staff staffEntity = new Staff();
        staffEntity.setName(staff.getName());
        staffEntity.setEmail(staff.getEmail());
        staffEntity.setPhone(staff.getPhone());
        staffRepo.save(staffEntity);
        staffSetPasswordMail(staff.getEmail());
        return ("Staff saved successfully");
    }

    @Override
    public String staffSetPasswordMail(String eMail) {
        Staff staff = staffRepo.findByEmail(eMail);
        staffDto.setId(staff.getId());
        staffDto.setEmail(staff.getEmail());
        staffDto.setName(staff.getName());
        return (emailService.setPasswordMail(staffDto));
    }
    @Override
    public String saveStaffPassword(IdnPassword idnPassword) {

        Optional<Staff> staffs = staffRepo.findById(idnPassword.getId());
        Staff staffEntity = staffs.get();
        staffEntity.setPassword(idnPassword.getPassword());
        staffRepo.save(staffEntity);
        return ("Staff password set successfully");
    }
}
