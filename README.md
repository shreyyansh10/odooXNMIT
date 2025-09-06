# Hackathon Authentication System

A complete, secure authentication system built with React and JWT for hackathon projects. This system provides login, signup, and protected routes with modern UI and robust security features.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with token expiration
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Form Validation**: Client-side and server-side validation
- **Protected Routes**: Route guards to protect authenticated pages
- **Password Security**: Strong password requirements and bcrypt hashing
- **Auto Token Refresh**: Automatic token refresh handling
- **Responsive Design**: Works perfectly on desktop and mobile
- **Accessibility**: WCAG compliant with keyboard navigation support

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- JWT Decode for token handling
- Modern CSS with gradients and animations

### Backend
- Node.js with Express
- JWT for token generation
- Bcrypt for password hashing
- Express Validator for input validation
- CORS enabled for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup

1. Navigate to the project root:
```bash
cd /Users/yugansh/Downloads/odoo\ /
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Edit `.env` file with your configuration:
```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

5. Start the backend server:
```bash
npm start
```

The backend will be available at `http://localhost:5000`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### Frontend API Configuration

The frontend is configured to connect to `http://localhost:5000/api` by default. You can change this by setting the `REACT_APP_API_URL` environment variable.

## 📱 Usage

### Authentication Flow

1. **Sign Up**: Users can create new accounts with email and password
2. **Login**: Existing users can sign in with their credentials
3. **Protected Routes**: Authenticated users can access the dashboard
4. **Logout**: Users can securely log out and clear their session

### API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/health` - Health check

### Example API Usage

```javascript
// Register a new user
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});

// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123'
  })
});
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication with expiration
- **Input Validation**: Both client and server-side validation
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Token Refresh**: Automatic token refresh to maintain sessions
- **Route Protection**: Protected routes that require authentication

## 🎨 UI Features

- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **Responsive Layout**: Works on all device sizes
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Loading indicators for better UX
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark Mode Ready**: CSS variables for easy theming

## 🚀 Integration Guide

### For Your Hackathon Project

1. **Copy the authentication components** to your project
2. **Update the API endpoints** to match your backend
3. **Customize the styling** to match your brand
4. **Add your business logic** to the dashboard component

### Key Files to Customize

- `src/components/Dashboard.js` - Add your main application content
- `src/services/authService.js` - Update API endpoints
- `src/components/Auth.css` - Customize the styling
- `backend/server.js` - Add your business logic endpoints

## 📁 Project Structure

```
hackathon-auth/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── Dashboard.js
│   │   ├── ProtectedRoute.js
│   │   ├── Auth.css
│   │   └── Dashboard.css
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── authService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── backend/
│   ├── server.js
│   ├── package.json
│   └── env.example
├── package.json
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running and CORS is configured
2. **Token Expired**: The system automatically handles token refresh
3. **Validation Errors**: Check that all required fields are filled correctly
4. **Port Conflicts**: Change the PORT in the backend .env file if needed

### Development Tips

- Use browser dev tools to inspect network requests
- Check the console for any JavaScript errors
- Verify that both frontend and backend are running
- Test with different browsers for compatibility

## 🔮 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] User roles and permissions
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] Rate limiting
- [ ] Logging and monitoring

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Happy Hacking! 🚀**

This authentication system is ready to be integrated into your hackathon project. The JWT tokens are properly configured, and the user context is available throughout your application.
