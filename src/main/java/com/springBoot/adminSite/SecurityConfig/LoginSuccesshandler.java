package com.springBoot.adminSite.SecurityConfig;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;

@Component
public class LoginSuccesshandler implements AuthenticationSuccessHandler {
    SimpleUrlAuthenticationSuccessHandler adminHandler =
            new SimpleUrlAuthenticationSuccessHandler("/meladen/home?admin=1");
    SimpleUrlAuthenticationSuccessHandler staffHandler =
            new SimpleUrlAuthenticationSuccessHandler("/meladen/home?admin=0");
    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (final GrantedAuthority grantedAuthority : authorities)
        {
            String authorityName = grantedAuthority.getAuthority();
            if (authorityName.equals("Admin"))
            {
                this.adminHandler.onAuthenticationSuccess(
                        request,
                        response,
                        authentication
                );
                return;
            }
            this.staffHandler.onAuthenticationSuccess(
                    request,
                    response,
                    authentication
            );
        }
    }
}
