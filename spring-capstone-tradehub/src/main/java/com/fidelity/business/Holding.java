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
public class Holding {
    Long holdingId;
    Instrument instrument;
    int quantity;
    int buySellPrice;
    long userId;
}
