package com.bookup.bookupuserservice.exception;

@SuppressWarnings("serial")
public class DatabaseEmptyException extends Exception {

	String message;

	public DatabaseEmptyException(String message) {
		super(message);
		this.message = message;
	}

	public DatabaseEmptyException() {
		super();
	}

}
