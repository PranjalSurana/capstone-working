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
public class User {
    Long id;
    String email;
    String personalName;
    String country;
    String dob;
    String riskAppetite;
    Long balance;

    UserPreference userPreference;
}

