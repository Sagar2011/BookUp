package com.bookup.bookupuserservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.social.google.api.Google;
import org.springframework.social.google.api.impl.GoogleTemplate;
import org.springframework.social.google.api.plus.Person;
import org.springframework.social.google.connect.GoogleConnectionFactory;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.stereotype.Service;

import com.bookup.bookupuserservice.model.User;

@Service
public class GoogleServiceImpl implements IGoogleService {
	
	@Value("${spring.social.google.app-id}")
	private String googleId;
	
	@Value("${spring.social.google.app-secret}")
	private String googleSecret;
	
	@Value("${redirect_url}")
	private String redirectUrl;

	@Autowired 
	private User user;

	// Creates Google OAuth Connection
	private GoogleConnectionFactory createGoogleConnection() {
		return new GoogleConnectionFactory(googleId, googleSecret);
	}

	// Opens the Google Consent Form
	@Override
	public String googlelogin() {
		OAuth2Parameters parameters = new OAuth2Parameters();
		parameters.setRedirectUri(redirectUrl);
		parameters.setScope("profile email");
		return createGoogleConnection().getOAuthOperations().buildAuthenticateUrl(parameters);
	}

	// For getting Google oauth access token
	@Override
	public String getGoogleAccessToken(String code) {
		return createGoogleConnection().getOAuthOperations().exchangeForAccess(code, redirectUrl, null)
				.getAccessToken();
	}

	// For getting google profile of particular user
	@Override
	public User getGoogleUserProfile(String accessToken) {
		Google google = new GoogleTemplate(accessToken);
		Person person = google.plusOperations().getGoogleProfile();
		user.setName(person.getDisplayName());
		user.setEmail(person.getAccountEmail());
		user.setAvatarURL(person.getImageUrl());
		user.setLoggedIn(true);
		return user;
	}


}
