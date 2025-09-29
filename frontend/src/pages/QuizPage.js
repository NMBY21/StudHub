import React, { useEffect, useState } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function QuizPage(){
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const nav = useNavigate();

  useEffect(()=> {
    API.get(`/quizzes/${id}`).then(r => setQuiz(r.data)).catch(()=>{});
  },[id]);

  if (!quiz) return <div>Loading...</div>;

  const setAnswer = (qIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const submit = async () => {
    let score = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) score++;
    });
    const total = quiz.questions.length;
    try {
      await API.post('/results', { course: quiz.course, quiz: quiz._id, score, total });
      alert(`You scored ${score} out of ${total}`);
      nav('/dashboard');
    } catch (err) {
      alert('Error saving result; please ensure you are logged in.');
    }
  };

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, i) => (
        <div key={i} style={{marginBottom:16}}>
          <p><strong>{i + 1}.</strong> {q.question}</p>
          {q.options.map((opt, idx) => (
            <div key={idx}>
              <label>
                <input
                  type="radio"
                  name={`q-${i}`}
                  checked={answers[i] === idx}
                  onChange={() => setAnswer(i, idx)}
                /> {opt}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={submit}>Submit Quiz</button>
    </div>
  );
}
