import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location = '/';
  };

  const token = localStorage.getItem('token');

  return (
    <div style={{padding:12, borderBottom:'1px solid #eee', marginBottom:12}}>
      <Link to="/" style={{marginRight:12}}>StudyHub</Link>

      {user?.role === "student" && <Link to="/dashboard" style={{marginRight:12}}>Dashboard</Link>}
      {user?.role === "teacher" && <Link to="/teacher" style={{marginRight:12}}>Teacher Dashboard</Link>}
      {user?.role === "student" && <Link to="/myresults" style={{marginRight:12}}>My Results</Link>}

      {token ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{marginRight:12}}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}
