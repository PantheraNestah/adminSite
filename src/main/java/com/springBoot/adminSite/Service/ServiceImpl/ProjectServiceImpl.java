package com.springBoot.adminSite.Service.ServiceImpl;

import com.springBoot.adminSite.Dto.ProjectDto;
import com.springBoot.adminSite.Entities.Project;
import com.springBoot.adminSite.Repository.ProjectRepo;
import com.springBoot.adminSite.Service.ClientService;
import com.springBoot.adminSite.Service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    @Autowired
    private FilesService filesService;
    @Override
    public String registerProject(ProjectDto projectDto) {
        Project projectEntity = new Project();
        projectEntity.setName(projectDto.getProdName());
        projectEntity.setValue(projectDto.getProdValue());
        projectEntity.setPhoto(projectDto.getPhoto());
        projectEntity.setDateCreated(projectDto.getCreationDate());
        projectRepo.save(projectEntity);
        return ("Project Registration Successful");
    }
    @Override
    public String updateProject(ProjectDto projectDto)
    {
        Project project = mapDtoToEntity(projectDto);
        projectRepo.save(project);
        return ("Project updated successfully");
    }
    @Override
    public String saveProjectPhoto(MultipartFile file, Long projectId)
    {
        String expectedMsg = "File: " + file.getOriginalFilename() + " saved successfully";
        String msg = filesService.saveProjectPhoto(file);
        if(msg.equals(expectedMsg))
        {
            Project project = projectRepo.findById(projectId).get();
            project.setPhoto(file.getOriginalFilename());
            projectRepo.save(project);
        }
        return (msg);
    }
    @Override
    public String registerProjects(List<ProjectDto> projectDtoList) {
        List<Project> projects = projectDtoList.stream()
                .map(this::mapDtoToEntity)
                .toList();
        projectRepo.saveAll(projects);
        return ("Projects Registration successful");
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
        projectDto.setProdName(projectEntity.getName());
        projectDto.setProdValue(projectEntity.getValue());
        projectDto.setPhoto(projectEntity.getPhoto());
        projectDto.setCreationDate(projectEntity.getDateCreated());
        projectDto.setClientDtos(clientService.retrieveByProjId(projectEntity.getId()));
        return (projectDto);
    }
    public Project mapDtoToEntity(ProjectDto projectDto){
        Project projectEntity = new Project();
        projectEntity.setId(projectDto.getId());
        projectEntity.setName(projectDto.getProdName());
        projectEntity.setValue(projectDto.getProdValue());
        projectEntity.setPhoto(projectDto.getPhoto());
        projectEntity.setDateCreated(projectDto.getCreationDate());
        return (projectEntity);
    }
}
