import React from 'react';

const QuizResultModal = ({ result, closeModal, setFetchedQuestions,lenth }) => {
    const handleClose = () => {
        closeModal()
        setFetchedQuestions([])
    }
    return (

        <div id="demo-modal" className="modal">
            <div className="modal__content">
                <div className="container d-flex justify-content-center">

                    <div className=" p-1">
                        <div className='d-flex' style={{justifyContent:"space-between"}}>
                        <h5 className="mt-3 mb-3">Performance score</h5>
                <a onClick={handleClose} href="#" className="modal__close">&times;</a>

                        </div>
                      
                        <div className="border p-2 rounded d-flex flex-row align-items-center">

                            <div className="p-1 px-4 d-flex flex-column align-items-center score rounded">
                                <span className="d-block char text-success">A</span>
                                <span className="text-success">{result}</span>
                            </div>


                            <div className="ml-2 p-3">
                                <h6 className="heading1">Test Score</h6>
                                <span>Hi your mock test score is  is {result} / {lenth}</span>
                                
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>

    );
};

export default QuizResultModal;
