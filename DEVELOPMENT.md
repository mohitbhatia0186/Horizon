# Development Guide - Project Horizon

## Getting Started

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/Horizon.git
cd Horizon

# Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev

# Setup Frontend (in new terminal)
cd frontend
npm install
cp .env.example .env
# Update REACT_APP_API_URL in .env
npm start
```

## Development Workflow

### Adding a New Feature

1. **Create a new branch**
   ```bash
   git checkout -b feature/feature-name
   ```

2. **Backend**
   - Add model if needed in `backend/models/`
   - Create route file in `backend/routes/`
   - Add middleware in `backend/middleware/`
   - Update `backend/server.js` to register route

3. **Frontend**
   - Create component in `frontend/src/components/`
   - Create page in `frontend/src/pages/`
   - Update routing in `frontend/src/App.js`
   - Style with Tailwind CSS

4. **Test**
   ```bash
   # Backend
   npm test
   
   # Frontend
   npm test
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Add feature: description"
   git push origin feature/feature-name
   ```

6. **Create Pull Request**

## Code Style Guidelines

### JavaScript

```javascript
// Use const by default
const variable = value;

// Use arrow functions
const handleClick = () => {
  // code
};

// Use destructuring
const { firstName, lastName } = user;

// Use template literals
const message = `Hello, ${user.name}`;

// Use async/await
const fetchData = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
```

### React Components

```javascript
// Functional components with hooks
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effect
  }, [dependency]);
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

export default MyComponent;
```

### Naming Conventions

- **Components**: PascalCase (MyComponent.js)
- **Hooks**: camelCase starting with 'use' (useCustomHook.js)
- **Variables**: camelCase (myVariable)
- **Constants**: UPPER_SNAKE_CASE (API_URL)
- **Classes**: PascalCase (MyClass.js)
- **CSS Classes**: kebab-case (my-class)

## Common Tasks

### Adding a New API Endpoint

1. **Create route handler**
   ```javascript
   // backend/routes/feature.js
   router.get('/endpoint', auth, async (req, res) => {
     try {
       // Logic
       res.json({ success: true, data });
     } catch (error) {
       res.status(500).json({ success: false, message: error.message });
     }
   });
   ```

2. **Register route**
   ```javascript
   // backend/server.js
   app.use('/api/feature', require('./routes/feature'));
   ```

3. **Use in frontend**
   ```javascript
   const response = await axios.get('/api/feature/endpoint', {
     headers: { Authorization: `Bearer ${token}` }
   });
   ```

### Adding a New Database Model

1. **Create model file**
   ```javascript
   // backend/models/NewModel.js
   const schema = new mongoose.Schema({
     // Fields
   });
   
   module.exports = mongoose.model('NewModel', schema);
   ```

2. **Create CRUD routes**
   ```javascript
   // backend/routes/newmodel.js
   router.get('/', async (req, res) => { /* Get all */ });
   router.get('/:id', async (req, res) => { /* Get one */ });
   router.post('/', auth, async (req, res) => { /* Create */ });
   router.put('/:id', auth, async (req, res) => { /* Update */ });
   router.delete('/:id', auth, async (req, res) => { /* Delete */ });
   ```

### Adding a New React Page

1. **Create page component**
   ```javascript
   // frontend/src/pages/NewPage.js
   import React from 'react';
   
   const NewPage = () => {
     return <div>New Page Content</div>;
   };
   
   export default NewPage;
   ```

2. **Add route**
   ```javascript
   // frontend/src/App.js
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Update navigation**
   ```javascript
   // Add link in Navbar or Sidebar
   <Link to="/new-page">New Page</Link>
   ```

## Debugging Tips

### Backend

```javascript
// Use console.log with labels
console.log('DEBUG - Variable:', variableName);

// Use try-catch for error handling
try {
  // code
} catch (error) {
  console.error('Error:', error.message);
}

// Use Morgan for request logging
const morgan = require('morgan');
app.use(morgan('dev'));
```

### Frontend

```javascript
// Browser DevTools
// - Console tab for errors
// - Network tab for API calls
// - React DevTools extension

// Debug state
console.log('State:', state);

// Debug API calls
axios.interceptors.response.use(
  response => console.log('Response:', response),
  error => console.error('Error:', error)
);
```

## Testing

### Backend Tests

```bash
# Setup
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Tests

```bash
# Setup
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## Performance Optimization

### Backend
- Use indexing on frequently queried fields
- Implement caching for expensive operations
- Use pagination for large datasets
- Optimize database queries

### Frontend
- Code splitting with React.lazy()
- Memoization with React.memo()
- Use useCallback for functions
- Image optimization
- Bundle analysis

## Production Checklist

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Error logging setup
- [ ] Performance monitoring
- [ ] SSL certificate enabled
- [ ] Database indexes optimized
- [ ] CDN configured

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Solution: Check MONGODB_URI in .env
- Ensure connection string is correct
- Whitelist IP in MongoDB Atlas
- Check network connectivity
```

**CORS Error**
```
Solution: Configure CORS in server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

**Token Expiration**
```
Solution: Implement token refresh
- Set shorter expiry time
- Implement refresh token mechanism
- Auto-logout on expiry
```

**API Not Found**
```
Solution: Check route registration
- Verify route path in server.js
- Check middleware order
- Test with Postman/Insomnia
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [JWT Documentation](https://jwt.io/)

## Getting Help

- Check existing issues on GitHub
- Create a new issue with detailed information
- Ask in discussions
- Contact maintainers

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Follow code style guidelines
4. Add tests if applicable
5. Submit a pull request

---

Happy coding! 🚀
