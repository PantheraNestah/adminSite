package com.springBoot.adminSite.webController;

import com.springBoot.adminSite.Dto.HttpResponse;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.SecurityConfig.AuthRequest;
import com.springBoot.adminSite.Service.ServiceImpl.StaffDetailsService2;
import com.springBoot.adminSite.Service.ServiceImpl.TokenService;
import com.springBoot.adminSite.Service.StaffService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger Log = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private StaffService staffService;

    public AuthController(TokenService tokenService, StaffService staffService1) {
        this.tokenService = tokenService;
        this.staffService = staffService1;
    }

    @PostMapping("/generateToken")
    public ResponseEntity<HttpResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        StaffDto staffDto = staffService.findStaffByEmail(authRequest.getUsername());
        Map<String, Object> auth_details = new HashMap<>();
        if (authentication.isAuthenticated()) {
            Log.debug("Token Requested for user: '{}'", authentication.getName());
            auth_details = tokenService.generateToken(authentication);
            auth_details.put("staff_data", staffDto);
            String token = auth_details.get("token").toString();
            Log.debug("Token granted: {}", token);
            return (
                ResponseEntity.ok().body(HttpResponse.builder()
                                .message(token)
                                .data(auth_details) 
                                .requestMethod("POST")
                                .status(HttpStatus.OK)
                                .statusCode(HttpStatus.OK.value())
                        .build()
                )
            );
        } else {
            throw new UsernameNotFoundException("invalid user request");
        }
    }
}
