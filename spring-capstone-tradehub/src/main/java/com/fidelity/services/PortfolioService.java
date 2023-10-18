package com.fidelity.services;

import com.fidelity.business.Holding;
import com.fidelity.business.Transaction;
import com.fidelity.integration.HoldingDaoImpl;
import com.fidelity.integration.TransactionDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    @Autowired
    private HoldingDaoImpl holdingDao;

    public List<Holding> getPortfolio(long userId) {
        return holdingDao.getHoldingsByUserId(userId);
    }
}
