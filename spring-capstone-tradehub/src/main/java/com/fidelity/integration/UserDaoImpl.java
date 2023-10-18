package com.fidelity.integration;

import com.fidelity.business.User;
import com.fidelity.integration.mapper.UserResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("usersDao")
@Primary
public class UserDaoImpl{

    @Autowired
    private UserResultMap userMapper;

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public User getUserByEmail(String email) {
        return userMapper.getUserByEmail(email);
    }

    public User getUserById(Long userId) {
        return userMapper.getUserById(userId);
    }

    public void insertUser(User user) {
        userMapper.insertUser(user);
    }

    public void updateUser(User user) {
        userMapper.updateUser(user);
    }

    public int verifyEmail(String email){
        return userMapper.verifyEmail(email);
    }

}
