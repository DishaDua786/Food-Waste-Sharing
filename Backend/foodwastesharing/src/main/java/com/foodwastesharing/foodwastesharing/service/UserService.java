package com.foodwastesharing.foodwastesharing.service;

import com.foodwastesharing.foodwastesharing.entity.User;
import com.foodwastesharing.foodwastesharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // ✅ Get user by email (unchanged)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Create user WITH PASSWORD HASHING
    public User createUser(User user) {
        // Add password length validation
        if (user.getPassword().length() > 72) {
            throw new IllegalArgumentException("Password must be 72 characters or less");
        }

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // ✅ Verify password during login
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    // ✅ Get user by ID (unchanged)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // ✅ Get all users (unchanged)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Delete user (unchanged)
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // ✅ Update user WITH PASSWORD PROTECTION
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    // Only update these non-sensitive fields
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    user.setMobile(updatedUser.getMobile());
                    user.setLocation(updatedUser.getLocation());
                    user.setRole(updatedUser.getRole());

                    // Password updates require special handling
                    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                        user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                    }

                    return userRepository.save(user);
                }).orElse(null);
    }
    public Optional<User> authenticateUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
}