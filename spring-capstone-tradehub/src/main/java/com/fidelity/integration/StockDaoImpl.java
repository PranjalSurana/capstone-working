package com.fidelity.integration;

import com.fidelity.business.Stock;
import com.fidelity.integration.mapper.StockResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("stockDao")
@Primary
public class StockDaoImpl {
    @Autowired
    private StockResultMap stockMapper;
    List<Stock> getAllStocks() {
        return stockMapper.getAllStocks();
    }

    Stock getStockById(Long stockId){
        return stockMapper.getStockById(stockId);
    }

    void insertStock(Stock stock){
        stockMapper.insertStock(stock);
    }

    void updateStock(Stock stock){
        stockMapper.updateStock(stock);
    }

    void deleteStock(Long stockId){
        stockMapper.deleteStock(stockId);
    }
}
