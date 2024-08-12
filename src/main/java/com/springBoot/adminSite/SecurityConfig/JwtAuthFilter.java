package com.springBoot.adminSite.SecurityConfig;

import com.springBoot.adminSite.My_Exceptions.JwtTokenInvalidException;
import com.springBoot.adminSite.My_Exceptions.JwtTokenMissingException;
import com.springBoot.adminSite.Service.ServiceImpl.JwtService;
import com.springBoot.adminSite.Service.ServiceImpl.StaffDetailsService2;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private StaffDetailsService2 staffDetailsService2;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer "))
        {
            try {
                token = authHeader.substring(7);
                username = jwtService.extractUsername(token);
            } catch (JwtException e) {
                System.out.println("\n\n" + e + "\n\n");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid JWT token");
                return;
            }
        }
        
        if ((username != null && SecurityContextHolder.getContext().getAuthentication() == null))
        {
            UserDetails userDetails = staffDetailsService2.loadUserByUsername(username);
            if (jwtService.validateToken(token, userDetails))
            {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid or expired JWT token");
                return;
            } /*else if (!jwtService.validateToken(token, userDetails)) {
                throw new JwtTokenInvalidException("JWT Token is invalid");
            }*/
        }
        filterChain.doFilter(request, response);
    }
}
