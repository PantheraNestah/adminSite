package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Staff;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Configuration
public class StaffDetailsService implements UserDetailsService {
    @Autowired
    private StaffService staffService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Staff staff = staffService.findUserByEmail(email);
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(staff.getRole()));
        System.out.println("\n\n\t\t" + authorities + "\n\n");
        return (
                new org.springframework.security.core.userdetails.User(
                        staff.getEmail(),
                        staff.getPassword(),
                        authorities
                )
        );
    }
}
