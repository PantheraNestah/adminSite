package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;
import com.springBoot.adminSite.Repository.StaffRepo;
import com.springBoot.adminSite.Service.EmailService;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public String registerStaff(StaffDto staff) {
        Staff staffEntity = new Staff();
        staffEntity.setName(staff.getName());
        staffEntity.setEmail(staff.getEmail());
        staffEntity.setPhone(staff.getPhone());
        staffEntity.setRole(staff.getRole());
        staffRepo.save(staffEntity);
        staffSetPasswordMail(staff.getEmail());
        return ("\n\n\t\tStaff saved successfully");
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
        staffEntity.setPassword(passwordEncoder.encode(idnPassword.getPassword()));
        staffRepo.save(staffEntity);
        return ("Staff password set successfully");
    }

    @Override
    public StaffDto findUserByEmail(String email) {
        Staff staffEntity = staffRepo.findByEmail(email);
        staffDto.setId(staffEntity.getId());
        staffDto.setName(staffEntity.getName());
        staffDto.setEmail(staffEntity.getEmail());
        staffDto.setPhone(staffEntity.getPhone());
        staffDto.setPassword(staffEntity.getPassword());
        staffDto.setPhoto(staffEntity.getProfileImage());
        staffDto.setXHandle(staffEntity.getXHandle());
        staffDto.setLnHandle(staffEntity.getLnHandle());
        staffDto.setRole(staffEntity.getRole());
        return (staffDto);
    }
}
