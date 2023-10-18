package com.fidelity.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fidelity.business.RoboAdvisor;
import com.fidelity.business.User;
import com.fidelity.business.UserPreference;
import com.fidelity.integration.UserDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoboAdvisorService {

    private List<RoboAdvisor> investmentOptions;
    ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private AuthService authService;

    @Autowired
    private UserDaoImpl userDao;

    public RoboAdvisorService() throws IOException {
        File jsonFile = new File("/home/ec2-user/leap-capstone/spring-capstone-tradehub/src/main/resources/data/roboadvisordata.json");

        investmentOptions = List.of(objectMapper.readValue(jsonFile, RoboAdvisor[].class));
    }

//    public List<String> suggestTopBuyOrSellOptions(User user) {
//        double riskScore = calculateRiskScore(userPreference);
//
//        List<RoboAdvisor> topOptions = investmentOptions.stream()
//                .sorted((o1, o2) -> Double.compare(o2.getPriceDiff(), o1.getPriceDiff()))
//                .filter(option -> isOptionSuitable(riskScore, userPreference.getRiskTolerance(), option))
//                .limit(5)
//                .toList();
//
//        List<String> topOptionNames = new ArrayList<>();
//        for (RoboAdvisor option : topOptions) {
//            topOptionNames.add(option.getName());
//        }
//
//        return topOptions;
//    }
//
//    private double calculateRiskScore(UserPreference userPreference) {
//        if (userPreference.getRiskTolerance().equalsIgnoreCaseIgnoreCase("low")) {
//            return 0.2;
//        } else if (userPreference.getRiskTolerance().equalsIgnoreCaseIgnoreCase("medium")) {
//            return 0.5;
//        } else if (userPreference.getRiskTolerance().equalsIgnoreCaseIgnoreCase("high")) {
//            return 0.8;
//        } else {
//            throw new IllegalArgumentException("Invalid Risk Tolerance");
//        }
//    }
//
//    private boolean isOptionSuitable(double riskScore, String userRiskTolerance, RoboAdvisor option) {
//        if (userRiskTolerance.equalsIgnoreCaseIgnoreCase("low")) {
//            return riskScore < 0.3 && option.getPriceDiff() >= 0;
//        } else if (userRiskTolerance.equalsIgnoreCaseIgnoreCase("medium")) {
//            return riskScore >= 0.3 && riskScore < 0.7 && option.getPriceDiff() >= 0;
//        } else {
//            return riskScore >= 0.7 && option.getPriceDiff() >= 0;
//        }
//    }

    public List<RoboAdvisor> suggestTopBuyOrSellOptions(Long userId) {

        User user = userDao.getUserById(userId);
        List<RoboAdvisor> recommendedStocks = new ArrayList<>();

        for (RoboAdvisor stock : investmentOptions) {
            double score = 0;

            if (user.getRiskAppetite().equalsIgnoreCase("Conservative")) {
                score += stock.getRisk() * 0.2;
            }
            else if (user.getRiskAppetite().equalsIgnoreCase("Aggressive")) {
                score += stock.getRisk() * 0.5;
            }
            else {
                score += stock.getRisk() * 0.8;
            }

            if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Conservative")) {
                score -= stock.getRisk() * 0.16;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Below Average")) {
                score += stock.getReturnRate() * 0.33;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Average")) {
                score += stock.getReturnRate() * 0.5;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Above Average")) {
                score += stock.getReturnRate() * 0.66;
            }
            else {
                score += stock.getReturnRate() * 0.83;
            }

            if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("0 - 20,000")) {
                score -= stock.getRisk() * 0.125;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("20,001 - 40,000")) {
                score += stock.getReturnRate() * 0.25;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("40,001 - 60,000")) {
                score += stock.getReturnRate() * 0.375;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("60,001 - 80,000")) {
                score += stock.getReturnRate() * 0.5;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("80,001 - 100,000")) {
                score += stock.getReturnRate() * 0.625;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("100,001 - 150,000")) {
                score += stock.getReturnRate() * 0.75;
            }
            else {
                score += stock.getReturnRate() * 0.875;
            }

            if (user.getUserPreference().getLengthOfInvestment().equalsIgnoreCase("0-5 years")) {
                score -= stock.getRisk() * 0.2;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("5-7 years")) {
                score += stock.getReturnRate() * 0.4;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("7-10 years")) {
                score += stock.getReturnRate() * 0.6;
            }
            else {
                score += stock.getReturnRate() * 0.8;
            }

            stock.setScore(score);
            recommendedStocks.add(stock);
        }
        recommendedStocks.sort(Comparator.comparingDouble(RoboAdvisor::getScore).reversed());
        return recommendedStocks.subList(0, 6);
    }

    public List<RoboAdvisor> suggestTopBuyOrSellOptions1(User user) {

        List<RoboAdvisor> recommendedStocks = new ArrayList<>();

        for (RoboAdvisor stock : investmentOptions) {
            double score = 0;

            if (user.getRiskAppetite().equalsIgnoreCase("Conservative")) {
                score += stock.getRisk() * 0.2;
            }
            else if (user.getRiskAppetite().equalsIgnoreCase("Aggressive")) {
                score += stock.getRisk() * 0.5;
            }
            else {
                score += stock.getRisk() * 0.8;
            }

            if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Conservative")) {
                score -= stock.getRisk() * 0.16;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Below Average")) {
                score += stock.getReturnRate() * 0.33;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Average")) {
                score += stock.getReturnRate() * 0.5;
            }
            else if (user.getUserPreference().getRiskTolerance().equalsIgnoreCase("Above Average")) {
                score += stock.getReturnRate() * 0.66;
            }
            else {
                score += stock.getReturnRate() * 0.83;
            }

            if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("0 - 20,000")) {
                score -= stock.getRisk() * 0.125;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("20,001 - 40,000")) {
                score += stock.getReturnRate() * 0.25;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("40,001 - 60,000")) {
                score += stock.getReturnRate() * 0.375;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("60,001 - 80,000")) {
                score += stock.getReturnRate() * 0.5;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("80,001 - 100,000")) {
                score += stock.getReturnRate() * 0.625;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("100,001 - 150,000")) {
                score += stock.getReturnRate() * 0.75;
            }
            else {
                score += stock.getReturnRate() * 0.875;
            }

            if (user.getUserPreference().getLengthOfInvestment().equalsIgnoreCase("0-5 years")) {
                score -= stock.getRisk() * 0.2;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("5-7 years")) {
                score += stock.getReturnRate() * 0.4;
            }
            else if (user.getUserPreference().getIncomeCategory().equalsIgnoreCase("7-10 years")) {
                score += stock.getReturnRate() * 0.6;
            }
            else {
                score += stock.getReturnRate() * 0.8;
            }

            stock.setScore(score);
            recommendedStocks.add(stock);
        }
        recommendedStocks.sort(Comparator.comparingDouble(RoboAdvisor::getScore).reversed());
        return recommendedStocks.subList(0, 6);
    }

}