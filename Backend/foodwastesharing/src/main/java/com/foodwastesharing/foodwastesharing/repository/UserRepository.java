package com.foodwastesharing.foodwastesharing.repository;

import com.foodwastesharing.foodwastesharing.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByMobile(int mobile);
    boolean existsByEmail(String email);
    boolean existsByMobile(int mobile);
}
