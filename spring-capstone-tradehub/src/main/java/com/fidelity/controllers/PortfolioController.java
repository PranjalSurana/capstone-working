package com.fidelity.controllers;

import com.fidelity.business.Holding;
import com.fidelity.services.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {
    @Autowired
    private PortfolioService service;
    @GetMapping("/{userId}")
    public ResponseEntity<List<Holding>> getHoldings(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(service.getPortfolio(userId));
    }
}
