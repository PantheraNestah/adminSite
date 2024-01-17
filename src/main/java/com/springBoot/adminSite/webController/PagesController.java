package com.springBoot.adminSite.webController;

import com.springBoot.adminSite.Dto.IdnPassword;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class PagesController {
    @Autowired
    private StaffService staffService;
    @Autowired
    private IdnPassword idnPassword;
    private Long staffId;
    @GetMapping("/meladen/login")
    public String loginPage(){
        return ("login");
    }
    @GetMapping("/meladen/home")
    public String renderHomePage(){
        return ("home");
    }
    @GetMapping("/meladen/staff")
    public String renderStaffPage(){
        return ("staff");
    }
    @GetMapping("/meladen/staff/register")
    public String staffRegPage(Model model){
        StaffDto staff = new StaffDto();
        model.addAttribute("staff", staff);
        return ("staff-reg");
    }
    @PostMapping("/meladen/staff/register")
    public String registerStaff(@ModelAttribute StaffDto staff)
    {
        System.out.println(staffService.registerStaff(staff));
        return ("redirect:/meladen/login");
    }
    @GetMapping("/meladen/staff/setPassword")
    public String setPasswordPage(@RequestParam Long id, Model model){
        staffId = id;
        idnPassword.setId(id);
        model.addAttribute("idnPassword", idnPassword);
        return ("setPassword");
    }
    @PostMapping("/meladen/staff/setPassword")
    public String updateStaffPassword(@ModelAttribute IdnPassword idnPassword){
        idnPassword.setId(staffId);
        staffService.saveStaffPassword(idnPassword);
        return ("redirect:/meladen/login");
    }
}
