import React, { useState, useEffect } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';
import axios from 'axios';
import { useGetUserDetailsQuery } from '../api/modules/login';
import toast from 'react-hot-toast';
const PreviousQuestionPaper = () => {
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const [token, setToken] = useState(null);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedType, setSelectedType] = useState('prelims');
  const [selectedGrade, setSelectedGrade] = useState('10TH LEVEL');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadYear, setUploadYear] = useState('2022');
  const [uploadType, setUploadType] = useState('prelims');
  const [uploadGrade, setUploadGrade] = useState('10TH LEVEL');
  const { data: user, refetch } = useGetUserDetailsQuery();

  const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
  console.log(currentItems)
  const openPDF = (webViewLink) => {
    window.open(webViewLink, '_blank');

  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1)

  };


  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setCurrentPage(1)

  };

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
    setCurrentPage(1)
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${selectedYear}/${selectedType}/${selectedGrade}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const files = await response.json();
        setData(files);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear, selectedType, selectedGrade]);
  const [file, setFile] = useState(null);

  // New function to handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      await axios.post(`${BASE_URL}/upload/${uploadYear}/${uploadType}/${uploadGrade}`, formData);
      toast.success('File uploaded successfully'); 
      window.location.reload()
    } catch (error) {
      console.error('File upload failed:', error.message);
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
                <h6 className="text-white text-capitalize ps-3">Previous year question</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - Previous year question</h6>
                      </div>
                      <div className="col-6 text-end">
                        <select
                          className="input-search"
                          name="year"
                          style={{ marginLeft: "5px", marginRight: "5px" }}
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                          <option value="2023">2023</option>
                          <option value="2024">2024</option>
                        </select>
                        <select
                          className="input-search"
                          style={{ marginLeft: "5px", marginRight: "5px" }}


                          name="type"
                          value={selectedType}
                          onChange={handleTypeChange}
                        >
                          <option value="prelims">Prelims</option>
                          <option value="main">Main</option>
                        </select>
                        <select
                          className="input-search"
                          style={{ marginLeft: "5px", marginRight: "5px" }}

                          name="grade"
                          value={selectedGrade}
                          onChange={handleGradeChange}
                        >
                          <option value="10TH LEVEL">10TH LEVEL</option>
                          <option value="12TH LEVEL">12th</option>
                          <option value="DEGREE LEVEL">Degree</option>
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
                        currentItems && currentItems?.length > 0 ? (
                          <React.Fragment>
                            {currentItems && currentItems?.length > 0 && currentItems?.map((item, index) => (
                              <tr key={item?.id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <p className="text-xs font-weight-bold mb-0">{selectedYear}</p>
                                  </div>
                                </td>
                                <td className="align-middle">
                                  <a
                                    href={`${BASE_URL}/download/${selectedYear}/${selectedType}/${selectedGrade}/${encodeURIComponent(item)}`}

                                    className="text-secondary font-weight-bold text-xs"
                                    data-toggle="tooltip"
                                    data-original-title="Edit user"
                                  >
                                    {item}
                                  </a>
                                </td>
                                <td className="align-middle">
                                  <a
                                    href={`${BASE_URL}/download/${selectedYear}/${selectedType}/${selectedGrade}/${encodeURIComponent(item)}`}
                                    className="text-secondary font-weight-bold text-xs"
                                    data-toggle="tooltip"
                                    data-original-title="Edit user"
                                  >
                                    Download
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </React.Fragment>
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
                        <td colSpan="6" className="text-center" style={{ border: "none" }}>
                          {/* Your provided pagination structure */}
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

{user?.isAdmin && (
  <div className='upload' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
    <div className="col-md-2">
      <select
        className="form-control"
        value={uploadYear}
        onChange={(e) => setUploadYear(e.target.value)}
        style={{ border: '1px solid #ccc', borderRadius: '3px' }} // Add border styles here
      >
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
      </select>
    </div>
    <div className="col-md-2">
      <select
        className="form-control"
        value={uploadType}
        onChange={(e) => setUploadType(e.target.value)}
        style={{ border: '1px solid #ccc', borderRadius: '3px' }} // Add border styles here
      >
        <option value="prelims">Prelims</option>
        <option value="main">Main</option>
      </select>
    </div>
    <div className="col-md-2">
      <select
        className="form-control"
        value={uploadGrade}
        onChange={(e) => setUploadGrade(e.target.value)}
        style={{ border: '1px solid #ccc', borderRadius: '3px' }} // Add border styles here
      >
        <option value="10TH LEVEL">10TH LEVEL</option>
        <option value="12TH LEVEL">12th</option>
        <option value="DEGREE LEVEL">Degree</option>
      </select>
    </div>
    <div className="col-md-3">
      <input type="file" className="form-control" id="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>
    <div className="col-md-2">
      <button className="btn btn-primary" onClick={handleFileUpload} disabled={!file}>
        Upload
      </button>
    </div>
  </div>
)}


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousQuestionPaper;
