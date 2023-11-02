import React from 'react';

const QuizResultModal = ({ result, closeModal, setFetchedQuestions,lenth }) => {
    const handleClose = () => {
        closeModal()
        setFetchedQuestions([])
    }
    return (

        <div id="demo-modal" class="modal">
            <div class="modal__content">
                <div class="container d-flex justify-content-center">

                    <div class=" p-1">
                        <div className='d-flex' style={{justifyContent:"space-between"}}>
                        <h5 class="mt-3 mb-3">Performance score</h5>
                <a onClick={handleClose} href="#" class="modal__close">&times;</a>

                        </div>
                      
                        <div class="border p-2 rounded d-flex flex-row align-items-center">

                            <div class="p-1 px-4 d-flex flex-column align-items-center score rounded">
                                <span class="d-block char text-success">A</span>
                                <span class="text-success">{result}</span>
                            </div>


                            <div class="ml-2 p-3">
                                <h6 class="heading1">Test Score</h6>
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
