import React from 'react';
import useGoogleDrive from '../components/GDriveFolder';

const StudyPlan = () => {
  const driveItems = useGoogleDrive('1jr8saZEViNSg2tVPA9h8jywU_4CgEfnG');

  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };
console.log(driveItems)
  return (
    <div style={{minHeight:"90vh"}} className="container-fluid py-4">
    <div className="row">
      <div className="col-12">
        <div className="row"></div>
        <div className="card my-4">
          <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
            <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
              <h6 className="text-white text-capitalize ps-3">PSC SCRT Study Plan</h6>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive p-0">
              <div className="card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Home - SCRT Study Plan</h6>
                    </div>
                  </div>
                </div>
                <div style={{marginLeft:"30px"}} className="accordion" id="accordion">
            {driveItems.map((folder, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`heading-${index}`}>
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
                    {folder.name}
                  </button>
                </h2>
                <div  id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordion">
                  <div className="accordion-body">
                    {folder.files.map((file, idx) => (
                      <div key={idx}>
                        <button onClick={() => openPDF(file.webContentLink)}>
                          {file.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default StudyPlan;
