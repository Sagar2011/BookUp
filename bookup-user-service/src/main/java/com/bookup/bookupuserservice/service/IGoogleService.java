package com.bookup.bookupuserservice.service;

import com.bookup.bookupuserservice.model.User;

public interface IGoogleService {

	String googlelogin();

	String getGoogleAccessToken(String code);

	User getGoogleUserProfile(String accessToken);

}
