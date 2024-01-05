import React, { useEffect, useState } from 'react';
import QuizResultModal from '../components/Modal';
import { useGetUserDetailsQuery } from '../api/modules/login';
import toast from 'react-hot-toast';
import { BASE_URL } from '../api/modules/api';

const MockTest = ({ fetchedQuestions, setFetchedQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(fetchedQuestions?.length).fill(null));
  const [Sindex, SetSindex] = useState()
  const [showModal, setShowModal] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const { data: user } = useGetUserDetailsQuery();
  const goToNextQuestion = () => {
    if (currentQuestionIndex < fetchedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      SetSindex("")

    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      SetSindex("")
    }
  };

  const handleAnswerSelection = (selectedOption) => {
    const selectedOptionIndex = fetchedQuestions[currentQuestionIndex].options.indexOf(selectedOption);
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOptionIndex;
    SetSindex(selectedOptionIndex)
    setUserAnswers(updatedAnswers);
  };
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'Your questions will be submitted.';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const submitQuizAnswers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userID: user?._id,
          answers: userAnswers.map((selectedOption, index) => ({
            questionID: fetchedQuestions[index]?._id,
            selectedOption: selectedOption,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Quiz Submitted")
        setQuizResult(data);
        setShowModal(true);
      } else {
        throw new Error('Failed to submit the quiz');

      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error("Failed to submit the quiz")
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [timeLeft, setTimeLeft] = useState(35 * 60);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const displayMinutes = String(minutes).padStart(2, '0');
    const displaySeconds = String(seconds).padStart(2, '0');
    return `${displayMinutes}:${displaySeconds}`;
  };

  const countDown = () => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft - 1);
    } else {
      submitQuizAnswers();
    }
  };

  useEffect(() => {
    const timer = setTimeout(countDown, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);


  return (
    <div className="container-fluid py-4">
      <main>
        <div className="container-qtn">
          {showModal && (
            <QuizResultModal result={quizResult?.score} setFetchedQuestions={setFetchedQuestions} closeModal={closeModal} lenth={fetchedQuestions?.length} />
          )}
          <h1 className="quiz-title">Quiz Title</h1>
          <section className="question-section">
            <div className="question">
              <h2 className="question-num">Question {currentQuestionIndex + 1}</h2>
              <p style={{ fontWeight: "600", color: "black" }} className="question-text">{fetchedQuestions[currentQuestionIndex]?.questionText}</p>
              <div className="answer">
                {fetchedQuestions[currentQuestionIndex]?.options?.map((option, optIndex) => (
                  <label key={optIndex}
                    className={`answer-item ${Sindex === optIndex ? 'answer-item-active' : ''}`}>
                    <input
                      type="radio"

                      name={`option_${currentQuestionIndex}`}
                      onChange={() => handleAnswerSelection(option)}
                    />
                    <span style={{ fontWeight: "500", color: "black" }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="action">
              <button style={{ marginRight: "15px" }} className="btn btn bg-gradient-dark mb-0" onClick={goToPreviousQuestion}>
                Prev
              </button>
              <button className="btn btn bg-gradient-dark mb-0" onClick={goToNextQuestion}>
                Next
              </button>
              {currentQuestionIndex === fetchedQuestions?.length - 1 && (
                <button style={{ marginLeft: "15px" }} className="btn btn bg-gradient-dark mb-0" onClick={submitQuizAnswers}>
                  Submit Quiz
                </button>
              )}
            </div>
          </section>
          <section className="questions-nav-section">
            <p className="question-context">
              <a href="#">
                <span className="question-num">Question {currentQuestionIndex + 1}/{fetchedQuestions && fetchedQuestions?.length}</span>
              </a>
              <h5>Time Left: {formatTime(timeLeft)}</h5>
            </p>
            <div style={{ flexDirection: "column" }} className="d-flex">
              <ul className="question-nums-list">
                {fetchedQuestions && fetchedQuestions?.map((_, i) => (
                  <li key={i}>
                    <a className={i === currentQuestionIndex ? "active" : "done"} href="#">
                      {i + 1}
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

export default MockTest;
