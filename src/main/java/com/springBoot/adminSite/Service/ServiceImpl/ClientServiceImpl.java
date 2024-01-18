package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Entities.Client;
import com.springBoot.adminSite.Repository.ClientRepo;
import com.springBoot.adminSite.Repository.ProjectRepo;
import com.springBoot.adminSite.Service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    ClientRepo clientRepo;
    @Autowired
    ProjectRepo projectRepo;
    @Autowired
    Client clientEntity;
    @Autowired
    ClientDto clientDtoMain;
    @Override
    public String registerClient(ClientDto clientDto) {
        clientEntity.setName(clientDto.getName());
        clientEntity.setEmail(clientDto.getEmail());
        clientEntity.setPhone(clientDto.getPhone());
        clientEntity.setProject(projectRepo.findById(clientDto.getProjId()).get());
        clientRepo.save(clientEntity);
        return ("Client registration Successful");
    }

    @Override
    public List<ClientDto> retrieveByProjId(Long id) {
        List<Client> clientEntities = clientRepo.findByProjId(id);
        List<ClientDto> clientDtos = clientEntities.stream()
                .map(this::mapEntityToDto)
                .toList();
        return (clientDtos);
    }

    public ClientDto mapEntityToDto(Client client)
    {
        ClientDto clientDto = new ClientDto();
        clientDto.setId(client.getId());
        clientDto.setName(client.getName());
        clientDto.setEmail(client.getEmail());
        clientDto.setPhone(client.getPhone());
        clientDto.setProjId(client.getProject().getId());
        return (clientDto);
    }
}
