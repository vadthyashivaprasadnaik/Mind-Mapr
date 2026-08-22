package com.mindmapr.service;

import com.mindmapr.dto.HealthResponse;
import org.springframework.stereotype.Service;

@Service
public class HealthService {

    public HealthResponse getHealthStatus() {
        return new HealthResponse("UP", "Mind Mapr", "Backend is running successfully");
    }
}
