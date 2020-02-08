package com.bookup.booking.service;

import com.bookup.booking.model.Booking;
import com.bookup.booking.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class BookingService {

    @Autowired
    private BookRepo bookRepo;


    public void bookTicket(Booking booking){
        bookRepo.save(booking);
    }

    public ArrayList<Booking> getTickets(){
        return (ArrayList<Booking>) bookRepo.findAll();
    }

    public Booking getBooking(UUID id){ return bookRepo.findByBookingId(id); }
}
