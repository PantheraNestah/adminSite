package com.springBoot.adminSite.Service.ServiceImpl;

import com.africastalking.AfricasTalking;
import com.africastalking.SmsService;
import com.africastalking.sms.Recipient;
import com.springBoot.adminSite.Service.smsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class smsServiceImp implements smsService {
    @Value("${USER_NAME}")
    private String username;
    @Value("${API_KEY}")
    private String apikey;
    @Override
    public String sendClientSms(String message, String[] contacts) {
        AfricasTalking.initialize(this.username,this.apikey);
        SmsService sms = AfricasTalking.getService(AfricasTalking.SERVICE_SMS);
        try {
            List<Recipient> response = sms.send(message, contacts, true);
        }catch (IOException ex)
        {
            ex.printStackTrace();
        }
        return ("Bulk Sms sent successfully...");
    }
}
