# API Reference - Project Horizon

## Overview
This document provides complete API reference for Project Horizon backend.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "message": "Status message",
  "data": { /* response data */ }
}
```

## Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## Endpoints

### Auth Routes (`/auth`)

#### POST `/register`
Register a new user
- **Body**:
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }
  ```
- **Response**: User object and JWT token

#### POST `/login`
Login existing user
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: User object and JWT token

#### GET `/me`
Get current authenticated user
- **Auth**: Required
- **Response**: Current user object

### Users Routes (`/users`)

#### GET `/profile/:id`
Get user profile by ID
- **Response**: User profile object

#### PUT `/profile`
Update current user profile
- **Auth**: Required
- **Body**: User fields to update

#### GET `/instructor/:id`
Get instructor profile with their courses
- **Response**: Instructor details and courses

### Courses Routes (`/courses`)

#### GET `/`
Get all published courses (with filtering)
- **Query Parameters**:
  - `category`: Filter by category
  - `level`: Filter by level
  - `search`: Search by title/description
- **Response**: Array of courses

#### GET `/:id`
Get single course details
- **Response**: Course object with full details

#### POST `/`
Create new course (Instructor/Admin only)
- **Auth**: Required (instructor/admin)
- **Body**: Course details

#### PUT `/:id`
Update course (Instructor/Admin only)
- **Auth**: Required
- **Body**: Fields to update

#### DELETE `/:id`
Delete course (Instructor/Admin only)
- **Auth**: Required

### Enrollments Routes (`/enrollments`)

#### POST `/`
Enroll in a course
- **Auth**: Required
- **Body**: `{ "courseId": "course_id" }`

#### GET `/my-enrollments`
Get all student enrollments
- **Auth**: Required
- **Response**: Array of enrollments

#### GET `/:id`
Get single enrollment details
- **Auth**: Required

#### PUT `/:id/progress`
Update enrollment progress
- **Auth**: Required
- **Body**: `{ "progress": 50, "lessonCompleted": "lesson_id" }`

### Quizzes Routes (`/quizzes`)

#### POST `/`
Create new quiz (Instructor/Admin only)
- **Auth**: Required
- **Body**: Quiz details with questions

#### GET `/:id`
Get quiz details
- **Auth**: Required

#### POST `/:quizId/submit`
Submit quiz answers
- **Auth**: Required
- **Body**: `{ "answers": [...], "duration": 30 }`

#### GET `/responses/my-responses`
Get all student quiz responses
- **Auth**: Required

### Progress Routes (`/progress`)

#### GET `/dashboard`
Get dashboard statistics
- **Auth**: Required
- **Response**: Stats object with enrollment and quiz data

#### GET `/analytics`
Get detailed learning analytics
- **Auth**: Required
- **Response**: Course progress and category distribution

### AI Routes (`/ai`)

#### POST `/chat`
Chat with AI learning assistant
- **Auth**: Required
- **Body**: `{ "message": "Question", "courseId": "optional" }`
- **Response**: AI generated answer

#### GET `/recommendations`
Get AI-powered course recommendations
- **Auth**: Required
- **Response**: Array of recommended courses

#### POST `/generate-quiz`
Generate quiz questions using AI
- **Auth**: Required
- **Body**: `{ "courseId": "id", "topicName": "topic", "numberOfQuestions": 5 }`
- **Response**: Array of generated questions

#### GET `/skill-analysis`
Get AI skill analysis and recommendations
- **Auth**: Required
- **Response**: Completed skills and career recommendations

### Admin Routes (`/admin`)

#### GET `/users`
Get all users (Admin only)
- **Auth**: Required (admin)
- **Query**: `?role=student`
- **Response**: Array of users

#### PUT `/courses/:id/approve`
Approve course for publication (Admin only)
- **Auth**: Required (admin)

#### GET `/statistics`
Get platform statistics (Admin only)
- **Auth**: Required (admin)
- **Response**: Platform statistics object

## Error Handling

Errors return appropriate HTTP status codes with error messages:
```json
{
  "success": false,
  "message": "Error description",
  "error": { /* additional error details */ }
}
```

## Rate Limiting
Not implemented yet. Recommended for production.

## Pagination
Supported on list endpoints with query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

## Sorting
Supported on list endpoints:
- `sort`: Field name
- `order`: 'asc' or 'desc'
