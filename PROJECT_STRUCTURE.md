# Project Structure Documentation

## Backend Architecture

### `/backend` Directory Structure

```
backend/
├── models/
│   ├── User.js              # User schema and authentication methods
│   ├── Course.js            # Course schema with modules and lessons
│   ├── Enrollment.js        # Student course enrollment tracking
│   ├── Quiz.js              # Quiz schema with questions
│   ├── QuizResponse.js      # Student quiz responses and results
│   └── Certificate.js       # Course completion certificates
├── routes/
│   ├── auth.js              # Authentication routes (register, login)
│   ├── users.js             # User profile management
│   ├── courses.js           # Course CRUD operations
│   ├── enrollments.js       # Enrollment management
│   ├── quizzes.js           # Quiz creation and submission
│   ├── progress.js          # Learning progress tracking
│   ├── ai.js                # AI features (recommendations, chatbot, quiz generator)
│   └── admin.js             # Admin operations
├── middleware/
│   └── auth.js              # JWT authentication and authorization middleware
├── utils/
│   └── (utility functions)  # Helper functions, validators
├── config/
│   └── (database config)    # MongoDB connection config
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── server.js                # Express server entry point
```

### Key Components

#### Models

**User.js**
- Stores user information (name, email, role, profile)
- Password hashing with bcrypt
- Role-based access (student, instructor, admin)
- Methods: `matchPassword()`, `generateToken()`

**Course.js**
- Course information and structure
- Nested modules and lessons
- Instructor reference
- Course status (draft, published, archived)
- Learning outcomes and prerequisites

**Enrollment.js**
- Links students to courses
- Tracks progress (0-100%)
- Records completed lessons
- Stores course completion status
- Unique constraint on (student, course) pair

**Quiz.js**
- Quiz configuration and questions
- Question types (MCQ, short-answer, essay)
- Time limits and passing scores
- Publication status

**QuizResponse.js**
- Student's quiz attempt data
- Individual question responses
- Scoring and results
- Attempt tracking

#### Routes

**auth.js**
- POST `/register` - User registration
- POST `/login` - User authentication
- GET `/me` - Current user info

**courses.js**
- GET `/` - List courses with filters
- GET `/:id` - Course details
- POST `/` - Create course (instructor)
- PUT `/:id` - Update course
- DELETE `/:id` - Delete course

**enrollments.js**
- POST `/` - Enroll in course
- GET `/my-enrollments` - Student's enrollments
- PUT `/:id/progress` - Update learning progress

**quizzes.js**
- POST `/` - Create quiz (instructor)
- GET `/:id` - Get quiz
- POST `/:quizId/submit` - Submit answers

**ai.js**
- POST `/chat` - AI learning assistant
- GET `/recommendations` - Course recommendations
- POST `/generate-quiz` - AI quiz generation
- GET `/skill-analysis` - Career recommendations

**admin.js**
- GET `/users` - All users management
- PUT `/courses/:id/approve` - Approve courses
- GET `/statistics` - Platform analytics

#### Middleware

**auth.js**
- `auth()` - Verify JWT token
- `authorize(...roles)` - Role-based access control
- Applied to protected routes

## Frontend Architecture

### `/frontend/src` Directory Structure

```
frontend/src/
├── components/
│   ├── Navbar.js            # Top navigation bar
│   └── Sidebar.js           # Side navigation menu
├── pages/
│   ├── Home.js              # Landing page
│   ├── Login.js             # User login page
│   ├── Register.js          # User registration
│   ├── Courses.js           # Courses listing and filtering
│   ├── CourseDetail.js      # Single course details
│   ├── StudentDashboard.js  # Student dashboard
│   ├── InstructorDashboard.js # Instructor dashboard
│   ├── AdminDashboard.js    # Admin dashboard
│   └── Profile.js           # User profile editing
├── utils/
│   ├── api.js               # API client configuration
│   └── (helper functions)   # Utility functions
├── context/
│   └── (Context providers)  # Global state management
├── App.js                   # Main app component with routing
├── App.css                  # App styles
├── index.js                 # React entry point
└── index.css                # Global styles
```

### Key Components

#### Navbar.js
- Logo and branding
- Navigation links
- User authentication display
- Responsive menu button

#### Sidebar.js
- Role-based menu items
- Navigation links based on user role
- Active page highlighting
- Responsive sidebar

#### Pages

**Home.js**
- Landing page with hero section
- Feature highlights
- Call-to-action buttons
- Marketing copy

**Login.js & Register.js**
- Form validation
- API integration
- Token storage
- Error handling

**Courses.js**
- Course listing
- Search and filter functionality
- Course cards with ratings
- Pagination support

**CourseDetail.js**
- Comprehensive course information
- Module and lesson overview
- Enrollment button
- Instructor information

**StudentDashboard.js**
- Learning statistics cards
- Course progress tracking
- Quiz performance metrics
- Analytics and charts

**InstructorDashboard.js**
- My courses list
- Student enrollment stats
- Course creation button
- Performance metrics

**AdminDashboard.js**
- Platform-wide statistics
- User management
- Course approval workflow
- System analytics

**Profile.js**
- User profile information
- Edit mode toggle
- Profile picture
- Social links

## Data Flow

### Authentication Flow
```
1. User fills registration/login form
2. Frontend sends credentials to backend
3. Backend validates and creates JWT
4. Frontend stores token in localStorage
5. Token included in all future requests
6. Middleware validates token on backend
```

### Course Enrollment Flow
```
1. Student browses courses
2. Clicks "Enroll" button
3. Frontend sends POST to /enrollments
4. Backend creates enrollment record
5. Course enrollment count incremented
6. Student redirected to course content
```

### Quiz Submission Flow
```
1. Student takes quiz
2. Submits answers with timestamps
3. Backend calculates score
4. Results stored in QuizResponse
5. Frontend displays results
6. Progress updated in enrollment
```

## State Management

Frontend uses:
- Local component state with `useState`
- Props drilling for data passing
- Axios for API calls
- localStorage for token persistence

## API Communication

- **Base URL**: `process.env.REACT_APP_API_URL`
- **Headers**: Include `Authorization: Bearer <token>`
- **Error Handling**: Try-catch blocks with user feedback
- **Loading States**: Implemented on async operations

## Security Measures

### Backend
- JWT token authentication
- Password hashing with bcryptjs
- Role-based access control
- Input validation with express-validator
- CORS enabled

### Frontend
- Token stored in localStorage
- Protected routes with authentication checks
- XSS prevention through React
- HTTPS recommended for production

## Database Relationships

```
User (1) -----> (Many) Course
      |
      ├---> (Many) Enrollment
      |
      └---> (Many) Quiz

Course (1) -----> (Many) Enrollment
       |
       ├---> (Many) Quiz
       |
       └---> (Many) Module

Module (1) -----> (Many) Lesson

Quiz (1) -----> (Many) QuizResponse

Enrollment (1) -----> (Many) LessonCompletion
```

## Technology Decisions

- **Express.js**: Lightweight and flexible backend framework
- **MongoDB**: NoSQL for flexible schema
- **React**: Component-based UI development
- **Tailwind CSS**: Utility-first styling approach
- **JWT**: Stateless authentication
- **Google Generative AI**: Latest AI capabilities

## Performance Considerations

- Database indexing on frequently queried fields
- Pagination for large datasets
- API response caching opportunities
- Image optimization with Cloudinary
- Lazy loading for components

## Scalability

- Microservices ready architecture
- Separate frontend and backend
- Database scaling with MongoDB Atlas
- CDN for static assets
- Load balancing ready
