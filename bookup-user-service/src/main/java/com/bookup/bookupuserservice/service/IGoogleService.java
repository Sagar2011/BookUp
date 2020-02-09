package com.bookup.bookupuserservice.service;

import org.springframework.dao.DuplicateKeyException;

import com.bookup.bookupuserservice.exception.UserNotFoundException;
import com.bookup.bookupuserservice.model.User;

public interface IGoogleService {

	String getAccessToken(String code) throws UserNotFoundException;

	User getUserProfile(String accessToken) throws UserNotFoundException;

	void addUserData(User user) throws DuplicateKeyException;

}
