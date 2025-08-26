package com.foodwastesharing.foodwastesharing.controller;

import com.foodwastesharing.foodwastesharing.Dto.LoginDto;
import com.foodwastesharing.foodwastesharing.Dto.UserDto;
import com.foodwastesharing.foodwastesharing.entity.User;
import com.foodwastesharing.foodwastesharing.info.UserRole;
import com.foodwastesharing.foodwastesharing.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Restrict to your frontend only
public class UserController {

    @Autowired
    private UserService userService;

    // ✅ Registration Endpoint (Modified for form-data)
    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registerUser(
            @RequestBody @Valid UserDto userDto) {  // Added @Valid for validation
        Map<String, String> response = new HashMap<>();
        try {
            // Debugging: Print received DTO
            System.out.println("Received: " + userDto.toString());

            User newUser = new User();
            newUser.setName(userDto.getName());
            newUser.setEmail(userDto.getEmail());
            newUser.setPassword(userDto.getPassword());
            newUser.setMobile(userDto.getMobile());
            newUser.setLocation(userDto.getLocation());

            User savedUser = userService.createUser(newUser);
            response.put("status", "success");
            response.put("userId", String.valueOf(savedUser.getId().longValue()));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Enhanced error logging
            System.err.println("Registration failed: " + e.getMessage());
            e.printStackTrace();
            response.put("status", "error");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    // ✅ Login Endpoint (Simplified - No JWT in this example)
    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUser(@RequestBody @Valid LoginDto loginDto) {
        Map<String, Object> response = new HashMap<>();

        try {
            Optional<User> user = userService.authenticateUser(
                    loginDto.getEmail(),
                    loginDto.getPassword()
            );

            if (user.isPresent()) {
                response.put("status", "success");
                response.put("userId", user.get().getId());
                response.put("name", user.get().getName());
                return ResponseEntity.ok(response);
            } else {
                response.put("status", "error");
                response.put("message", "Invalid credentials");
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    // Existing endpoints (keep these)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(id, user));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}