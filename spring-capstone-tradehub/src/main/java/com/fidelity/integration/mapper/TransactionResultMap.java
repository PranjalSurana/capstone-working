package com.fidelity.integration.mapper;

import com.fidelity.business.Transaction;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TransactionResultMap {
    List<Transaction> getAllTransactions();
    List<Transaction> getTransactionsByUserId(Long userId);
    Transaction getTransactionById(Long transactionId);
    void insertTransaction(Transaction transaction);
    void updateTransaction(Transaction transaction);
    void deleteTransaction(Long transactionId);
}
