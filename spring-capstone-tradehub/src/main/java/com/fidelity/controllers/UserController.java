package com.fidelity.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fidelity.business.User;
import com.fidelity.integration.DatabaseException;
import com.fidelity.services.AuthService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private Logger logger;

    @Autowired
    private AuthService service;

    @Autowired
    private RestTemplate restTemplate;

    @CrossOrigin(origins = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/")
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        String url = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/fmts/client";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        Map<String, String> json = new HashMap<>();
        json.put("clientId", "");
        json.put("email", user.getEmail());
        HttpEntity<Map<String, String>> entity = new HttpEntity<>(json, headers);
        try {
            //Calling FMTS
            String response = restTemplate.postForObject(url, entity, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readValue(response, JsonNode.class);
            String clientId = node.get("clientId").asText();
            //String token = node.get("token").asText();
            user.setId(Long.valueOf(clientId));
            user.setBalance(Long.valueOf(100000L));

        }catch (Exception e) {
            throw new DatabaseException("Cannot add new client", e);
        }
        logger.info("^^^^^^^^^^^\n" +
                "User added: ");
        return ResponseEntity.ok(service.register(user));
    }

    @CrossOrigin(origins = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/")
    @GetMapping("/login/{email}")
    public ResponseEntity<User> login(@PathVariable("email") String email) {
        System.out.println(email);
        logger.info("User retrieved: ", email);
        return ResponseEntity.ok(service.login(email));
    }

    @CrossOrigin(origins = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/")
    @GetMapping("/verifyEmail/{email}")
    public ResponseEntity<Integer> verifyEmail(@PathVariable("email") String email) {
        logger.info("User email verified: ", email);
        return ResponseEntity.ok(service.verifyEmail(email));
    }

}