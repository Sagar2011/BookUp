package com.bookup.booking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookup.booking.model.Booking;

import java.util.ArrayList;
import java.util.UUID;

@Repository
public interface BookRepo extends JpaRepository<Booking, String>{
    Booking findByBookingId(UUID bookingId);
    ArrayList<Booking> findByUserId(String userId);
}
