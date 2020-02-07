package com.bookup.bookupuserservice.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.bookup.bookupuserservice.model.User;

@Repository
public interface IUserRepository extends MongoRepository<User, String> {

	User findByEmail(String email);

}
