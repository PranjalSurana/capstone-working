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
public class Transaction {
    Long transactionId;
    Instrument instrument;
    int isBuy;
    int buySellPrice;
    int quantity;
    String transactionDate;
    Long userId;
}