package com.nhat.demo.service.serviceIml;

import com.nhat.demo.entity.Booking;
import com.nhat.demo.repository.BookingRepository;
import com.nhat.demo.repository.CreditCardRepository;
import com.nhat.demo.service.BookingServiceIF;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl implements BookingServiceIF {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    CreditCardRepository creditCardRepository;

    @Override
    public void saveBooking(Booking booking) {
        bookingRepository.save(booking);
    }

    @Override
    public String createBookingCode() {
        boolean duplicate = true;
        String bookingCode;

        do {
            // tao mot random String
            String substr1 = RandomStringUtils.randomAlphanumeric(4);
            String substr2 = RandomStringUtils.randomAlphanumeric(4);
            String substr3 = RandomStringUtils.randomAlphanumeric(4);
            bookingCode = substr1 + "-" + substr2 + "-" + substr3;
            if (creditCardRepository.findByCardNumber(bookingCode) == null) {
                duplicate = false;
            }
        }
        while (duplicate);
        return bookingCode;
    }
}