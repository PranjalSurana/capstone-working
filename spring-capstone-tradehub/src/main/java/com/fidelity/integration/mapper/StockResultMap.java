package com.fidelity.integration.mapper;

import com.fidelity.business.Stock;
import com.fidelity.business.Transaction;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StockResultMap {
    List<Stock> getAllStocks();
    Stock getStockById(Long stockId);
    void insertStock(Stock stock);
    void updateStock(Stock stock);
    void deleteStock(Long stockId);
}
