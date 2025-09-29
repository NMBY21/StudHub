import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    API.get('/courses').then(r => { setCourses(r.data); setLoading(false); }).catch(()=> setLoading(false));
  },[]);

  return (
    <div>
      <div className="header"><h2>Dashboard</h2></div>
      <p>Browse courses below. Teachers can create courses via API or you can extend the UI later to include a course creation page.</p>
      {loading ? <div>Loading courses...</div> : (
        <div>
          {courses.length === 0 && <div>No courses yet.</div>}
          {courses.map(c => (
            <div className="course-card" key={c._id}>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <div>Teacher: {c.teacher?.name || 'Unknown'}</div>
              <Link to={`/courses/${c._id}`}>Open Course</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
