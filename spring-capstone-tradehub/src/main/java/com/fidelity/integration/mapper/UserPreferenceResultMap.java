package com.fidelity.integration.mapper;

import com.fidelity.business.UserPreference;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserPreferenceResultMap {
    List<UserPreference> getAllUserPreferences();
    UserPreference getUserPreferenceById(Long userPreferenceId);
    void insertUserPreference(UserPreference userPreference);
    void updateUserPreference(UserPreference userPreference);
    void deleteUserPreference(int userPreferenceId);
}
