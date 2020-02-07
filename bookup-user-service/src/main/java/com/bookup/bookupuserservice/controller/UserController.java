package com.bookup.bookupuserservice.controller;

import java.time.LocalDateTime;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import com.bookup.bookupuserservice.model.User;
import com.bookup.bookupuserservice.service.IGoogleService;
import com.bookup.bookupuserservice.service.IUserService;
import com.bookup.bookupuserservice.util.CookieUtil;
import com.bookup.bookupuserservice.util.JwtUtil;

@Controller
public class UserController {

	@Value("${client_dashboard_url}")
	String clientDashboardUrl;

	@Value("${Domain}")
	String domain;

	@Autowired
	private IGoogleService googleService;

	@Autowired
	private IUserService userService;

	private Logger logger = LoggerFactory.getLogger(this.getClass());

	private static final String jwtTokenCookieName = "BOOK_UP";

	// Redirect to login/consent form on Google's authentication page
	@GetMapping(value = "/googlelogin")
	public RedirectView googlelogin() {
		RedirectView redirectview = new RedirectView();
		String url = googleService.googlelogin();
		redirectview.setUrl(url);
		return redirectview;
	}

	// Google calls back on user's successful authentication and consent
	@GetMapping(value = "/search")
	public RedirectView google(@RequestParam("code") String code, HttpServletResponse res) {
		String accessToken = googleService.getGoogleAccessToken(code);
		User user = googleService.getGoogleUserProfile(accessToken);
		String jwtToken = JwtUtil.addToken(res, user);
		CookieUtil.create(res, jwtTokenCookieName, jwtToken, false, -1, domain);
		RedirectView redirectview = new RedirectView();
		try {
			userService.addUserData(user);
		} catch (DuplicateKeyException exception) {
			logger.error("In google method " + LocalDateTime.now() + " " + exception.getMessage());
		} catch (Exception exception) {
			logger.error("In google method " + LocalDateTime.now() + " " + exception.getMessage());
		}
		redirectview.setUrl(clientDashboardUrl);
		return redirectview;
	}

	// For logging out the user form the system
	@GetMapping(value = "/userlogout")
	public void googleLogout(HttpServletResponse response) {
		String cookiename = jwtTokenCookieName;
		CookieUtil.clearCookie(response, cookiename);
	}

}
