# 🚀 FestFlow Authentication Setup Guide

## ✨ What We've Implemented

Your FestFlow project now has a complete authentication system with:

- **User Registration & Login** - Secure signup and signin
- **JWT Authentication** - Token-based security
- **Protected Routes** - Secure access to certain features
- **Modern UI** - Beautiful, responsive design
- **State Management** - Global auth context

## 🛠️ Backend Setup

### 1. Environment Variables
Create a `.env` file in the `server/` directory:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
PORT=5000
```

### 2. Install Dependencies
```bash
cd server
npm install
```

### 3. Start Server
```bash
npm run dev
```

## 🎨 Frontend Setup

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Start Client
```bash
npm start
```

## 🔐 How It Works

### Authentication Flow:
1. **Signup**: User creates account → Password hashed → JWT token generated
2. **Login**: User signs in → Credentials verified → JWT token generated
3. **Protected Routes**: Check JWT token → Allow/deny access
4. **Logout**: Remove token → Clear user state

### Security Features:
- ✅ Password hashing with bcrypt
- ✅ JWT token expiration (24 hours)
- ✅ Secure token storage
- ✅ Protected API endpoints
- ✅ Input validation

## 🎯 Features

### Public Routes:
- Home page (`/`)
- About page (`/about`)
- Event details (`/event/:id`)
- Login (`/login`)
- Signup (`/signup`)

### Protected Routes:
- Add Event (`/add-event`)
- View Registrations (`/events/:id/registrations`)

### User Experience:
- Welcome message with user's name
- Login/Signup buttons when not authenticated
- Logout button when authenticated
- Smooth navigation between auth states

## 🚨 Important Notes

1. **JWT Secret**: Change the default JWT secret in production
2. **MongoDB**: Ensure your MongoDB connection is secure
3. **HTTPS**: Use HTTPS in production for secure token transmission
4. **Token Storage**: Tokens are stored in localStorage (consider httpOnly cookies for production)

## 🧪 Testing

1. Start both server and client
2. Navigate to `/signup` to create an account
3. Try accessing `/add-event` (should redirect to login if not authenticated)
4. Login and verify protected routes are accessible
5. Test logout functionality

## 🔧 Customization

- **Styling**: Modify CSS files in `client/src/components/`
- **Validation**: Add more validation rules in auth components
- **Fields**: Add more user fields in the User model
- **Routes**: Protect additional routes using `<ProtectedRoute>`

## 🆘 Troubleshooting

- **CORS Issues**: Check server CORS configuration
- **MongoDB Connection**: Verify connection string and network access
- **JWT Errors**: Ensure JWT_SECRET is set correctly
- **Component Errors**: Check browser console for React errors

---

🎉 **Your FestFlow app now has enterprise-grade authentication!** 🎉
