package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.StaffDetails;
import com.springBoot.adminSite.Entities.Staff;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class StaffDetailsService2 implements UserDetailsService {
    @Autowired
    private StaffService staffService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Staff staff = staffService.findUserByEmail(email);

        return (
            new StaffDetails(staff)
        );
    }
}
