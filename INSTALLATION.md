# Project Horizon - Complete Setup & Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Installation Guide](#installation-guide)
4. [API Documentation](#api-documentation)
5. [Features](#features)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)

## 🎯 Project Overview

Project Horizon is a comprehensive Learning and Skill Development Platform built with modern web technologies. It provides:

- **Student Portal**: Course enrollment, video lectures, quizzes, progress tracking
- **Instructor Dashboard**: Course management, student analytics, content upload
- **Admin Panel**: User management, platform analytics, course approval
- **AI-Powered Features**: Course recommendations, learning assistant, quiz generation, skill analysis

## 💻 Technology Stack

### Backend
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB 7.5.0
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs 2.4.3
- **File Storage**: Cloudinary
- **AI Integration**: Google Generative AI (Gemini Pro)
- **Validation**: express-validator 7.0.0
- **Email**: Nodemailer 6.9.5

### Frontend
- **Framework**: React 18.2.0
- **UI Library**: Tailwind CSS 3.3.0
- **Routing**: React Router DOM 6.16.0
- **HTTP Client**: Axios 1.5.0
- **Icons**: React Icons 4.12.0
- **Charts**: Chart.js 4.4.0, react-chartjs-2 5.2.0
- **Date Utility**: date-fns 2.30.0

## 🚀 Installation Guide

### Prerequisites
- Node.js v14 or higher
- MongoDB (local or cloud)
- npm or yarn
- Cloudinary account
- Google Generative AI API key

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration
# Required:
# - MONGODB_URI: MongoDB connection string
# - JWT_SECRET: Secret key for JWT tokens
# - GEMINI_API_KEY: Google Generative AI API key
# - CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

# Start the server
npm start          # Production mode
npm run dev        # Development mode (with nodemon)
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start          # Runs on http://localhost:3000

# Build for production
npm run build
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student" // or "instructor"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { ... }
}
```

#### Get Current User
```
GET /auth/me
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": { ... }
}
```

### Courses Endpoints

#### Get All Courses
```
GET /courses?category=Programming&level=Beginner&search=javascript

Query Parameters:
- category: Programming, Web Development, Data Science, Mobile Development, Cloud Computing
- level: Beginner, Intermediate, Advanced
- search: Search by title or description

Response:
{
  "success": true,
  "count": 10,
  "courses": [ ... ]
}
```

#### Get Single Course
```
GET /courses/:id

Response:
{
  "success": true,
  "course": { ... }
}
```

#### Create Course (Instructor/Admin)
```
POST /courses
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Basics",
  "description": "Learn JavaScript fundamentals",
  "category": "Programming",
  "level": "Beginner",
  "duration": 10
}

Response:
{
  "success": true,
  "message": "Course created successfully",
  "course": { ... }
}
```

#### Update Course
```
PUT /courses/:id
Header: Authorization: Bearer <token>
Content-Type: application/json

{ ... course fields ... }
```

#### Delete Course
```
DELETE /courses/:id
Header: Authorization: Bearer <token>
```

### Enrollment Endpoints

#### Enroll in Course
```
POST /enrollments
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id_here"
}

Response:
{
  "success": true,
  "message": "Enrolled successfully",
  "enrollment": { ... }
}
```

#### Get My Enrollments
```
GET /enrollments/my-enrollments
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "enrollments": [ ... ]
}
```

#### Update Progress
```
PUT /enrollments/:id/progress
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "progress": 50,
  "lessonCompleted": "lesson_id"
}
```

### Quiz Endpoints

#### Create Quiz (Instructor/Admin)
```
POST /quizzes
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "JavaScript Quiz",
  "description": "Test your JS knowledge",
  "course": "course_id",
  "questions": [
    {
      "questionText": "What is a variable?",
      "type": "multiple-choice",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctAnswer": "Option 1",
      "marks": 1
    }
  ],
  "totalMarks": 10,
  "passingScore": 40,
  "timeLimit": 30
}
```

#### Get Quiz
```
GET /quizzes/:id
Header: Authorization: Bearer <token>
```

#### Submit Quiz
```
POST /quizzes/:quizId/submit
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": [
    {
      "questionId": "q_id_1",
      "studentAnswer": "Option 1"
    }
  ],
  "duration": 25
}

Response:
{
  "success": true,
  "message": "Quiz submitted successfully",
  "result": {
    "totalMarksObtained": 8,
    "totalMarks": 10,
    "percentage": 80,
    "isPassed": true
  }
}
```

### Progress Endpoints

#### Get Dashboard Stats
```
GET /progress/dashboard
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "stats": {
    "totalCoursesEnrolled": 5,
    "completedCourses": 2,
    "inProgressCourses": 3,
    "totalQuizzesTaken": 15,
    "averageQuizScore": 85.5,
    "totalLearningHours": 150
  }
}
```

#### Get Analytics
```
GET /progress/analytics
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "courseProgress": [ ... ],
  "categoryDistribution": { ... }
}
```

### AI Endpoints

#### AI Learning Assistant (Chatbot)
```
POST /ai/chat
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "What is JavaScript?",
  "courseId": "optional_course_id"
}

