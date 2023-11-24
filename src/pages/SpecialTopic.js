import React, { useEffect, useState } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';
import toast from 'react-hot-toast';

const SpecialTopic = () => {
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState()
  const [token, setToken] = useState(null);

  const openPDF = (webViewLink) => {
    window.open(webViewLink, '_blank');

  };

  useEffect(() => {
    const newCode = localStorage.getItem("code");
    const newToken = localStorage.getItem("gtoken");

    if (newCode) {
      if (newToken) {
        getFiles(JSON.parse(newToken));
      } else {
        getToken(newCode);
      }
    } else {
      getAuthURL();
    }
  }, [token]);

  const getAuthURL = async () => {
    try {
      const response = await fetch(`${BASE_URL}/getAuthURL`);
      const authURL = await response.text();
      window.location.href = authURL;
    } catch (error) {
      console.error('Error fetching authorization URL:', error);
      toast.error("Please Signin with Google")
    }
  };

  const getToken = async (code) => {
    try {
      const response = await fetch(`${BASE_URL}/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const token = await response.json();
      setToken(token);
      localStorage.setItem("gtoken", JSON.stringify(token));
    } catch (error) {
      console.error('Error fetching token:', error);
      localStorage.removeItem("gtoken");
      localStorage.removeItem("code");
      getAuthURL();
    }
  };

  const getFiles = async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/specialTopic/174PLxquGWuddRVYF-TMlTqaUM-dr7ikV`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: token,
        }),
      });

      if (response.status === 400) {
        localStorage.removeItem("gtoken");
        localStorage.removeItem("code");
        getAuthURL();
      }
      const files = await response.json();
      console.log('Files:', files);
      setLoading(false);
      setData(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      localStorage.removeItem("gtoken");
      localStorage.removeItem("code");
      getAuthURL();
    }
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
                      {data && data?.subfolders?.length > 0 ? (
                        data?.subfolders?.map((subfolder, index) => (
                          <div className="accordion-item" key={index}>
                            <div style={{ justifyContent: "space-between" }} className='d-flex'>
                              <h2 className="accordion-header" id={`heading-${index}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
                                  {subfolder?.folderName}
                                </button>
                              </h2>
                              <img data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`} style={{ width: "40px", height: "25px", marginRight: "30px" }} src={images.down} />
                            </div>
                            <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordion">
                              <div className="accordion-body">
                                {subfolder?.files?.map((file, idx) => (
                                  <div key={idx}>
                                    <ul>
                                      <li style={{ cursor: "pointer" }} onClick={() => openPDF(file?.webViewLink)}>{file?.name}</li>
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
