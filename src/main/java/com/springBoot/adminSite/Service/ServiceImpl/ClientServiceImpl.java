package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.ClientDto;
import com.springBoot.adminSite.Dto.MessageDto;
import com.springBoot.adminSite.Entities.Client;
import com.springBoot.adminSite.Repository.ClientRepo;
import com.springBoot.adminSite.Repository.ProjectRepo;
import com.springBoot.adminSite.Service.ClientService;
import com.springBoot.adminSite.Service.EmailService;
import com.springBoot.adminSite.Service.smsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImpl implements ClientService {
    @Autowired
    private ClientRepo clientRepo;
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private ClientDto clientDtoMain;
    @Autowired
    private EmailService emailService;
    @Autowired
    private smsService smsService;
    @Override
    public String registerClient(ClientDto clientDto) {
        Client clientEntity = new Client();
        clientEntity.setName(clientDto.getName());
        clientEntity.setEmail(clientDto.getEmail());
        clientEntity.setPhone(clientDto.getPhone());
        clientEntity.setRegistrationDate(clientDto.getRegistrationDate());
        clientEntity.setProject(projectRepo.findById(clientDto.getProdId()).get());
        clientRepo.save(clientEntity);
        return ("Client registration Successful");
    }

    @Override
    public String registerClients(List<ClientDto> clientDtos) {
        List<Client> clients = clientDtos.stream()
                .map(this::mapDtoToEntity)
                .toList();
        clientRepo.saveAll(clients);
        return "Clients List registration successful";
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
        clientDto.setProdId(client.getProject().getId());
        return (clientDto);
    }
    public Client mapDtoToEntity(ClientDto clientDto)
    {
        Client clientEntity = new Client();
        clientEntity.setName(clientDto.getName());
        clientEntity.setEmail(clientDto.getEmail());
        clientEntity.setPhone(clientDto.getPhone());
        clientEntity.setRegistrationDate(clientDto.getRegistrationDate());
        clientEntity.setProject(projectRepo.findById(clientDto.getProdId()).get());
        return (clientEntity);
    }

    @Override
    public String bulkClientMail(MessageDto messageDto) {
        //List<Client> clientList = clientRepo.findByProjId(messageDto.getProdId());
        emailService.bulkClientMail(messageDto.getClients(), messageDto.getSubject(), messageDto.getMessage(), messageDto.getProdId(), messageDto.getDate());
        return ("Bulk client Mail successfully sent");
    }
    @Override
    public String bulkClientSms(MessageDto messageDto) {
        List<String> clients = messageDto.getClients().stream()
                .map((client) -> {return client.getPhone();})
                .toList();
        String[] contactArray = clients.toArray(new String[0]);
        smsService.sendClientSms(messageDto.getSubject(), messageDto.getMessage(), contactArray, messageDto.getProdId(), messageDto.getDate());
        return ("Bulk client SMS successfully sent");
    }
}
