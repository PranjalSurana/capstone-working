package com.fidelity.services;

import com.fidelity.business.Transaction;
import com.fidelity.integration.TransactionDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionDaoImpl transactionDao;

    public List<Transaction> getTransactions(long userId) {
        return transactionDao.getTransactionsByUserId(userId);
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionDao.getTransactionsByUserId(userId);
    }
}
