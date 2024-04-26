package com.springBoot.adminSite.webController;

import com.springBoot.adminSite.Dto.*;
import com.springBoot.adminSite.Service.ClientService;
import com.springBoot.adminSite.Service.ProjectService;
import com.springBoot.adminSite.Service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
public class Apis {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ClientService clientService;
    @Autowired
    private StaffService staffService;
    @GetMapping("/api/projects/all")
    public ResponseEntity<HttpResponse> allProjects()
    {
        return (
              ResponseEntity.ok().body(HttpResponse.builder()
                              .message("All projects Retrieval")
                              .data(Map.of("projects", projectService.retrieveAll()))
                              .requestMethod("GET")
                              .status(HttpStatus.OK)
                              .statusCode(HttpStatus.OK.value())
                      .build()
              )
        );
    }
    @PostMapping("/api/projects/new")
    public ResponseEntity<HttpResponse> registerProject(@RequestBody ProjectDto projectDto)
    {
        String msg = projectService.registerProject(projectDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
            );
    }
    @PostMapping("/api/projects/new/many")
    public ResponseEntity<HttpResponse> registerProjects(@RequestBody List<ProjectDto> projectDtos)
    {
        String msg = projectService.registerProjects(projectDtos);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/projects/update")
    public ResponseEntity<HttpResponse> updateProject(@RequestBody ProjectDto projectDto)
    {
        String msg = projectService.updateProject(projectDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/projects/photo")
    public ResponseEntity<HttpResponse> saveProjectPhoto(@RequestParam("file") MultipartFile file, @RequestParam("id") Long id)
    {
        String msg = projectService.saveProjectPhoto(file, id);
        return (
               ResponseEntity.ok().body(HttpResponse.builder()
                       .message(msg)
                       .requestMethod("POST")
                       .status(HttpStatus.CREATED)
                       .statusCode(HttpStatus.CREATED.value())
                       .build()
               )
        );
    }
    @PostMapping("/api/clients/new")
    public ResponseEntity<HttpResponse> registerClient(@RequestBody ClientDto clientDto)
    {
        String msg = clientService.registerClient(clientDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                                .message(msg)
                                .requestMethod("POST")
                                .status(HttpStatus.CREATED)
                                .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/clients/sms")
    public ResponseEntity<HttpResponse> smsClientsPerProj(@RequestBody MessageDto messageDto)
    {
        System.out.println("\n\n\t" + messageDto + "\n\n");
        String msg = clientService.bulkClientSms(messageDto);

        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/clients/email")
    public ResponseEntity<HttpResponse> emailClientsPerProj(@RequestBody MessageDto messageDto)
    {
        System.out.println("\n\n\t" + messageDto + "\n\n");
        String msg = clientService.bulkClientMail(messageDto);

        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/clients/new/many")
    public ResponseEntity<HttpResponse> registerClients(@RequestBody List<ClientDto> clientDtos)
    {
        String msg = clientService.registerClients(clientDtos);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @GetMapping("/api/staffs/all")
    public ResponseEntity<HttpResponse> fetchAllStaff(){
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message("All Staffs Retrieval success")
                        .data(Map.of("staffs", staffService.getAllStaff()))
                        .requestMethod("GET")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/staffs/new")
    public ResponseEntity<HttpResponse> registerStaff(@RequestBody StaffDto staffDto) {
        String msg = staffService.registerStaff(staffDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/staffs/new/many")
    public ResponseEntity<HttpResponse> registerManyStaff(@RequestBody List<StaffDto> staffDto) {
        String msg = staffService.registerStaffs(staffDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/staffs/edit")
    public ResponseEntity<HttpResponse> editStaff(@RequestBody StaffDto staffDto) {
        System.out.println("\n\n\t\t" + staffDto + "\n\n");
        String msg = staffService.updateStaff(staffDto);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
    @PostMapping("/api/staffs/photo")
    public ResponseEntity<HttpResponse> storePhoto(@RequestParam("file") MultipartFile multipartFile, @RequestParam("id") Long staffId)
    {
        String msg = staffService.updatePhoto(multipartFile, staffId);
        return (
                ResponseEntity.ok().body(HttpResponse.builder()
                        .message(msg)
                        .requestMethod("POST")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build()
                )
        );
    }
   @GetMapping(
            value = "/files/staffs/photo",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public ResponseEntity<Resource> getStaffPhoto(@RequestParam("filename") String filename)
    {
        //System.out.println("\n\n\t" + filename + "\n\n");
        Resource fileResource = staffService.retrieveStaffPhoto(filename);
        if(fileResource.exists())
        {
            return ResponseEntity.ok()
                    .body(fileResource);
        }
        return ResponseEntity.notFound()
                .build();
    }
}
