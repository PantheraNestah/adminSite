package com.springBoot.adminSite.Service.ServiceImpl;

import com.africastalking.AfricasTalking;
import com.africastalking.SmsService;
import com.africastalking.sms.Recipient;
import com.springBoot.adminSite.Entities.SMS_msg;
import com.springBoot.adminSite.Repository.SMS_msgRepo;
import com.springBoot.adminSite.Service.smsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class smsServiceImp implements smsService {
    @Autowired
    private SMS_msgRepo smsMsgRepo;
    @Value("${USER_NAME}")
    private String username;
    @Value("${API_KEY}")
    private String apikey;
    @Override
    public String sendClientSms(String subject, String message, String[] contacts, Long projectId, LocalDate date) {
        SMS_msg smsMsg = new SMS_msg();
        AfricasTalking.initialize(this.username,this.apikey);
        SmsService sms = AfricasTalking.getService(AfricasTalking.SERVICE_SMS);
        smsMsg.setTitle(subject);
        smsMsg.setBody(message);
        smsMsg.setDate(date);
        smsMsg.setProjId(projectId);
        smsMsgRepo.save(smsMsg);
        try {
            List<Recipient> response = sms.send(message, contacts, true);
        }catch (IOException ex)
        {
            ex.printStackTrace();
        }
        return ("Bulk Sms sent successfully...");
    }
}
