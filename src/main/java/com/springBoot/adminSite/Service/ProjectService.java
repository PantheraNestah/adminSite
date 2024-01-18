package com.springBoot.adminSite.Service;

import com.springBoot.adminSite.Dto.ProjectDto;

import java.util.List;

public interface ProjectService {
    String registerProject(ProjectDto projectDto);
    List<ProjectDto> retrieveAll();
}
