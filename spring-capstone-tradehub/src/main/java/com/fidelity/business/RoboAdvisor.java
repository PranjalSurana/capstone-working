package com.fidelity.business;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(makeFinal = false, level = lombok.AccessLevel.PRIVATE)
public class RoboAdvisor {

    String name;
    int price;
    int quantity;
    int priceDiff;
    int quantDiff;
    String option;
    double risk;
    double returnRate;
    double score;

}