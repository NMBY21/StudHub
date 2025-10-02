import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import CourseDetail from './pages/CourseDetail';
import QuizPage from './pages/QuizPage';
import MyResults from './pages/MyResults';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          {/* Student Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Teacher Dashboard */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute role="teacher">
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          {/* Course and Quiz */}
          <Route path="/courses/:id" element={<CourseDetail/>} />
          <Route path="/quiz/:id" element={<QuizPage/>} />

          {/* Student Results */}
          <Route
            path="/myresults"
            element={
              <ProtectedRoute role="student">
                <MyResults />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
