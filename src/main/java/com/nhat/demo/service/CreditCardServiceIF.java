package com.nhat.demo.service;

import com.nhat.demo.entity.CreditCard;

public interface CreditCardServiceIF {
    String ValidateCart(CreditCard creditCard);

    void subtractingMoney(CreditCard creditCard, double total);

}
