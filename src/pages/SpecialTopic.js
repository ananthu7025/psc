import React, { useEffect, useState } from 'react';
import images from '../images';

const SpecialTopic = () => {
  const [driveItems, setDriveItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3030/api/folder/files?folderId=174PLxquGWuddRVYF-TMlTqaUM-dr7ikV`);
        const data = await response.json(); // Parse the JSON response
        setDriveItems(data.subfolders); // Update this line
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };

  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">PSC Special Topic</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - Special Topic</h6>
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", marginLeft: "30px", marginBottom: "100px" }}>
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <div style={{ marginLeft: "30px" }} className="accordion" id="accordion">
                      {driveItems ? (
                        driveItems.map((subfolder, index) => (
                          <div className="accordion-item" key={index}>
                            <div style={{ justifyContent: "space-between" }} className='d-flex'>
                              <h2 className="accordion-header" id={`heading-${index}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
                                  {subfolder.folderName}
                                </button>
                              </h2>
                              <img data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`} style={{ width: "40px", height: "25px", marginRight: "30px" }} src={images.down} />
                            </div>
                            <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordion">
                              <div className="accordion-body">
                                {subfolder.files.map((file, idx) => (
                                  <div key={idx}>
                                    <ul>
                                      <li style={{ cursor: "pointer" }} onClick={() => openPDF(file.webViewLink)}>{file.name}</li>
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <tr style={{ display: "flex", justifyContent: "center" }}>
                          <td colSpan="3" className="text-center">
                            <img style={{ width: "200px", height: "230px" }} src={images.empty} alt="Empty" />
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

export default SpecialTopic;
