package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Entities.Client;

import java.util.List;

public interface ClientService {
    String registerClient(ClientDto clientDto);
    List<ClientDto> retrieveByProjId(Long id);
    ClientDto mapEntityToDto(Client client);
}
