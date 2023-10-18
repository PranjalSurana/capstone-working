package com.fidelity.integration;

import com.fidelity.business.Holding;
import com.fidelity.integration.mapper.HoldingResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("holdingDao")
@Primary
public class HoldingDaoImpl {

    @Autowired
    private HoldingResultMap holdingMapper;
    public List<Holding> getAllHoldings() {
        return holdingMapper.getAllHoldings();
    }

    public Holding getHoldingById(Long holdingId){
        return holdingMapper.getHoldingById(holdingId);
    }
    public Holding getHoldingByInstrumentAndUserId(Map<String,Object>objectMap){
        return holdingMapper.getHoldingByInstrumentAndUserId(objectMap);
    }

    public List<Holding> getHoldingsByUserId(Long userId){
        return holdingMapper.getHoldingsByUserId(userId);
    }

    public void insertHolding(Holding holding){
        holdingMapper.insertHolding(holding);
    }

    public void updateHolding(Holding holding){
        holdingMapper.updateHolding(holding);
    }

    public void deleteHolding(Long holdingId){
        holdingMapper.deleteHolding(holdingId);
    }

}
