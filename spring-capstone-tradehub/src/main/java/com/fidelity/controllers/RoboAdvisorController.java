package com.fidelity.controllers;

import com.fidelity.business.RoboAdvisor;
import com.fidelity.business.User;
import com.fidelity.business.UserPreference;
import com.fidelity.services.RoboAdvisorService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roboadvisor")
public class RoboAdvisorController {

    @Autowired
    private Logger logger;

    @Autowired
    private RoboAdvisorService roboAdvisorService;

    @CrossOrigin(origins = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/")
    @PostMapping()
    public ResponseEntity<List<RoboAdvisor>> getRoboAdvisorData(@RequestBody User user) {
        logger.info("Top Buy or Sell Options retrieved");
        return ResponseEntity.ok(roboAdvisorService.suggestTopBuyOrSellOptions(user.getId()));
    }

    @CrossOrigin(origins = "http://ec2-13-233-25-28.ap-south-1.compute.amazonaws.com:3000/")
    @PostMapping("/test")
    public ResponseEntity<List<RoboAdvisor>> getRoboAdvisorData1(@RequestBody User user) {
        logger.info("Top Buy or Sell Options retrieved");
        return ResponseEntity.ok(roboAdvisorService.suggestTopBuyOrSellOptions1(user));
    }

}