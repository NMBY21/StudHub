import React, { useEffect, useState } from "react";
import API from "../api";

export default function MyResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/results")
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading results...</p>;
  if (!results.length) return <p>No results yet.</p>;

  return (
    <div>
      <h2>My Results</h2>
      <table border="1" cellPadding={8}>
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td>{r.quizId}</td>
              <td>{r.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
