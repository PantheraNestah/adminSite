package com.springBoot.adminSite;

import com.springBoot.adminSite.SecurityConfig.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(RsaKeyProperties.class)
@SpringBootApplication
public class AdminSiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminSiteApplication.class, args);
	}

}
