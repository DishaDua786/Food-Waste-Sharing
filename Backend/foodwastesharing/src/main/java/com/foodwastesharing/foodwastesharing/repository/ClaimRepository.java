package com.foodwastesharing.foodwastesharing.repository;

import com.foodwastesharing.foodwastesharing.entity.Claim;
import com.foodwastesharing.foodwastesharing.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByDonation(Donation donation);
    int countByDonation(Donation donation);
}
