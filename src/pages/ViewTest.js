import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../api/modules/api';

const ViewTest = () => {
  const [quizDetails, setQuizDetails] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const params = useParams();

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/quiz-details/${params.id}`);
        const data = await response.json();
        setQuizDetails(data.questionsDetails);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizDetails();
  }, [params.id]);

  const handleNext = () => {
    setCurrentQuestion((prevQuestion) => Math.min(prevQuestion + 1, quizDetails.length - 1));
  };

  const handlePrev = () => {
    setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
  };
  console.log(quizDetails[currentQuestion]?.userSelectedOption)
  
  return (
    <div className="container-fluid py-4">
      <main>
        <div className="container-qtn">
          <h1 className="quiz-title">Quiz Title</h1>
          {quizDetails.length > 0 && (
            <section className="question-section">
              <div className="question">
                <h2 className="question-num">{`Question ${currentQuestion + 1}`}</h2>
                <p style={{ fontWeight: "600", color: "black" }} className="question-text">
                  {quizDetails[currentQuestion].question}
                </p>
                <div className="answer">
                {quizDetails[currentQuestion].options.map((option, optionIndex) => (
                  <label
                      key={optionIndex}
                      className={`answer-item 
                        ${quizDetails[currentQuestion].correctOption === optionIndex ? 'correct-answer' : ''}
                        ${quizDetails[currentQuestion].userSelectedOption === optionIndex.toString() ? 'user-selected' : ''}
                        ${quizDetails[currentQuestion].correctOption === optionIndex && quizDetails[currentQuestion].userSelectedOption === optionIndex.toString() ? 'correct-and-user-selected' : ''}
                      `}
                    >
    <input
      type="radio"
      name={`option_${currentQuestion}`}
    />
    <span style={{ fontWeight: "500", color: "black" }}>{option}</span>
  </label>
))}
                </div>
              </div>
            </section>
          )}
          <div className="action">
            <button
              style={{ marginRight: "15px" }}
              className="btn btn bg-gradient-dark mb-0"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            <button
              className="btn btn bg-gradient-dark mb-0"
              onClick={handleNext}
              disabled={currentQuestion === quizDetails.length - 1}
            >
              Next
            </button>
          </div>
          <section className="questions-nav-section">
            <p className="question-context">
              <a href="#">
                <span className="question-num">{`Question ${currentQuestion + 1}/${quizDetails.length}`}</span>
              </a>
              <a href="#">
                <span className="question-help">Need Help?</span>
              </a>
            </p>
            <div style={{ flexDirection: "column" }} className="d-flex">
              <ul className="question-nums-list">
                {quizDetails.map((_, index) => (
                  <li key={index}>
                    <a className={index === currentQuestion ? 'active' : index < currentQuestion ? 'done' : ''} href="#">
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ViewTest;
