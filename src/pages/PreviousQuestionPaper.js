import React, { useState, useEffect } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';
import toast from 'react-hot-toast';

const PreviousQuestionPaper = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  
  const folderStructure = {
    '2024': {
      'prelims': {
        '10th': '1n1V3YLlzz0FZE1Q8tVzndm3ScT1aKe9z',
        '12th': '1I1QbRH6qfeLMFVk1Ce6jox3h19VaPepd',
        'degree': '1mNTeXhnWAFux1ustsNu8GATsf37NwP94',
      },
      'main': {
        '10th': '1wGWpy2vI53n9iCghIWvgngx4a_a7Ru78',
        '12th': '1ePkia9G9XiLYPIEZB8xA3tIOD1KciPkZ',
        'degree': '1ufp_PMUmQSD_zjXE4XQIjDWK0hIjXuA6',
      },
    },
    '2023': {
      'main': {
        '10th': '1W8DOBt4pJMq4I3u2np7xrOYyKdPzwYYe',
        '12th': '1W8DOBt4pJMq4I3u2np7xrOYyKdPzwYYe',
        'degree': '1W8DOBt4pJMq4I3u2np7xrOYyKdPzwYYe',
      },
      'prelims': {
        '10th': '16tM3R0FxLBEaC-pvvs7eLwcSJfLC9fK5',
        '12th': '1ZsWn69EjR85lElekMnYXd-HzT0RHA8kz',
        'degree': '1TSg8BX_0OqHwG5MlaCXsn2rgzrMRRaMn',
      },
    },
    '2022': {
      'prelims': {
        '10th': '1ACNQnOgu7SOw9ZpY3jfRxWSSifeZtFTU',
        '12th': '1RQL3mMw92OaO6GrIdn8LFdopSX5DS11r',
        'degree': '1ogVxEpilJ8XmXoKegXz-YnNCzdVqtN_-',
      },
      'main': {
        '10th': '1Hnkfd0sdPS9FKz6-h55cIKaQfkPQGZw1',
        '12th': '1LuTPA0fbXGTcOi1-K9GfUFaqnGNCZLVa',
        'degree': '1WQ5q_SaiBRIe9SrK67Wo9jhLWHig4ZkB',
      },
    },
    '2021': {
      'prelims': {
        '10th': '1FLImgdyDg9wtskzEvXWmsSWq0WL8_B-K',
        '12th': '10a4orTvUYqLr4TK5Rik_V-vYihGBZQhm',
        'degree': '1mm59yKsZDlag0ia_9OjvfhsCRT--k4kF',
      },
      'main': {
        '10th': '1StscxseY5M3648Yw6YD3GtRJ8re5gqzB',
        '12th': '1bo8a2Df8so_oMod7XzwmxdIYRoaek8Dv',
        'degree': '1w7PvqzYjY4Fct7akhntT0JaxW6XrSTX4',
      },
    },
  };
  const [data,setData]=useState()
  const [token, setToken] = useState(null); 
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = Array.isArray(data) ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedType, setSelectedType] = useState('prelims');
  const [selectedGrade, setSelectedGrade] = useState('10th');
  
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
  }, []);

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
      const Select = folderStructure[selectedYear][selectedType][selectedGrade]

      if (!Select&& Select === '') {
        console.warn('Selected year is missing. Skipping API call.');
        setData([])
        return;
      }
      const response = await fetch(`${BASE_URL}/readDrive/${Select}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: token,
        }),
      });
  
      if (response.status === 400 || response.status ===404) {
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
    setCurrentPage(1)

  };
  useEffect(() => {
    const newToken = localStorage.getItem("gtoken");
    getFiles(JSON.parse(newToken));
  }, [selectedYear, selectedType, selectedGrade]);
 
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
                          style={{marginLeft:"5px",marginRight:"5px"}}

                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          {Object?.keys(folderStructure)?.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        <select
                          className="input-search"
                          style={{marginLeft:"5px",marginRight:"5px"}}


                          name="type"
                          value={selectedType}
                          onChange={handleTypeChange}
                        >
                          <option value="prelims">Prelims</option>
                          <option value="main">Main</option>
                        </select>
                        <select
                          className="input-search"
                          style={{marginLeft:"5px",marginRight:"5px"}}

                          name="grade"
                          value={selectedGrade}
                          onChange={handleGradeChange}
                        >
                          <option value="10th">10th</option>
                          <option value="12th">12th</option>
                          <option value="degree">Degree</option>
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
                        currentItems &&  currentItems?.length > 0 ? (
                          <React.Fragment>
                            {currentItems && currentItems?.length > 0&&  currentItems?.map((item, index) => (
                              <tr key={item?.id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <p className="text-xs font-weight-bold mb-0">{selectedYear}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousQuestionPaper;
