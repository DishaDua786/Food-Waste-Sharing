package com.foodwastesharing.foodwastesharing.service;

import com.foodwastesharing.foodwastesharing.entity.Claim;
import com.foodwastesharing.foodwastesharing.entity.Donation;
import com.foodwastesharing.foodwastesharing.entity.User;
import com.foodwastesharing.foodwastesharing.info.ClaimStatus;
import com.foodwastesharing.foodwastesharing.repository.ClaimRepository;
import com.foodwastesharing.foodwastesharing.repository.DonationRepository;
import com.foodwastesharing.foodwastesharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DonationRepository donationRepository;

    public Claim createClaim(Long userId, Long donationId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Donation donation = donationRepository.findById(donationId).orElseThrow(() -> new RuntimeException("Donation not found"));

        int currentClaims = claimRepository.countByDonation(donation);
        if (currentClaims >= donation.getQuantity()) {
            throw new RuntimeException("All tokens claimed for this donation");
        }

        Claim claim = new Claim();
        claim.setUser(user);
        claim.setDonation(donation);
        claim.setStatus(ClaimStatus.Pending);
        claim.setTokenNumber(currentClaims + 1); // 1-based token system

        return claimRepository.save(claim);
    }

    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    public Claim updateClaimStatus(Long claimId, ClaimStatus status) {
        Claim claim = claimRepository.findById(claimId).orElseThrow(() -> new RuntimeException("Claim not found"));
        claim.setStatus(status);
        return claimRepository.save(claim);
    }
}
