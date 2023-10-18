package com.fidelity.services;

import com.fidelity.business.*;
import com.fidelity.integration.HoldingDaoImpl;
import com.fidelity.integration.TransactionDaoImpl;
import com.fidelity.integration.UserDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class BuynsellService {
    @Autowired
    private TransactionDaoImpl transactionDao;
    @Autowired
    private HoldingDaoImpl holdingDao;
    @Autowired
    private UserDaoImpl userDao;

    public boolean buyStock(Stock stock, int quantity, long userId) {
        System.out.println(stock);
        try{
            Map<String,Object>map=new HashMap<>();
            map.put("instrumentId",stock.getInstrument().getInstrumentId());
            map.put("userId",userId);
            Holding holding = holdingDao.getHoldingByInstrumentAndUserId(map);
            User user = userDao.getUserById(userId);

            if(holding == null){
                holdingDao.insertHolding(new Holding(null, stock.getInstrument(), quantity, stock.getAskPrice(), userId));
            }else{
                if(holding.getQuantity()+quantity>stock.getInstrument().getMaxQuantity()){
                    return false;
                }
                if(holding.getQuantity()+quantity<stock.getInstrument().getMinQuantity()){
                    return false;
                }
                if(user.getBalance() < (long) stock.getAskPrice() *quantity){
                    return false;
                }
                holding.setQuantity(holding.getQuantity() + quantity);
                holdingDao.updateHolding(holding);
            }
            user.setBalance(user.getBalance() - (long) stock.getAskPrice() *quantity);
            userDao.updateUser(user);
            transactionDao.insertTransaction(new Transaction(null,stock.getInstrument(), 1, stock.getAskPrice(), quantity, "21-01-2023", userId));
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public boolean sellStock(Stock stock, int quantity, long userId) {
        try{
            Map<String,Object>map=new HashMap<>();
            map.put("instrumentId",stock.getInstrument().getInstrumentId());
            map.put("userId",userId);
            Holding holding = holdingDao.getHoldingByInstrumentAndUserId(map);
            if(holding == null){
                return false;
            }else{
                if(holding.getQuantity()-quantity>stock.getInstrument().getMaxQuantity()){
                    return false;
                }
                if(holding.getQuantity()<stock.getInstrument().getMinQuantity()){
                    return false;
                }
                if(holding.getQuantity()-quantity==0){
                    holdingDao.deleteHolding(holding.getHoldingId());
                }
                else{
                    holding.setQuantity(holding.getQuantity() - quantity);
                    holdingDao.updateHolding(holding);
                }
            }
            User user = userDao.getUserById(userId);
            user.setBalance(user.getBalance() + (long) stock.getBidPrice() *quantity);
            transactionDao.insertTransaction(new Transaction(null,stock.getInstrument(), 0, stock.getBidPrice(), quantity, "23-01-2023", userId));
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
}
