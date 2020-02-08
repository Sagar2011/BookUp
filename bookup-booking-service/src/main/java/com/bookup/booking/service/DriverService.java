package com.bookup.booking.service;

import java.util.ArrayList;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookup.booking.model.Driver;
import com.bookup.booking.repo.DriverRepo;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

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

	public String readAllCookies(HttpServletRequest request) {
		String user = "";
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if (cookie.getName().equals("BOOK_UP")) {
					System.out.println("cookie"+cookie);
					user = Jwts.parser().setSigningKey("BOOKUP").parseClaimsJws(cookie.getValue()).getBody()
							.get("em", String.class);
				}
			}
		}
		return user;
	}
}
