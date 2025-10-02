import React, { useEffect, useState } from 'react';
import API from '../api';

export default function MyResults(){
  const [results, setResults] = useState([]);
  useEffect(()=>{
    API.get('/results/me').then(r => setResults(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h2>My Results</h2>
      {results.length === 0 && <div>No results yet.</div>}
      {results.map(r => (
        <div key={r._id} style={{border:'1px solid #eee', padding:10, marginBottom:8}}>
          <div><strong>Course:</strong> {r.course?.title || 'Unknown'}</div>
          <div><strong>Quiz:</strong> {r.quiz?.title || 'Unknown'}</div>
          <div><strong>Score:</strong> {r.score} / {r.total}</div>
          <div><small>Taken: {new Date(r.takenAt).toLocaleString()}</small></div>
        </div>
      ))}
    </div>
  );
}
