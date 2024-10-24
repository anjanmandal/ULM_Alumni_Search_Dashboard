
The Alumni Management Platform is a full-stack web application designed to manage and interact with an alumni database. It provides users with a platform to search for alumni, engage in conversations through a chat feature, organize and attend events, post job opportunities, and manage profiles. The platform includes user authentication and authorization with role-based access for administrators, alumni, and regular users.

Features
User Authentication
Secure login and registration using JWT (JSON Web Tokens) with cookie-based authentication.
User roles include admin, alumni, and regular users, each with specific permissions.
Alumni Management
Create, update, and search alumni profiles.
Alumni-specific data such as graduation year, degree, and occupation.
Chat System
Real-time chat functionality using Socket.io.
Supports one-on-one messaging with notifications for new messages.
Events & Jobs
Administrators can add events and job postings.
Users can view and search for events and job opportunities.
Dark Mode Toggle
Dark and light theme support for better user experience.
Responsive Design
Fully responsive layout that adapts to different screen sizes including mobile, tablet, and desktop.
Tech Stack & Tools
Frontend
React.js - JavaScript library for building the user interface.
Material-UI - React component library for faster and easier web development.
React Router - For navigation and routing.
Axios - For HTTP requests.
Backend
Node.js - JavaScript runtime environment.
Express.js - Fast, unopinionated, minimalist web framework for Node.js.
MongoDB - NoSQL database for storing user data, messages, events, and job postings.
Mongoose - ODM (Object Data Modeling) library for MongoDB.
Socket.io - For real-time, bi-directional communication between web clients and servers.
Other Tools
JWT - For user authentication.
dotenv - For environment variable management.
Multer - Middleware for handling file uploads.
Dependencies
Here's a comprehensive list of the major dependencies used in the project:

Backend Dependencies
express: ^4.17.1
mongoose: ^5.12.0
bcryptjs: ^2.4.3
cookie-parser: ^1.4.5
cors: ^2.8.5
dotenv: ^8.2.0
jsonwebtoken: ^8.5.1
socket.io: ^4.0.1
multer: ^1.4.2
Frontend Dependencies
react: ^17.0.2
react-dom: ^17.0.2
react-router-dom: ^5.2.0
@mui/material: ^5.0.0
@emotion/react: ^11.4.0
@emotion/styled: ^11.3.0
axios: ^0.21.1
socket.io-client: ^4.0.1
Installation
Prerequisites
Make sure you have the following installed:

Node.js (v14.x or later)
npm (v6.x or later) or Yarn (v1.x or later)
MongoDB (local instance or cloud)
Backend Setup
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/alumni-management-platform.git
Navigate into the backend directory:
bash
Copy code
cd alumni-management-platform/backend
Install dependencies:
bash
Copy code
npm install
Set up the .env file: Create a .env file in the root of the backend directory and configure the following environment variables:
bash
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:
bash
Copy code
npm run start
Frontend Setup
Navigate to the frontend directory:
bash
Copy code
cd alumni-management-platform/frontend
Install dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
npm start
Running the Application
The backend server runs on http://localhost:5000, while the frontend server runs on http://localhost:5173.

Usage
Sign up or Log in to access the platform.
Create Alumni Profiles (admin feature) to manage and search alumni.
Chat with alumni or other users using the chat feature.
Add and View Events and Job Postings.
Toggle between dark and light modes using the theme toggle.
Project Structure
Here's an overview of the project's folder structure:

bash
Copy code
alumni-management-platform/
├── backend/
│   ├── Controllers/       # API controllers
│   ├── Database/          # Database connection files
│   ├── Middleware/        # Middleware for authentication and authorization
│   ├── Models/            # Mongoose schemas
│   ├── Routes/            # Express routes
│   ├── uploads/           # User-uploaded profile pictures
│   ├── server.js          # Main server file
│   └── .env               # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── layout/        # Layout components like NavBar, SideDrawer
│   │   ├── Pages/         # Different pages (AlumniPage, ChatPage, etc.)
│   │   ├── App.js         # Main app file
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── README.md              # Project documentation
API Documentation
Authentication
POST /api/auth/signup - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
User & Alumni Management
GET /api/user/profile - Fetch logged-in user's profile
PUT /api/user/profile - Update user profile
GET /api/alumni - Fetch all alumni profiles
POST /api/alumni - Create a new alumni profile (admin only)
Chat System
POST /api/chat/start-conversation - Start a new chat
GET /api/chat/messages/:conversationId - Get messages for a conversation
Events & Jobs
GET /api/events - Fetch all events
POST /api/events - Create a new event (admin only)
GET /api/jobs - Fetch all job postings
POST /api/jobs - Create a new job posting (admin only)
Screenshots
Include screenshots of the main features of your website here, such as:

Home Page
Alumni Directory
Chat Interface
Event & Job Posting
Profile Page
Contributing
If you want to contribute:

Fork the project.
Create your feature branch: git checkout -b feature/my-feature.
Commit your changes: git commit -m 'Add some feature'.
Push to the branch: git push origin feature/my-feature.
Open a pull request.
