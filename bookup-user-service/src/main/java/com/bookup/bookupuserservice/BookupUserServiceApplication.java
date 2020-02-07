package com.bookup.bookupuserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class BookupUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookupUserServiceApplication.class, args);
	}

}
