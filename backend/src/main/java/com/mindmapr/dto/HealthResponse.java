package com.mindmapr.dto;

public class HealthResponse {
    private String status;
    private String application;
    private String message;

    public HealthResponse() {
    }

    public HealthResponse(String status, String application, String message) {
        this.status = status;
        this.application = application;
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
