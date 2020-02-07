package com.bookup.bookupuserservice.service;

import org.springframework.dao.DuplicateKeyException;

import com.bookup.bookupuserservice.model.User;

public interface IUserService {

	void addUserData(User user) throws DuplicateKeyException;

}
