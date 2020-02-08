package com.bookup.booking.model;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Driver {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private int driverId;
	private String driverName;
	private float rating;
	private ArrayList<String> languages;
	public Driver(int driverId, String driverName, float rating, ArrayList<String> languages) {
		super();
		this.driverId = driverId;
		this.driverName = driverName;
		this.rating = rating;
		this.languages = languages;
	}
	public Driver() {
		super();
	}
	public int getDriverId() {
		return driverId;
	}
	public void setDriverId(int driverId) {
		this.driverId = driverId;
	}
	public String getDriverName() {
		return driverName;
	}
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
	}
	public ArrayList<String> getLanguages() {
		return languages;
	}
	public void setLanguages(ArrayList<String> languages) {
		this.languages = languages;
	}
}
