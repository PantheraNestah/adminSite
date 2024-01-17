package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Configuration
public class StaffDetailsService implements UserDetailsService {
    @Autowired
    private StaffService staffService;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        StaffDto staffDto = staffService.findUserByEmail(email);
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(staffDto.getRole()));
        return (
                new org.springframework.security.core.userdetails.User(
                        staffDto.getEmail(),
                        staffDto.getPassword(),
                        authorities
                )
        );
    }
}
