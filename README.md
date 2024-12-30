### Features

- **JWT-based Authentication**: Secure authentication using JSON Web Tokens.
- **Role-based Access Control**: Different roles (Admin, User) with specific permissions.
- **Water Intake Tracker**: Log daily water intake and track streaks.
- **Movement Tracker**: Track user movements and calculate distance traveled.
- **Kafka Integration**: Use Kafka for handling GPS data.
- **Swagger**: API documentation with Swagger (OpenAPI).
- **Docker and Docker Compose**: Containerization for seamless deployment.
- **Rate Limiting**: Implement rate limiting to prevent abuse.
- **Logging**: Centralized logging with `nestjs-pino`.

### Notes

- It's better to not use `:latest` tag for Docker images in production.
- Store valid refresh tokens in a key-value database like Redis.
- RabbitMQ is more fit for asynchronous load balancing, and Kafka suffers from head-of-line blocking for partitions.
- Using `forwardRef` is not a good practice; it was used here for simplicity.
- Please read TODO: in the codebase.

### TODO:

**Pending improvements:**

- Implement caching for frequently accessed data.
- Implement comprehensive E2E and unit tests.
- Optimize database queries and indexing.
- Add more detailed logging and monitoring.

**Note**: The implementation focuses on core functionalities to ensure timely delivery. Advanced configurations, optimizations, and additional features can be added in future iterations.

#### Installation

- Install [Docker and Docker Compose](https://www.docker.com/)

#### Start Development Mode (hot-reload)

```bash
docker compose up dev --build

```
Access the API documentation at http://localhost:3000/docs.


##### Start For Production

```bash
docker compose up nginx --build -d
```
Access the API documentation at http://localhost/docs.


##### Run Test

```bash
npm run test
```

Welcome to the Karafs backend coding challenge repository! This challenge is designed to evaluate your skills in building robust, scalable, and maintainable backend systems using NestJS, TypeScript, MongoDB, and Kafka.

## Challenge Overview

The task involves building a backend service for a health tracker application with the following core features:

1.  Authentication and Authorization:
    - Implement JWT-based authentication.
    - Role-based access control (e.g., Admin and User roles).
2.  Water Intake Tracker:
    - Users can log their daily water intake.
    - Each user has a daily water goal.
    - Increment a streak when the goal is achieved (once per day).
3.  Movement Tracker:
    - Users must first activate location tracking through an API endpoint before the system starts accepting their GPS data.
    - Users periodically send their GPS location to the backend.
    - GPS data should be published to Kafka.
    - Calculate the total distance traveled per hour using this data.
4.  Admin Dashboard Endpoints:
    - Admins can view all user data, including water intake, streaks, and movement statistics.

## Technical Requirements

- Framework: NestJS with TypeScript.
- Database: MongoDB with Mongoose.
- Message Broker: Kafka for handling GPS data.
- Containerization: Dockerize the application for seamless deployment.
- Testing: Write unit tests for core functionalities.
- Documentation: Use Swagger (OpenAPI) for API documentation.

## Prerequisites

- Node.js (v18+)
- Docker
- Kafka
- MongoDB

## Submission Guidelines

1.  Complete the task as described above.
2.  Push your code to your GitHub repository.
3.  Submit your solution as a pull request to this repository.

## Evaluation Criteria

Your submission will be evaluated based on:

- Code Quality: Clean, modular, and follows best practices.
- Functionality: Meets all requirements.
- Testing: Comprehensive unit tests.
- Documentation: Clear and detailed.
- Performance: Efficient and scalable implementation.

##

Thank you for participating in the Karafs Backend Challenge! 🎉 For any questions, feel free to reach out to us.
