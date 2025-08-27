package com.foodwastesharing.foodwastesharing.controller;

import com.foodwastesharing.foodwastesharing.entity.Donation;
import com.foodwastesharing.foodwastesharing.service.DonationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "https://foodwastesharing.netlify.app", allowCredentials = "true")
public class DonationController {

    @Autowired
    private DonationService donationService;

    @PostMapping("/create/{userId}")
    public Donation createDonation(@PathVariable Long userId, @RequestBody Donation donation) {
        return donationService.createDonation(userId, donation);
    }

    @GetMapping
    public List<Donation> getAllDonations() {
        return donationService.getAllDonations();
    }

    @GetMapping("/user/{userId}")
    public List<Donation> getDonationsByUser(@PathVariable Long userId) {
        return donationService.getDonationsByUserId(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteDonation(@PathVariable Long id) {
        donationService.deleteDonation(id);
    }
}