Response:
{
  "success": true,
  "response": "JavaScript is a programming language..."
}
```

#### Get Course Recommendations
```
GET /ai/recommendations
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "recommendations": [ ... ],
  "reason": "Based on your enrolled courses"
}
```

#### Generate Quiz Questions
```
POST /ai/generate-quiz
Header: Authorization: Bearer <token>
Content-Type: application/json

{
  "courseId": "course_id",
  "topicName": "Variables in JavaScript",
  "numberOfQuestions": 5
}

Response:
{
  "success": true,
  "questions": [ ... ]
}
```

#### Get Skill Analysis
```
GET /ai/skill-analysis
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "completedSkills": [ ... ],
  "recommendation": "You should learn Node.js to become a Full Stack Developer..."
}
```

### Admin Endpoints

#### Get All Users
```
GET /admin/users?role=student
Header: Authorization: Bearer <admin_token>

Query Parameters:
- role: student, instructor, admin

Response:
{
  "success": true,
  "count": 50,
  "users": [ ... ]
}
```

#### Approve Course
```
PUT /admin/courses/:id/approve
Header: Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "message": "Course approved",
  "course": { ... }
}
```

#### Get Platform Statistics
```
GET /admin/statistics
Header: Authorization: Bearer <admin_token>

Response:
{
  "success": true,
  "statistics": {
    "totalUsers": 150,
    "totalStudents": 120,
    "totalInstructors": 25,
    "totalCourses": 30,
    "totalEnrollments": 450
  }
}
```

## 🎓 Features

### Student Features
- ✅ User registration and authentication
- ✅ Browse and search courses
- ✅ Enroll in courses
- ✅ Watch video lectures
- ✅ Take quizzes and assessments
- ✅ Track learning progress
- ✅ Download certificates
- ✅ View personalized recommendations
- ✅ Ask questions to AI assistant
- ✅ Update profile

### Instructor Features
- ✅ Create and manage courses
- ✅ Upload learning materials
- ✅ Create quizzes
- ✅ Monitor student progress
- ✅ View analytics
- ✅ AI-generated quiz questions
- ✅ Manage course modules and lessons

### Admin Features
- ✅ User management
- ✅ Course approval workflow
- ✅ Platform analytics
- ✅ View statistics
- ✅ Manage all content
- ✅ User role management

### AI Features
- ✅ **Recommendation Engine**: Suggests courses based on learning history
- ✅ **Learning Assistant**: AI chatbot for course-related questions
- ✅ **Quiz Generator**: Auto-generate MCQs from course content
- ✅ **Skill Analyzer**: Career progression suggestions

## 📊 Database Schema

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: ['student', 'instructor', 'admin'],
  profilePicture: String,
  bio: String,
  specialization: String,
  skills: [String],
  phone: String,
  location: String,
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String
  },
  isVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  thumbnail: String,
  instructor: ObjectId (ref: User),
  category: String,
  level: ['Beginner', 'Intermediate', 'Advanced'],
  duration: Number,
  price: Number,
  rating: Number,
  reviews: [Object],
  modules: [{
    title: String,
    lessons: [{
      title: String,
      videoUrl: String,
      resources: [Object]
    }]
  }],
  prerequisites: [String],
  learningOutcomes: [String],
  enrollmentCount: Number,
  status: ['draft', 'published', 'archived'],
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Enrollment Model
```javascript
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  enrollmentDate: Date,
  completionDate: Date,
  status: ['active', 'completed', 'dropped'],
  progress: Number,
  certificateUrl: String,
  lessonsCompleted: [Object],
  lastAccessedAt: Date,
  notes: [Object]
}
```

### Quiz Model
```javascript
{
  title: String,
  description: String,
  course: ObjectId (ref: Course),
  createdBy: ObjectId (ref: User),
  questions: [{
    questionText: String,
    type: ['multiple-choice', 'short-answer', 'essay'],
    options: [String],
    correctAnswer: String,
    marks: Number
  }],
  totalMarks: Number,
  passingScore: Number,
  timeLimit: Number,
  attempts: Number,
  isPublished: Boolean,
  createdAt: Date
}
```

## 🌐 Deployment

### Backend Deployment (Heroku/Railway)

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Add environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_jwt_secret"
heroku config:set GEMINI_API_KEY="your_api_key"

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)

```bash
# Using Vercel CLI
npm i -g vercel
vercel

# Or using Netlify
netlify deploy --prod --dir=build
```

### Environment Variables Needed

**Backend (.env)**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend-url.com
```

**Frontend (.env)**
```
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_ENV=production
```

## 📝 Development Notes

### Folder Structure
```
project-horizon/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Helper functions
│   ├── .env.example
│   ├── package.json
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   ├── App.js       # Main app
│   │   └── index.js     # Entry point
│   ├── public/
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Email: support@projecthorizon.com

## 📄 License

MIT License - feel free to use this project!

---

**Happy Learning! 🚀**