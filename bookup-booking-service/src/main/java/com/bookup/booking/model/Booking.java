package com.bookup.booking.model;

import org.hibernate.annotations.Type;
import com.bookup.booking.model.PaymentStatus;
import javax.persistence.*;
import java.util.UUID;

@Entity
public class Booking {

	@Id @Type(type = "uuid-char") @Column(length = 100)
	private UUID bookingId;
	private int driverId;
	private String userId;
	private String source;
	private String destination;
	private String pickDate;
	private String pickTime;
	private double price;
	private double distance;
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;

	public Booking() {
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public String getPickDate() {
		return pickDate;
	}

	public void setPickDate(String pickDate) {
		this.pickDate = pickDate;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	public UUID getBookingId() {
		return bookingId;
	}

	public void setBookingId(UUID bookingId) {
		this.bookingId = bookingId;
	}

	public int getDriverId() {
		return driverId;
	}

	public void setDriverId(int driverId) {
		this.driverId = driverId;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getPickTime() {
		return pickTime;
	}

	public void setPickTime(String pickTime) {
		this.pickTime = pickTime;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getDistance() {
		return distance;
	}

	public void setDistance(double distance) {
		this.distance = distance;
	}
	
}
