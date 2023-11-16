import React, { useEffect, useState } from 'react';
import images from '../../images';
import { useDeleteQuestionMutation, useEditQuestionMutation, useGetAllQuestionsQuery } from '../../api/modules/quiz.Module';
import QuestionTextWithToggle from '../../components/QuestionToggle';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api/modules/api';
import toast from 'react-hot-toast';

const Questions = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const handleEditQuestion = async (questionId, updatedQuestionData) => {
    try {
      navigate(`/question-create/${questionId}`);
    } catch (error) {
      console.error('Error editing question', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await fetch(`${BASE_URL}/delete-question/${questionId}`, {
        method: 'DELETE',
      });
      toast.success("Deleted question")
      refetch()
    } catch (error) {
      console.error('Error deleting question', error);
    }
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  const { data, refetch } = useGetAllQuestionsQuery();
  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Questions</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - Questions</h6>

                      </div>
                      <div style={{ justifyContent: "right" }} className="col-6 d-flex align-items-center text-end">
                        <Link to='/question-create'>  <button style={{ padding: "5px" }} className="btn btn-xs bg-gradient-success btn-lg w-100 mt-4 mb-0">Create New</button></Link>

                      </div>
                    </div>
                  </div>
                  <table className="table align-items-center mb-0 mt-3">
                    <thead style={{ marginLeft: "50px" }}>
                      <tr>
                        <th style={{ marginLeft: "50px" }} className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Category</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">SubCategory</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Questions</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Options</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Actions</th>

                      </tr>
                    </thead>
                    <tbody style={{ marginLeft: "50px" }}>
                      {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px", textAlign: "center" }}>
                          <span className="loader"></span>
                        </div>
                      ) : (
                        data && data?.length > 0 ? (
                          data?.map((item, index) => (
                            <tr key={item.id}>
                              <td style={{ marginLeft: "50px" }}>{item?.category}</td>
                              <td>{item?.subCategory}</td>
                              <QuestionTextWithToggle text={item?.questionText} maxLength={100} />
                              <td>{item?.options.join(', ')}</td>
                              <td>
                                <button onClick={() => handleEditQuestion(item?._id,)}>
                                  Edit
                                </button>
                                <button onClick={() => handleDeleteQuestion(item?._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">
                              <img style={{ width: "200px", height: "230px" }} src={images.empty} alt="Empty" />
                              <p>No data found</p>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
