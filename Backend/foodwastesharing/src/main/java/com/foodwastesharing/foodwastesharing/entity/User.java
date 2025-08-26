package com.foodwastesharing.foodwastesharing.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.foodwastesharing.foodwastesharing.info.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.WebProperties;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "userDetail")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "Name",nullable = false)
    private String name;

    @Column(name = "MobileNo",nullable = false,unique = true)
    private long mobile;

    @Column(name = "Email",nullable = false,unique = true)
    private String email;

    @Column(name = "Location",nullable = false)
    private String location;

    @Column(name = "Password",nullable = false,unique = true)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore // prevent recursive loading
    private List<Donation> donations;


}
