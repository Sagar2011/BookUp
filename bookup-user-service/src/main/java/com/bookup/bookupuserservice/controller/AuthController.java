package com.bookup.bookupuserservice.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bookup.bookupuserservice.util.CookieUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookup.bookupuserservice.model.User;
import com.bookup.bookupuserservice.service.IUserService;

@RestController
public class AuthController {

	@Autowired
	private IUserService userService;

	// For providing user google profile
	@GetMapping("/userprofile")
	public User getUserProfile(HttpServletRequest request) {
		User user = userService.loadByUsername(request);
		return user;
	}
	// for logout
	@GetMapping(value = "/logout")
	public void userLogout(HttpServletResponse response) {
		String cookiename = "BOOK_UP";
		CookieUtil.clearCookie(response, cookiename);
	}

}
