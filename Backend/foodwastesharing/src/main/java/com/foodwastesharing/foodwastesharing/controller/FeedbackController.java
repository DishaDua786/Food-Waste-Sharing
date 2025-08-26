package com.foodwastesharing.foodwastesharing.controller;

import com.foodwastesharing.foodwastesharing.entity.Feedback;
import com.foodwastesharing.foodwastesharing.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/create/{userId}")
    public Feedback submitFeedback(@PathVariable Long userId, @RequestBody Feedback feedback) {
        return feedbackService.createFeedback(userId, feedback);
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedback();
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
    }
}
