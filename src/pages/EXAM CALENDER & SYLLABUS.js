import React, { useEffect, useState } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';
import toast from 'react-hot-toast';

const ExamCalander = () => {
  const folderIds = {
    '2024': '1DL9tKYNZO6Qm6xCOrSVXV4SZezmJ5X-y',
    '2023': '191f84yQUXPmd3b9U2YjX1MI8RhGWAIfb',
  };

  const [selectedYear, setSelectedYear] = useState('2023');
  const [data,setData]=useState()

  const [token, setToken] = useState(null); 
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
  
  
  const openPDF = (webViewLink) => {
    window.open(webViewLink, '_blank');

  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
useEffect(() => {
  const newToken = localStorage.getItem("gtoken");
  getFiles(JSON.parse(newToken));

}, [selectedYear])

  const getFiles = async (token) => {
    if (!folderIds[selectedYear]&& folderIds[selectedYear] === '') {
      console.warn('Selected year is missing. Skipping API call.');
      toast.error("No data found for this year")
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/readDrive/${folderIds[selectedYear]}`, {
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
      setLoading(false);
      setData(files);
    } catch (error) {
      console.error('Error fetching files:', error);
      localStorage.removeItem("gtoken");
      localStorage.removeItem("code");
      getAuthURL();
    }
  };
  
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);
  
  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>

          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">EXAM CALENDER & SYLLABUS</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - EXAM CALENDER & SYLLABUS</h6>
                      </div>
                      <div className="col-6 text-end">
                        <select
                          className="input-search"
                          name="year"
                          id="year"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          {Object?.keys(folderIds)?.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Year</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Title</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px", textAlign: "center" }}>
                          <span className="loader"></span>
                        </div>
                      ) : (
                        currentItems && currentItems?.length >0 ? (
                          currentItems?.slice()?.reverse()?.map((item, index) => (
                            <tr key={item.id}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <p className="text-xs font-weight-bold mb-0">{selectedYear || "-"}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <a
                                  href="javascript:;"
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                >
                                  {item?.name}
                                </a>
                              </td>
                              <td className="align-middle">
                                <a
                                  href="javascript:;"
                                  className="text-secondary font-weight-bold text-xs"
                                  data-toggle="tooltip"
                                  data-original-title="Edit user"
                                  onClick={() => openPDF(item?.webLink)}
                                >
                                  Download
                                </a>
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
                    <tfoot style={{ border: "none" }}>
                      <tr style={{ border: "none" }}>
                        <td colSpan="3" className="text-center" style={{ border: "none" }}>
                          <div className="pagination">
                            <button
                              className="arrow btn-pageination"
                              id="prevPage"
                              disabled={currentPage === 1}
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              ← <span className="nav-text">PREV</span>
                            </button>
                            <div className="pages">
                              {Array.from({ length: Math.ceil(data?.length / ITEMS_PER_PAGE) }).map((_, index) => (
                                <div
                                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                                  style={{ backgroundColor: currentPage === index + 1 ? '#66BB6A' : 'transparent', color: currentPage === index + 1 ? 'white' : 'black', fontWeight: "700" }}
                                  onClick={() => handlePageChange(index + 1)}
                                >
                                  {index + 1}
                                </div>
                              ))}
                            </div>
                            <button
                              className="arrow btn-pageination"
                              id="nextPage"
                              disabled={currentPage === Math.ceil(data?.length / ITEMS_PER_PAGE)}
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              <span className="nav-text">NEXT</span> →
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
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

export default ExamCalander;
