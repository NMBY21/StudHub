import React, { useEffect, useState } from "react";
import API from "../api";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");
  const [quizOptions, setQuizOptions] = useState(["", "", "", ""]);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  // Create new course
  const createCourse = async (e) => {
    e.preventDefault();
    try {
      await API.post("/courses", {
        title: newCourseTitle,
        description: newCourseDesc,
      });
      alert("Course created!");
      setNewCourseTitle("");
      setNewCourseDesc("");
      fetchCourses();
    } catch (err) {
      alert("Failed to create course");
    }
  };

  // Create new quiz
  const createQuiz = async (e) => {
    e.preventDefault();
    if (!selectedCourse) return alert("Select a course first");
    try {
      await API.post("/quizzes", {
        courseId: selectedCourse,
        question: quizQuestion,
        options: quizOptions,
        answer: quizAnswer,
      });
      alert("Quiz created!");
      setQuizQuestion("");
      setQuizOptions(["", "", "", ""]);
      setQuizAnswer("");
    } catch {
      alert("Failed to create quiz");
    }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      <h3>Create Course</h3>
      <form onSubmit={createCourse}>
        <input
          placeholder="Course Title"
          value={newCourseTitle}
          onChange={(e) => setNewCourseTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Course Description"
          value={newCourseDesc}
          onChange={(e) => setNewCourseDesc(e.target.value)}
          required
        />
        <button type="submit">Create Course</button>
      </form>

      <h3>Create Quiz</h3>
      <form onSubmit={createQuiz}>
        <label>Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          required
        >
          <option value="">-- Select --</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          placeholder="Question"
          value={quizQuestion}
          onChange={(e) => setQuizQuestion(e.target.value)}
          required
        />

        {quizOptions.map((opt, idx) => (
          <input
            key={idx}
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => {
              const newOpts = [...quizOptions];
              newOpts[idx] = e.target.value;
              setQuizOptions(newOpts);
            }}
            required
          />
        ))}

        <input
          placeholder="Correct Answer"
          value={quizAnswer}
          onChange={(e) => setQuizAnswer(e.target.value)}
          required
        />

        <button type="submit">Create Quiz</button>
      </form>

      <h3>Your Courses</h3>
      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <ul>
          {courses.map((c) => (
            <li key={c.id}>
              {c.title} - {c.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
