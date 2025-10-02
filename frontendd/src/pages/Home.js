import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>StudyHub</h1>
      <p>Quality education for everyone — aligned with SDG 4.</p>
      <p>
        <Link to="/dashboard">Go to Dashboard</Link> or <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
