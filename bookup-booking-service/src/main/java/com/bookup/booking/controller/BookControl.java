package com.bookup.booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.bookup.booking.model.Driver;
import com.bookup.booking.service.DriverService;

@RestController
public class BookControl {
	
	@Autowired
	private DriverService driverService;
	
	@PostMapping("/driver")
	ResponseEntity<?> postDriver(@RequestBody Driver driver){
		try {
			driverService.saveDriver(driver);
			return new ResponseEntity<>("saved succesfully",HttpStatus.CREATED);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/driver")
	ResponseEntity<?> getDriver(){
		try {
//			driverService.getAllDriver();
			return new ResponseEntity<>(driverService.getAllDriver(),HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
