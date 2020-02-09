package com.bookup.booking.controller;

import com.bookup.booking.model.*;
import com.bookup.booking.service.BookingService;
import com.bookup.booking.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bookup.booking.service.DriverService;

import java.util.UUID;

@RestController
public class BookControl {
	
	@Autowired
	private DriverService driverService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private PaymentService paymentService;
	
	
	
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
			return new ResponseEntity<>(driverService.getAllDriver(),HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	

	@PostMapping("/booking")
	ResponseEntity<?> postTicket(@RequestBody Booking booking){
		try {
			booking.setPaymentStatus(PaymentStatus.PENDING);
			bookingService.bookTicket(booking);
			return new ResponseEntity<>("saved succesfully",HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/booking")
	ResponseEntity<?> getTicket(){
		try {
			return new ResponseEntity<>(bookingService.getTickets(),HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/payment")
	ResponseEntity<?> payTickets(@RequestBody Payment payment, @RequestParam UUID bookId){
		try {
			payment.setBookingId(bookId);
			boolean status = paymentService.payment(payment);
			 Booking booking = bookingService.getBooking(bookId);
			 booking.setPaymentStatus(PaymentStatus.SUCCESS);
			 bookingService.bookTicket(booking);
			return new ResponseEntity<>("payment succesfully",HttpStatus.OK);
		}catch(Exception ex) {
			return new ResponseEntity<>("error in server",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
