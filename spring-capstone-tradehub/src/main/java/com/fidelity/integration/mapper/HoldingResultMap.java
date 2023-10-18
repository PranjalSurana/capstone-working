package com.fidelity.integration.mapper;

import com.fidelity.business.Holding;
import com.fidelity.business.Transaction;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface HoldingResultMap {
    List<Holding> getAllHoldings();
    Holding getHoldingById(Long holdingId);
    Holding getHoldingByInstrumentAndUserId(Map<String,Object>objectMap);
    List<Holding> getHoldingsByUserId(Long userId);
    void insertHolding(Holding holding);
    void updateHolding(Holding holding);
    void deleteHolding(Long holdingId);
}
