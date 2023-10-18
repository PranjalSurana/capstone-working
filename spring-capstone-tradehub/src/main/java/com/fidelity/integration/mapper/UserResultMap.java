package com.fidelity.integration.mapper;

import com.fidelity.business.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserResultMap {
    List<User> getAllUsers();
    User getUserById(Long userId);
    User getUserByEmail(String email);
    void insertUser(User user);
    void updateUser(User user);

    int verifyEmail(String email);
}
