package com.fidelity.business;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@FieldDefaults(makeFinal = false, level = lombok.AccessLevel.PRIVATE)
public class UserPreference {
    Long id;
    String investmentPurpose;
    String riskTolerance;
    String incomeCategory;
    String lengthOfInvestment;
    Boolean acceptedRoboAdvisor;
    Boolean isEmpty;
}
