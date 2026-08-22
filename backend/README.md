# Mind Mapr Backend

## Technology Stack
- **Language**: Java 17+ (LTS)
- **Framework**: Spring Boot 3.3.5
- **Build Tool**: Maven

## Architecture Overview
The backend is structured into clear layers for scalability:
```
com.mindmapr
├── MindMaprBackendApplication.java   # Spring Boot Application Entry Point
├── controller/                       # REST API Controllers (HealthController)
├── service/                          # Business Logic Layer (HealthService)
├── dto/                              # Data Transfer Objects (HealthResponse)
├── config/                           # Application Configurations (CorsConfig)
├── model/                            # Domain Entities (future steps)
├── repository/                       # Data Repositories (future steps)
└── exception/                        # Global Exception Handling (GlobalExceptionHandler)
```

## Development Server
The Spring Boot backend runs locally on port `8080`:
- **Base URL**: `http://localhost:8080`

## Health Endpoint
- **URL**: `GET /api/health`
- **Method**: `GET`
- **Headers**: `Accept: application/json`
- **Status Code**: `200 OK`

### Example Response
```json
{
  "status": "UP",
  "application": "Mind Mapr",
  "message": "Backend is running successfully"
}
```

## Running the Backend

### Using Maven
```bash
cd backend
mvn clean spring-boot:run
```

### Building the JAR
```bash
cd backend
mvn clean package
java -jar target/mindmapr-backend-0.0.1-SNAPSHOT.jar
```

## Future Development Roadmap
- **Step 2**: Database Integration (PostgreSQL + Spring Data JPA)
- **Step 3**: Authentication & Security (Spring Security 6 + JWT)
- **Step 4**: File Storage & Document Processing (PDF/DOCX)
- **Step 5**: AI Integration (Grok / LLM API Orchestration)
- **Step 6**: Full Frontend-to-Backend API Wiring
