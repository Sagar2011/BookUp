package com.bookup.booking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookup.booking.model.Booking;

@Repository
public interface BookRepo extends JpaRepository<Booking, String>{

}
