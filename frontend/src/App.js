import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import QuizPage from './pages/QuizPage';
import MyResults from './pages/MyResults';

function Nav() {
  const token = localStorage.getItem('token');
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location = '/'; };
  return (
    <div style={{padding:12, borderBottom:'1px solid #eee', marginBottom:12}}>
      <Link to="/" style={{marginRight:12}}>StudyHub</Link>
      <Link to="/dashboard" style={{marginRight:12}}>Dashboard</Link>
      {token ? (
        <>
          <Link to="/myresults" style={{marginRight:12}}>My Results</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{marginRight:12}}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Nav />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/courses/:id" element={<CourseDetail/>} />
          <Route path="/quiz/:id" element={<QuizPage/>} />
          <Route path="/myresults" element={<MyResults/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
