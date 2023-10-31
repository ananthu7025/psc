import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

function App() {
  const [quiz, setQuiz] = useState([
    {
      question: 'Who is the president of ASSOCHAM?',
      choices: ['Sandeep Jajodia', 'Debjani Ghosh', 'C.P. Gurnani', 'None of them'],
      answer: 1,
    },
    {
      question: 'Who was called ‘the father of Indian Cinema’?',
      choices: ['Harishchandrs', 'Dadasaheb Phalke', 'Satyajit Ray', 'Raj Kapoor'],
      answer: 2,
    },
    {
      question: 'Which river is called ‘the sorrow of China?',
      choices: ['The Hwang Ho', 'The Yang Tse Kiang', 'The Pearl River', 'None of the above'],
      answer: 1,
    },
    {
      question: 'Where was the first Indian Institute of Technology (IIT) established in the North-East India?',
      choices: ['Shillong', 'Imphal', 'Silchar', 'None of the above'],
      answer: 3,
    },
    {
      question: 'What is the full form of ‘BOD’?',
      choices: ['Bureau of Development', 'Board of Ophthalmic Diagnosis', 'Botanical Organisms Directory', 'Biological Demand'],
      answer: 4,
    },
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState(Array(quiz.length).fill(0));
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const heading = '10th Prilimes';

  // Function to handle radio button selection
  const handleOptionChange = (index, value) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = value;
    setSelectedAnswers(updatedAnswers);
  };

  // Function to handle the submission of the quiz
  const handleSubmit = () => {
    // Calculate the score by comparing selectedAnswers with the correct answers in quiz
    let score = 0;
    for (let i = 0; i < quiz.length; i++) {
      if (selectedAnswers[i] === quiz[i].answer) {
        score++;
      }
    }
    alert(`Quiz submitted! Your score: ${score} out of ${quiz.length}`);
    setIsTimerRunning(false); // Stop the timer
  };

  // Effect to update the timer
  useEffect(() => {
    let interval;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Auto-submit the quiz when the timer reaches 0
      handleSubmit();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  return (
    <>
      <Navbar />
      <main id="main">
        <section id="hero-slider" className="hero-slider">
          <div className="container-md content-center">
            <div id="app">
              <div className="v-icon v-icon" style={{ fontSize: '20px' }}></div>
              <div className="headline" style={{ fontFamily: 'SF UI Display', marginBottom: '30px' }}>
                {heading}
              </div>
              {quiz.map((item, index) => (
                <div key={index}>
                  <p className="body-1">
                    <strong>{index + 1}. </strong>
                    {item.question}
                  </p>
                  <div>
                    {item.choices.map((choice, val) => (
                      <div key={val}>
                        <label style={{ marginTop: "5px", marginBottom: "5px" }}>
                          <input
                            type="radio"
                            value={val + 1}
                            checked={selectedAnswers[index] === val + 1}
                            onChange={() => handleOptionChange(index, val + 1)}
                          />
                          <span className={selectedAnswers[index] === val + 1 ? 'font-weight-bold' : ''}>{choice}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <hr />
                </div>
              ))}
              <div>
                <p>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
                <button style={{color:"white",backgroundColor:"darkseagreen"}} className='btn' onClick={handleSubmit}>Submit Quiz</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
