package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    String registerProject(ProjectDto projectDto);
    String registerProjects(List<ProjectDto> projectDtoList);
    List<ProjectDto> retrieveAll();
}
