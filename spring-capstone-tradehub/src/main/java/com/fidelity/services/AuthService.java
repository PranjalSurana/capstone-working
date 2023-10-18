package com.fidelity.services;



import com.fidelity.business.User;
import com.fidelity.business.UserPreference;
import com.fidelity.integration.UserDaoImpl;
import com.fidelity.integration.UserPreferenceDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Objects;



@Service
public class AuthService {
    @Autowired
    private UserDaoImpl userDao;

    @Autowired
    private UserPreferenceDaoImpl userPreferenceDao;

    public User register(User user) {
        if(user == null) {
            throw new IllegalArgumentException("User can't be null");
        }
        if(user.getEmail() == null || user.getEmail().isEmpty()) {
            System.out.println(user.getEmail());
            throw new IllegalArgumentException("User's email can't be null");
        }
        if(user.getCountry() == null || user.getCountry().isEmpty()) {
            throw new IllegalArgumentException("User's Country can't be null");
        }
        if(user.getBalance() == null || user.getBalance()==0) {
            throw new IllegalArgumentException("User's Balance can't be null or 0");
        }
        if(userDao.getUserByEmail(user.getEmail()) != null) {
            throw new IllegalArgumentException("User's email already exixts");
        }
        userDao.insertUser(user);
        return user;
    }



    public User login(String email) {
        if(email == "" || email == null) {
            throw new IllegalArgumentException("User's email can't be null");
        }
        User user = userDao.getUserByEmail(email);
        if(user == null) {
            throw new IllegalArgumentException("Invalid email passed");
        }
        return user;
    }

    public int verifyEmail(String email)
    {
        if (email == null) {
            throw new NullPointerException("Email cant be null");
        }
        if(userDao.verifyEmail(email)==1)
        {
            return 1;
        }
        return 0;
    }


    public List<UserPreference> getAllUserPreferences() {
        try {
            return userPreferenceDao.getAllUserPreferences();
        }
        catch (Exception e) {
            return null;
        }
    }


    public UserPreference getUserPreferenceId(Long userPreferenceId) {
        if(userPreferenceId <= 0) {
            throw new IllegalArgumentException("Pass a valid User ID!");
        }
        if(userPreferenceDao.getUserPreferenceById(userPreferenceId) == null) {
            throw new IllegalStateException("User Preference ID Passed is invalid!");
        }
        UserPreference userPreference = userPreferenceDao.getUserPreferenceById(userPreferenceId);
        return userPreference;
    }



    public boolean addClientPreference(UserPreference userPreference) {
        if(userPreference == null) {
            throw new IllegalArgumentException("Pass valid user preference!");
        }
        if(userPreferenceDao.getUserPreferenceById(userPreference.getId()) != null) {
            throw new IllegalArgumentException("User ID already exists!");
        }
        userPreferenceDao.insertUserPreference(userPreference);
        return true;
    }

    public boolean updateClientPreference(UserPreference userPreference) {
        if(userPreference == null) {
            throw new IllegalArgumentException("Pass valid user preference!");
        }
        if(userPreferenceDao.getUserPreferenceById(userPreference.getId()) == null) {
            throw new IllegalArgumentException("Invalid User ID passed!");
        }
        userPreferenceDao.updateUserPreference(userPreference);
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuthService)) return false;
        AuthService that = (AuthService) o;
        return Objects.equals(userDao, that.userDao) && Objects.equals(userPreferenceDao, that.userPreferenceDao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userDao, userPreferenceDao);
    }



    @Override
    public String toString() {
        return "AuthService{" +
                "userDao=" + userDao +
                ", userPreferenceDao=" + userPreferenceDao +
                '}';
    }
}