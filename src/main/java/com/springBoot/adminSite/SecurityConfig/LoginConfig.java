package com.springBoot.adminSite.SecurityConfig;

import com.springBoot.adminSite.Service.ServiceImpl.StaffDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

//@Configuration
//@EnableWebSecurity
public class LoginConfig {
    //@Autowired
    //private StaffDetailsService staffDetailsService;
    //@Autowired
    /*private LoginSuccesshandler successhandler;
    @Bean
    GrantedAuthorityDefaults grantedAuthorityDefaults()
    {
        return new GrantedAuthorityDefaults("");
    }
    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return (new BCryptPasswordEncoder());
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/js/**", "/css/**", "/imgs/**", "/meladen/staff/register", "/meladen/staff/setPassword").permitAll()
                        .requestMatchers("/meladen/staff/all", "/api/**").hasAnyAuthority("Admin", "Staff")
                        .anyRequest().authenticated()
                )
                .formLogin(
                        form -> form
                                .loginPage("/meladen/login")
                                .loginProcessingUrl("/meladen/login")
                                .successHandler(successhandler)
                                .permitAll()
                )
                .logout(
                        logout -> logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/meladen/logout"))
                                .permitAll()
                );
        return (http.build());
    }

     */
}
