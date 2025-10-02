import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function QuizPage() {
  const { id } = useParams(); // quiz ID or course ID
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all quizzes for the course
    API.get(`/quizzes/${id}`)
      .then((res) => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (quizId, value) => {
    setAnswers({ ...answers, [quizId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let totalScore = 0;
      quizzes.forEach((q) => {
        if (answers[q.id] === q.answer) totalScore += 1;
      });

      // Save result in backend
      await API.post("/results", { quizId: quizzes[0]?.id, score: totalScore });

      alert(`Quiz submitted! Your score: ${totalScore}/${quizzes.length}`);
      navigate("/myresults");
    } catch (err) {
      alert("Failed to submit results");
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!quizzes.length) return <p>No quizzes found for this course.</p>;

  return (
    <div>
      <h2>Quiz</h2>
      <form onSubmit={handleSubmit}>
        {quizzes.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: 20 }}>
            <p>
              {idx + 1}. {q.question}
            </p>
            {q.options.map((opt, i) => (
              <label key={i} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`quiz-${q.id}`}
                  value={opt}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                  required
                />{" "}
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
}
