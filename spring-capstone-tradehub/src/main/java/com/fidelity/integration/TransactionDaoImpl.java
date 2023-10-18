package com.fidelity.integration;

import com.fidelity.business.Transaction;
import com.fidelity.integration.mapper.TransactionResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("transactionDao")
@Primary
public class TransactionDaoImpl {
    @Autowired
    private TransactionResultMap transactionMapper;
    public List<Transaction> getAllTransactions() {
        return transactionMapper.getAllTransactions();
    }

    public List<Transaction> getTransactionsByUserId(Long userId){
        return transactionMapper.getTransactionsByUserId(userId);
    }

    public Transaction getTransactionById(Long transactionId){
        return transactionMapper.getTransactionById(transactionId);
    }

    public void insertTransaction(Transaction transaction){
        transactionMapper.insertTransaction(transaction);
    }

    public void updateTransaction(Transaction transaction){
        transactionMapper.updateTransaction(transaction);
    }

    public void deleteTransaction(Long transactionId){
        transactionMapper.deleteTransaction(transactionId);
    }
}
