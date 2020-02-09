package com.bookup.bookupuserservice.controller;

import java.io.IOException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import com.bookup.bookupuserservice.exception.UserNotFoundException;
import com.bookup.bookupuserservice.model.User;
import com.bookup.bookupuserservice.service.IGoogleService;
import com.bookup.bookupuserservice.service.IUserService;
import com.bookup.bookupuserservice.util.CookieUtil;
import com.bookup.bookupuserservice.util.JwtUtil;

@Controller
public class UserController {

	@Value("${google.base.url}")
	private String baseUrl;

	@Value("${spring.security.oauth2.client.registration.google.client-id}")
	String clientId;

	@Value("${spring.security.oauth2.client.registration.google.client-secret}")
	String clientSecret;

	@Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
	String redirectUrl;

	@Value("${bookup.client.redirectUrl}")
	String clientdashboardredirectUrl;

	@Value("${Domain}")
	String domain;

	@Autowired
	private IUserService userService;

	@Autowired
	private IGoogleService googleService;

	@Autowired
	private User user;

	private static final String jwtTokenCookieName = "BOOK_UP";

	@GetMapping("/googlelogin")
	public RedirectView login() {
		RedirectView redirectView = new RedirectView();
		String url = baseUrl + "?client_id=" + this.clientId + "&redirect_uri=" + this.redirectUrl
				+ "&response_type=code&scope=profile+email";
		redirectView.setUrl(url);
		return redirectView;
	}

	@GetMapping("/search")
	public RedirectView getUserDetails(@RequestParam("code") String code, HttpServletResponse httpServletResponse)
			throws IOException, UserNotFoundException {
		String accessToken = googleService.getAccessToken(code);
		user = googleService.getUserProfile(accessToken);
		String jwtToken = JwtUtil.addToken(httpServletResponse, user);
		Cookie cookie = CookieUtil.create(httpServletResponse, jwtTokenCookieName, jwtToken, false, -1, domain);
		RedirectView redirectview = new RedirectView();
		redirectview.setUrl(clientdashboardredirectUrl);
		return redirectview;
	}

	// For logging out the user form the system
	@GetMapping(value = "/userlogout")
	public void googleLogout(HttpServletResponse response) {
		String cookiename = jwtTokenCookieName;
		CookieUtil.clearCookie(response, cookiename);
	}
}
