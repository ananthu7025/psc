import React, { useEffect, useState } from 'react';
import useGoogleDrive from '../components/GDriveFolder';
import images from '../images';

const StudyPlan = () => {
  const driveItems = useGoogleDrive('1jr8saZEViNSg2tVPA9h8jywU_4CgEfnG');

  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        setTimeout(() => setLoading(false), 5000); // Simulate 3 seconds delay
  }, []);

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
                  {loading ? (
                    <div style={{display:"flex",justifyContent:"center",marginLeft:"30px",marginBottom:"100px"}}>
             <span class="loader"></span>
             </div>

      ) : (
                  <div style={{marginLeft:"30px"}} className="accordion" id="accordion">
                  {driveItems.length > 0 ? (
      driveItems.map((folder, index) => (
        <div className="accordion-item" key={index}>
        <div style={{justifyContent:"space-between"}} className='d-flex'>
  
        <h2 className="accordion-header" id={`heading-${index}`}>
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
            {folder.name}
          </button>
        </h2>
        <img data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`} style={{width:"40px",height:"25px",marginRight:"30px"}} src={images.down}/>
        </div>
        <div  id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordion">
          <div className="accordion-body">
         
            {folder.files.map((file, idx) => (
              <div key={idx}>
                <ul >
                  <li onClick={() => openPDF(file.webContentLink)}>{file.name}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
            ))
          ) : (
            <tr style={{display:"flex",justifyContent:"center"}}>
            <td colSpan="3" className="text-center">
              <img style={{width:"200px",height:"230px"}} src={images.empty} alt="Empty" />
              <p>No data found</p>
            </td>
          </tr>
          )}
             
            </div>
      )}

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
