package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ProjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProjectService {
    String registerProject(ProjectDto projectDto);
    String updateProject(ProjectDto projectDto);
    String saveProjectPhoto(MultipartFile file, Long projectId);
    String registerProjects(List<ProjectDto> projectDtoList);
    List<ProjectDto> retrieveAll();
}
