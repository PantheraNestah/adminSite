package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String from;
    @Value("${email.host}")
    private String mailHost;
    @Override
    public String setPasswordMail(StaffDto staffDto) {
        String respMsg = "";
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper msgHelper = new MimeMessageHelper(mimeMessage);
            msgHelper.setSubject("Set Password");
            msgHelper.setFrom(from);
            msgHelper.setTo(staffDto.getEmail());
            msgHelper.setPriority(1);

            String urlLink = String.format("%s/meladen/staff/setPassword?id=%d", mailHost, staffDto.getId());
            Context ctx = new Context();
            ctx.setVariables(Map.of("passwordLink", urlLink, "staffname", staffDto.getName()));
            String mailText = templateEngine.process("staffMailTemplate.html", ctx);
            msgHelper.setText(mailText, true);
            mailSender.send(mimeMessage);
            respMsg = "Email successfully sent";
        }catch (Exception ex)
        {
            respMsg = ex.getMessage();
        }
        return (respMsg);
    }
}
