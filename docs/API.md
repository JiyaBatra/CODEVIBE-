# CodeVibe API Specifications

This document outlines the REST API endpoints provided by the CodeVibe backend. All requests and responses communicate using JSON payloads.

---

## 1. Authentication Routes

### `POST /api/auth/register`
* **Description**: Registers a new user.
* **Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```
* **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### `POST /api/auth/login`
* **Description**: Authenticates existing users and returns a JWT token.
* **Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### `POST /api/auth/logout`
* **Description**: Invalidates client-side authentication tokens.
* **Headers**: `Authorization: Bearer <TOKEN>`
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 2. Lessons & Courses

### `GET /api/lessons/:courseId`
* **Description**: Retrieves all lessons associated with a specific course.
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "lessons": [
    {
      "id": "lesson_1",
      "title": "Introduction to Variables",
      "courseId": "c_programming",
      "difficulty": "Beginner"
    }
  ]
}
```

### `GET /api/lessons/:id`
* **Description**: Retrieves details for an individual lesson.
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "lesson": {
    "id": "lesson_1",
    "title": "Introduction to Variables",
    "content": "Variables are containers...",
    "instruction": "Declare an integer variable...",
    "starterCode": "int main() {\n  // Code here\n}"
  }
}
```

---

## 3. Code Execution Engine (Compiler)

### `POST /api/compiler/execute`
* **Description**: Compiles and executes code in the sandbox environment.
* **Request Body**:
```json
{
  "code": "console.log('Hello World');",
  "language": "javascript"
}
```
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "output": "Hello World\n",
  "executionTime": "45ms"
}
```

### `POST /api/compiler/submit`
* **Description**: Submits the solution for dynamic validation tests.
* **Request Body**:
```json
{
  "lessonId": "lesson_1",
  "code": "int a = 10;",
  "language": "c"
}
```
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "passed": true,
  "score": 100,
  "feedback": "Congratulations! All test cases passed."
}
```

---

## 4. Progress Tracking

### `GET /api/progress/:userId`
* **Description**: Fetches user progress analytics for the dashboard dashboard.
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "completedLessonsCount": 5,
  "totalPoints": 500,
  "history": [
    { "lessonId": "lesson_1", "status": "completed", "completedAt": "2026-05-28" }
  ]
}
```

### `POST /api/progress/track`
* **Description**: Saves status and marks a lesson as completed.
* **Request Body**:
```json
{
  "userId": "60d0fe4f5311236168a109ca",
  "lessonId": "lesson_1",
  "status": "completed"
}
```
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Progress recorded successfully"
}
```

---

## 5. Certificates System

### `GET /api/certificates/:userId`
* **Description**: Generates high-quality, printable course completion certificates.
* **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "certificateUrl": "https://codevibe.dev/certs/cert_123.pdf",
  "issuedAt": "2026-05-28"
}
```
