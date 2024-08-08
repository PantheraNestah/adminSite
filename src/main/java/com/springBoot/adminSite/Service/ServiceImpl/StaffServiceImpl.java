package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;
import com.springBoot.adminSite.Repository.StaffRepo;
import com.springBoot.adminSite.Service.EmailService;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class    StaffServiceImpl implements StaffService {
    @Autowired
    private StaffDto staffDto;
    @Autowired
    private StaffRepo staffRepo;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private FilesService filesService;
    @Override
    public String registerStaff(StaffDto staff) {
        Staff staffEntity = new Staff();
        staffEntity.setName(staff.getName());
        staffEntity.setEmail(staff.getEmail());
        staffEntity.setPhone(staff.getPhone());
        staffEntity.setRole(staff.getRole());
        staffEntity.setDepartment(staff.getDepartment());
        staffRepo.save(staffEntity);
        staffSetPasswordMail(staff.getEmail());
        return ("\n\n\t\tStaff saved successfully");
    }
    @Override
    public String registerStaffs(List<StaffDto> staffDtos) {
        List<Staff> staffList = staffDtos.stream()
                .map(this::mapDtoToEntity)
                .toList();
        staffRepo.saveAll(staffList);
        staffList.stream()
                .map(staff -> staffSetPasswordMail(staff.getEmail()))
                .toList();
        return ("Multiple staffs registration successful");
    }
    @Override
    public String updateStaff(StaffDto staffDto) {
        Staff staff = staffRepo.findById(staffDto.getId()).get();
        staff.setEmail(staffDto.getEmail());
        staff.setPhone(staffDto.getPhone());
        staff.setLnHandle(staffDto.getLnHandle());
        staff.setXhandle(staffDto.getXhandle());
        staffRepo.save(staff);
        return ("Staff details successfully updated");
    }
    @Override
    public String updatePhoto(MultipartFile file, Long staffId)
    {
        String expectedMsg = "File: " + file.getOriginalFilename() + " saved successfully";
        String msg = filesService.saveStaffPhoto(file);
        if(msg.equals(expectedMsg))
        {
            Staff staff = staffRepo.findById(staffId).get();
            staff.setProfileImage(file.getOriginalFilename());
            staffRepo.save(staff);
        }
        return (msg);
    }
    @Override
    public Resource retrieveStaffPhoto(String filename)
    {
        return (filesService.retrieveStaffPhoto(filename));
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
    public Staff findUserByEmail(String email) {
        System.out.println("\n\n" + email + "\n");
        Staff staffEntity = staffRepo.findByEmail(email);
        return (staffEntity);
    }
    @Override
    public StaffDto findStaffByEmail(String email) {
        Staff staffEntity = staffRepo.findByEmail(email);
        return (mapEntityToDto(staffEntity));
    }
    @Override
    public List<StaffDto> getAllStaff() {
        List<Staff> staffEntities = staffRepo.findAll();
        List<StaffDto> staffDtos = staffEntities.stream()
                .map(this::mapEntityToDto)
                .toList();
        return staffDtos;
    }

    private StaffDto mapEntityToDto(Staff staffEntity) {
        StaffDto staffDto1 = new StaffDto();
        staffDto1.setId(staffEntity.getId());
        staffDto1.setName(staffEntity.getName());
        staffDto1.setEmail(staffEntity.getEmail());
        staffDto1.setPhone(staffEntity.getPhone());
        staffDto1.setPassword(staffEntity.getPassword());
        staffDto1.setPhoto(staffEntity.getProfileImage());
        staffDto1.setXhandle(staffEntity.getXhandle());
        staffDto1.setLnHandle(staffEntity.getLnHandle());
        staffDto1.setRole(staffEntity.getRole());
        staffDto1.setDepartment(staffEntity.getDepartment());

        return (staffDto1);
    }
    private Staff mapDtoToEntity(StaffDto staffDto) {
        Staff staff = new Staff();
        staff.setId(staffDto.getId());
        staff.setName(staffDto.getName());
        staff.setEmail(staffDto.getEmail());
        staff.setPhone(staffDto.getPhone());
        staff.setPassword(staffDto.getPassword());
        staff.setProfileImage(staffDto.getPhoto());
        staff.setXhandle(staffDto.getXhandle());
        staff.setLnHandle(staffDto.getLnHandle());
        staff.setRole(staffDto.getRole());
        staff.setDepartment(staffDto.getDepartment());

        return (staff);
    }
}
