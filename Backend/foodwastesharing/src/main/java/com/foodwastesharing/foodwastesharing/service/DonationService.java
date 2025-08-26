package com.foodwastesharing.foodwastesharing.service;

import com.foodwastesharing.foodwastesharing.entity.Donation;
import com.foodwastesharing.foodwastesharing.entity.User;
import com.foodwastesharing.foodwastesharing.repository.DonationRepository;
import com.foodwastesharing.foodwastesharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationService {

    @Autowired
    private DonationRepository donationRepository;

    @Autowired
    private UserRepository userRepository;

    public Donation createDonation(Long userId, Donation donation) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        donation.setUser(user);
        return donationRepository.save(donation);
    }

    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    public List<Donation> getDonationsByUserId(Long userId) {
        return donationRepository.findByUserId(userId);
    }

    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
