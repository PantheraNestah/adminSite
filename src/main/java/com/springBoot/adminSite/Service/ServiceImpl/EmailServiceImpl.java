package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Dto.StaffDto;
import com.springBoot.adminSite.Entities.Client;
import com.springBoot.adminSite.Entities.EMAIL_msg;
import com.springBoot.adminSite.Repository.EMAIL_msgRepo;
import com.springBoot.adminSite.Service.EmailService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private EMAIL_msgRepo emailMsgRepo;
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

            String urlLink = String.format("%s/set_password?id=%d", mailHost, staffDto.getId());
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

    @Override
    public List<String> bulkClientMail(List<ClientDto> clientList, String subject, String message, Long projectId, LocalDate date) {
        EMAIL_msg emailMsg = new EMAIL_msg();
        emailMsg.setTitle(subject);
        emailMsg.setBody(message);
        emailMsg.setProjId(projectId);
        emailMsg.setDate(date);
        List<String> responseList = clientList.stream()
                .map(clientDto -> sendClientMail(clientDto,subject, message))
                .toList();
        emailMsgRepo.save(emailMsg);
        return (responseList);
    }
    @Async
    public String sendClientMail(ClientDto client, String subject, String message)
    {
        String str = "";
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setPriority(1);
            helper.setTo(client.getEmail());
            helper.setFrom(from);
            helper.setSubject(subject);

            Context ctx = new Context();
            ctx.setVariables(Map.of("client", client.getName(), "message", message));
            String mailText = templateEngine.process("clientMailTemplate.html", ctx);

            helper.setText(mailText, true);
            mailSender.send(mimeMessage);
            str = "Mail successfully sent";
        } catch (Exception ex)
        {
            str = "Mail not sent due to exception";
            ex.printStackTrace();
        }
        return (str);
    }
}
