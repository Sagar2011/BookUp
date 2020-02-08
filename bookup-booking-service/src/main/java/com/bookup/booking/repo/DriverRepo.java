package com.bookup.booking.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookup.booking.model.Driver;

@Repository
public interface DriverRepo extends JpaRepository<Driver, String>{

}
