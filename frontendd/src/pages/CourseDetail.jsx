import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    API.get(`/courses/${id}`)
      .then(res => { setCourse(res.data); setLoading(false); })
      .catch(()=> setLoading(false));
  }, [id]);

  if (loading) return <p>Loading course...</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <h3>Quizzes</h3>
      {course.quizzes && course.quizzes.length > 0 ? (
        course.quizzes.map(q => (
          <div key={q.id}>
            <h4>{q.title}</h4>
            <Link to={`/quiz/${q.id}`}>Take Quiz</Link>
          </div>
        ))
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}
