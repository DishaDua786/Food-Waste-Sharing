package com.foodwastesharing.foodwastesharing.repository;

import com.foodwastesharing.foodwastesharing.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
}
