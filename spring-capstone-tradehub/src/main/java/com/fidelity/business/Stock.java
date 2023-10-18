package com.fidelity.business;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@FieldDefaults(makeFinal = false, level = lombok.AccessLevel.PRIVATE)
public class Stock {
    long stockId;
    int askPrice;
    int bidPrice;
    String priceTimeStamp;
    Instrument instrument;
}
