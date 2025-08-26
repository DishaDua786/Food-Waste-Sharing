package com.foodwastesharing.foodwastesharing.controller;

import com.foodwastesharing.foodwastesharing.entity.Claim;
import com.foodwastesharing.foodwastesharing.info.ClaimStatus;
import com.foodwastesharing.foodwastesharing.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    // Create new claim
    @PostMapping("/create/{userId}/{donationId}")
    public Claim createClaim(@PathVariable Long userId, @PathVariable Long donationId) {
        return claimService.createClaim(userId, donationId);
    }

    // Get all claims
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimService.getAllClaims();
    }

    // Update claim status (approve/reject)
    @PutMapping("/status/{claimId}")
    public Claim updateClaimStatus(@PathVariable Long claimId, @RequestParam ClaimStatus status) {
        return claimService.updateClaimStatus(claimId, status);
    }
}
