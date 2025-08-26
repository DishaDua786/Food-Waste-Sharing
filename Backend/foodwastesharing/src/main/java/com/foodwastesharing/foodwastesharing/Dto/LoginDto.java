package com.foodwastesharing.foodwastesharing.Dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginDto {
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}