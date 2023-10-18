package com.fidelity.pojo;

import com.fidelity.business.Stock;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@ToString
@EqualsAndHashCode
public class TradeStockPojo {
    Stock stock;
    int quantity;
    long userId;
}
