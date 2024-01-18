package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.ProjectDto;
import com.springBoot.adminSite.Entities.Project;
import com.springBoot.adminSite.Repository.ProjectRepo;
import com.springBoot.adminSite.Service.ClientService;
import com.springBoot.adminSite.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private ProjectDto projectDtoMain;
    @Autowired
    private ClientService clientService;
    @Override
    public String registerProject(ProjectDto projectDto) {
        Project projectEntity = new Project();
        projectEntity.setName(projectDto.getName());
        projectEntity.setValue(projectDto.getValue());
        projectEntity.setPhoto(projectDto.getPhoto());
        projectRepo.save(projectEntity);
        return ("Project Registration Successful");
    }

    @Override
    public List<ProjectDto> retrieveAll() {
        List<Project> projectEntities = projectRepo.findAll();
        List<ProjectDto> projectDtoList = projectEntities.stream()
                .map(this::mapEntityToDto)
                .toList();
        return (projectDtoList);
    }
    public ProjectDto mapEntityToDto(Project projectEntity){
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(projectEntity.getId());
        projectDto.setName(projectEntity.getName());
        projectDto.setValue(projectEntity.getValue());
        projectDto.setPhoto(projectEntity.getPhoto());
        projectDto.setClientDtos(
                projectEntity.getClients().stream()
                        .map(entity -> clientService.mapEntityToDto(entity))
                        .collect(Collectors.toList())
        );
        return (projectDto);
    }
}
