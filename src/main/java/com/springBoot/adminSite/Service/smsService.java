package com.springBoot.adminSite.Service;

public interface smsService {
    String sendClientSms(String message, String[] contacts);
}
