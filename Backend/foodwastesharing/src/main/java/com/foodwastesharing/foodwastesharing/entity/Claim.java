package com.foodwastesharing.foodwastesharing.entity;

import com.foodwastesharing.foodwastesharing.info.ClaimStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "claim_detail")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claimId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // Who is claiming

    @ManyToOne
    @JoinColumn(name = "donation_id")
    private Donation donation; // What is being claimed

    @Enumerated(EnumType.STRING)
    private ClaimStatus status;

    private int tokenNumber;

    private LocalDateTime claimedAt;

    @PrePersist
    public void onCreate() {
        this.claimedAt = LocalDateTime.now();
        this.status = ClaimStatus.Pending;
    }
}
