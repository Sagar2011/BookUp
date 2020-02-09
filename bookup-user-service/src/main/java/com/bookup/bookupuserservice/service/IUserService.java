package com.bookup.bookupuserservice.service;

import javax.servlet.http.HttpServletRequest;

import com.bookup.bookupuserservice.model.User;

public interface IUserService {

	User loadByUsername(HttpServletRequest request);

	User findByUserEmail(String email);

}
