package com.foodwastesharing.foodwastesharing.Dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
public class UserDto {
    @NotBlank
    private String name;

    @Email
    private String email;

    @Size(min = 8)
    private String password;

    @NotNull
    private Long mobile;

    @NotBlank
    private String location;
}
