package com.fidelity.integration;

import com.fidelity.business.UserPreference;
import com.fidelity.integration.mapper.UserPreferenceResultMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository("userPreferenceDao")
@Primary
public class UserPreferenceDaoImpl {

    @Autowired
    private UserPreferenceResultMap userPreferenceMapper;

    public List<UserPreference> getAllUserPreferences() {
        return userPreferenceMapper.getAllUserPreferences();
    }

    public UserPreference getUserPreferenceById(Long userPreferenceId){
        return userPreferenceMapper.getUserPreferenceById(userPreferenceId);
    }

    public void insertUserPreference(UserPreference userPreference){
        userPreferenceMapper.insertUserPreference(userPreference);
    }

    public void updateUserPreference(UserPreference userPreference){
        userPreferenceMapper.updateUserPreference(userPreference);
    }
}
