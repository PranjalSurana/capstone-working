package com.fidelity.controllers;

import com.fidelity.pojo.TradeStockPojo;
import com.fidelity.services.BuynsellService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buynsell")
@CrossOrigin(origins="*")
public class BuynsellController {
    @Autowired
    private Logger logger;

    @Autowired
    private BuynsellService service;


    @GetMapping("/health")
    public String getBuynsell() {
        return "buynsell is healthy";
    }

    @PostMapping("/placeorder/buy")
    public ResponseEntity<Boolean> placeBuyOrder(@RequestBody TradeStockPojo tradeStockPojo) {
        System.out.println("buy working");
        logger.info("placeOrder() called with {}", tradeStockPojo);
        return ResponseEntity.ok(service.buyStock(tradeStockPojo.getStock(), tradeStockPojo.getQuantity(), tradeStockPojo.getUserId()));
    }

    @PostMapping("/placeorder/sell")
    public ResponseEntity<Boolean> placeSellOrder(@RequestBody TradeStockPojo tradeStockPojo) {
        logger.info("placeOrder() called with {}", tradeStockPojo);
        return ResponseEntity.ok(service.sellStock(tradeStockPojo.getStock(), tradeStockPojo.getQuantity(), tradeStockPojo.getUserId()));
    }
}
