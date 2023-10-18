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
public class Instrument {
    String instrumentId;
    String externalIdType;
    String externalId;
    String categoryId;
    String instrumentDescription;
    int maxQuantity;
    int minQuantity;
}