package com.bookup.booking.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookup.booking.model.Driver;
import com.bookup.booking.repo.DriverRepo;

@Service
public class DriverService {
	
	@Autowired
	private DriverRepo repo;
	
	
	public void saveDriver(Driver driver) {
		repo.save(driver);
	}

	public ArrayList<Driver> getAllDriver(){
		return (ArrayList<Driver>) repo.findAll();
	}
}
