package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Dto.MessageDto;
import com.springBoot.adminSite.Entities.Client;

import java.util.List;

public interface ClientService {
    String registerClient(ClientDto clientDto);
    String registerClients(List<ClientDto> clientDtos);
    List<ClientDto> retrieveByProjId(Long id);
    ClientDto mapEntityToDto(Client client);
    Client mapDtoToEntity(ClientDto clientDto);
    String bulkClientMail(MessageDto messageDto);

    String bulkClientSms(MessageDto messageDto);
}
