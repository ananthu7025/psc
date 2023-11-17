import React, { useEffect, useState } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';

const StudyPlan = () => {
  const [studyData, setStudyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDay, setCurrentDay] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/drive/items?folderId=1jr8saZEViNSg2tVPA9h8jywU_4CgEfnG`);
        const data = await response.json();
        setStudyData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };

  const handleDayClick = (day) => {
    setCurrentDay(day);
  };

  return (
    <div style={{ minHeight: '90vh' }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">PSC SCRT Study Plan</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '30px', marginBottom: '100px' }}>
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <div className="accordion" id="accordion">
                      {studyData && studyData?.slice()?.reverse()?.map((subject, subjectIndex) => (
                        <div className="accordion-item" key={subjectIndex}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '30px' }}>
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                onClick={() => handleDayClick(null)}
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse-${subjectIndex}`}
                                aria-expanded="true"
                                aria-controls={`collapse-${subjectIndex}`}
                              >
                                {subject?.name}
                              </button>
                            </h2>
                            <img
                              onClick={() => handleDayClick(null)}
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${subjectIndex}`}
                              aria-expanded="true"
                              aria-controls={`collapse-${subjectIndex}`}
                              style={{ width: '40px', height: '25px', marginRight: '30px' }}
                              src={images.down}
                              alt="down-arrow"
                            />
                          </div>
                          <div
                            id={`collapse-${subjectIndex}`}
                            className="accordion-collapse collapse "
                            aria-labelledby={`heading-${subjectIndex}`}
                            data-bs-parent="#accordion"
                          >
                            <div className="accordion-body">
                              {subject?.subfolders
                                .sort((a, b) => {
                                  const dayA = parseInt(a?.name?.match(/\d+/));
                                  const dayB = parseInt(b?.name?.match(/\d+/));
                                  return dayA - dayB;
                                })
                                .map((day, dayIndex) => (
                                  <div key={dayIndex}>
                                    <h5 style={{ marginLeft: '70px' }}>{day.name}</h5>
                                    {day?.files?.map((file, fileIndex) => (
                                      <div key={fileIndex}>
                                        <ul style={{ marginLeft: '90px' }}>
                                          <li onClick={() => openPDF(file?.webContentLink)}>{file.name}</li>
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                ))}
                            </div>

                          </div>
                        </div>
                      ))}
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
