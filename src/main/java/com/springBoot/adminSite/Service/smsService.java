package com.springBoot.adminSite.Service;

import java.time.LocalDate;
import java.util.Date;

public interface smsService {
    String sendClientSms(String Subject, String message, String[] contacts, Long projectId, LocalDate date);
}
