import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, Link } from 'react-router-dom';

export default function CourseDetail(){
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(()=>{
    API.get(`/courses/${id}`).then(r => setCourse(r.data)).catch(()=>{});
    API.get(`/quizzes/course/${id}`).then(r => setQuizzes(r.data)).catch(()=>{});
  },[id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div><strong>Teacher:</strong> {course.teacher?.name}</div>

      <h3>Lessons</h3>
      {course.lessons?.length ? course.lessons.map((l,i)=>(
        <div key={i} style={{marginBottom:10}}>
          <h4>{l.title}</h4>
          <p>{l.content}</p>
          {l.resources?.length ? (<div>Resources: {l.resources.map((r,idx)=> <div key={idx}><a href={r} target="_blank" rel="noreferrer">{r}</a></div>)}</div>) : null}
        </div>
      )) : <div>No lessons yet.</div>}

      <h3>Quizzes</h3>
      {quizzes?.length ? quizzes.map(q=>(
        <div key={q._id}><strong>{q.title}</strong> — <Link to={`/quiz/${q._id}`}>Take Quiz</Link></div>
      )) : <div>No quizzes yet.</div>}
    </div>
  );
}
