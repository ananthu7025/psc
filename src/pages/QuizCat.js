import React, { useState, useEffect } from 'react';
import { useGetQuizQuestionsQuery } from '../api/modules/quiz.Module';
import MockTest from './MockTest';

function QuizCat() {
  const [selectedCategory, setSelectedCategory] = useState('Science');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Physics');
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: quizQuestions, error: fetchError, isLoading: fetchIsLoading, refetch } = useGetQuizQuestionsQuery({
    category: selectedCategory,
    subCategory: selectedSubCategory,
  });

  useEffect(() => {
    if (quizQuestions) {
      setFetchedQuestions(quizQuestions);
    }
  }, []);

  useEffect(() => {
    setIsLoading(fetchIsLoading);
  }, [fetchIsLoading]);

  useEffect(() => {
    setError(fetchError);
  }, [fetchError]);

  const handleStartQuiz = () => {
    refetch();
    setFetchedQuestions(quizQuestions)
  };
 

  return (
   fetchedQuestions && !fetchedQuestions?.length > 0 ? (
      <main className="main-content mt-0">
        <section>
          <div className="page-header min-vh-90">
            <div className="container">
              <div className="row">
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage: 'url("../assets/img/create kerala t 0.png")',
                      backgroundSize: 'cover'
                    }}
                  ></div>
                </div>
                <div style={{ background: 'white' }} className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div className="card card-plain">
                    <div className="card-header">
                      <h4 className="font-weight-bolder">Mock Test</h4>
                      <p className="mb-0">
                      </p>
                    </div>
                    <div style={{ padding: "0.5rem" }} className="card-body">
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ marginRight: '10px' }}>Select Category:</label>
                        <select
                          style={{ padding: '5px', fontSize: '16px' }}
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="Science">Science</option>
                          <option value="History">History</option>
                          <option value="Geography">Geography</option>
                        </select>
                      </div>
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ marginRight: '10px' }}>Select Subcategory:</label>
                        <select
                          style={{ padding: '5px', fontSize: '16px' }}
                          value={selectedSubCategory}
                          onChange={(e) => setSelectedSubCategory(e.target.value)}
                        >
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                        </select>
                      </div>
                      <button style={{ marginLeft: "200px", marginTop: "50px" }} className="btn bg-gradient-success btn-block" onClick={handleStartQuiz}>
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    ) : <MockTest fetchedQuestions={fetchedQuestions} setFetchedQuestions={setFetchedQuestions} />
  );
}

export default QuizCat;
