package com.springBoot.adminSite.webController;

import com.springBoot.adminSite.Dto.HttpResponse;
import com.springBoot.adminSite.SecurityConfig.AuthRequest;
import com.springBoot.adminSite.Service.ServiceImpl.JwtService;
import com.springBoot.adminSite.Service.ServiceImpl.StaffDetailsService2;
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
    @Autowired
    private StaffDetailsService2 staffDetailsService2;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/generateToken")
    public ResponseEntity<HttpResponse> authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        //System.out.println("\n\n\t" + authRequest + "\n");
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        Map<String, Object> auth_details = new HashMap<>();
        if (authentication.isAuthenticated()) {
            auth_details = jwtService.generateToken(authRequest.getUsername());
            String token = auth_details.get("token").toString();
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
