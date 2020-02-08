package com.bookup.booking.repo;

import com.bookup.booking.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PayRepo extends JpaRepository<Payment, String> {
}
