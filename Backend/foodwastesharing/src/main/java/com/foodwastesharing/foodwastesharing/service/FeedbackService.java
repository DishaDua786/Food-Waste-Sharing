package com.foodwastesharing.foodwastesharing.service;

import com.foodwastesharing.foodwastesharing.entity.Feedback;
import com.foodwastesharing.foodwastesharing.entity.User;
import com.foodwastesharing.foodwastesharing.repository.FeedbackRepository;
import com.foodwastesharing.foodwastesharing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    public Feedback createFeedback(Long userId, Feedback feedback) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new RuntimeException("User not found with id: " + userId));

        feedback.setUser(user);
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
