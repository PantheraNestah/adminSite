package com.springBoot.adminSite.Service.ServiceImpl;

import jakarta.annotation.PostConstruct;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FilesService {
    @Value("${PROJ_FILES}")
    private String PROJ_FILES;
    @Value("${ADMIN_FILES}")
    private String ADMIN_FILES;
    private Path rootLocation1;
    private Path rootLocation2;

    @PostConstruct
    public void init()
    {
        this.rootLocation1 = Paths.get(ADMIN_FILES);
        this.rootLocation2 = Paths.get(PROJ_FILES);
    }
    public String saveStaffPhoto(MultipartFile file)
    {
        try {
            String f_name = file.getOriginalFilename();
            if(f_name != null && !f_name.isEmpty())
            {
                Files.copy(file.getInputStream(), this.rootLocation1.resolve(f_name));
            }
            return ("File: " + f_name + " saved successfully");
        }
        catch (Exception ex)
        {
            return ("Failed to store file! " + ex.getMessage());
        }
    }
    public String saveProjectPhoto(MultipartFile file)
    {
        try {
            String f_name = file.getOriginalFilename();
            if(f_name != null && !f_name.isEmpty())
            {
                Files.copy(file.getInputStream(), this.rootLocation2.resolve(f_name));
            }
            return ("File: " + f_name + " saved successfully");
        }
        catch (Exception ex)
        {
            return ("Failed to store file! " + ex.getMessage());
        }
    }
    public Resource retrieveStaffPhoto(String fileName) {
        try {
            Path filePath = this.rootLocation1.resolve(fileName);
            System.out.println("\n\n\t" +filePath + "\n");
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                System.out.println("\n\n\tResource exists: " + resource + "\n\n");
                return (resource);
            }
            else {
                System.out.println("\n\n\tResource doesn't exist!\n\n");
                return (null);
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return (null);
        }
    }
}
