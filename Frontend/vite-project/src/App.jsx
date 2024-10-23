import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout'; // Layout with header, footer, etc.
import AlumniPage from './Pages/AlumniPage';
import AddAlumniPage from './Pages/AddAlumniPage';
import SignupPage from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import ChatPage from './Pages/ChatPage';
import ConversationList from './Pages/ConversationList';
import AddEventForm from './Pages/AddEventForm';
import AddJobPostingForm from './Pages/AddJobPostingForm';
import JobsEventsPage from './Pages/JobsEventsPage'; 
import ProfilePage from './Pages/ProfilePage';
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import ProtectedRoute from './Pages/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes under Layout */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/add-alumni" element={<AddAlumniPage />} />
          <Route path="/chat/:conversationId" element={<ChatPage />} />
          <Route path="/conversations" element={<ConversationList />} />
          <Route path="/add-event" element={<AddEventForm />} />
          <Route path="/add-job" element={<AddJobPostingForm />} />
          <Route path="/jobs-events" element={<JobsEventsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>

        {/* Redirect to login if no route matches */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
