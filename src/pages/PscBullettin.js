import React, { useState, useEffect } from 'react';
import { useGetFolderQuery } from '../api/modules/quiz.Module';
import images from '../images';
import toast from 'react-hot-toast';
import { BASE_URL } from '../api/modules/api';

const PscBullettin = () => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [folderData, setFolderData] = useState([]);
  const { data: apiData, isLoading, isError, refetch } = useGetFolderQuery();

  useEffect(() => {
    if (apiData && apiData.length > 0) {
      setFolderData(apiData);
      setSelectedYear(apiData[0].year);
      setSelectedMonth(apiData[0].month);
    }
  }, [apiData]);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    setCurrentPage(1)

  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1)
  };
  const [driveItems, setDriveItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = folderData?.find(item => item.year === selectedYear && item.month === selectedMonth)?.folderId || [];
        const response = await fetch(`${BASE_URL}/files?folderId=${year}`);
        const data = await response.json();
        setDriveItems(data?.files);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Error fetching data")
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);
  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  }; const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = driveItems?.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">PSC Bulletin</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - PSC Bulletin</h6>
                      </div>
                      <div className="col-6 text-end">
                        <select className="input-search" value={selectedYear} onChange={handleYearChange}>
                          <option>2023</option>
                          <option>2024</option>
                        </select>
                        <select className="input-search" value={selectedMonth} onChange={handleMonthChange}>
                          {folderData?.filter(folder => folder?.year === selectedYear).map(folder => (
                            <option key={folder?._id} value={folder?.month}>{folder?.month}</option>
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
                        currentItems && currentItems ? (
                          currentItems?.map((item, index) => (
                            <tr key={item?.id}>
                              <td>
                                <div className="d-flex px-2 py-1">
                                  <p className="text-xs font-weight-bold mb-0">{selectedYear}</p>
                                </div>
                              </td>
                              <td className="align-middle">
                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                  {item?.name}
                                </a>
                              </td>
                              <td className="align-middle">
                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user" onClick={() => openPDF(item?.webContentLink)}>
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
                        <td colSpan="6" className="text-center" style={{ border: "none" }}>
                          <div class="pagination">
                            <button
                              class="arrow btn-pageination"
                              id="prevPage"
                              disabled={currentPage === 1}
                              onClick={() => handlePageChange(currentPage - 1)}
                            >
                              ← <span class="nav-text">PREV</span>
                            </button>
                            <div class="pages">
                              {Array.from({ length: Math.ceil(driveItems?.length / ITEMS_PER_PAGE) }).map((_, index) => (
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
                              class="arrow btn-pageination"
                              id="nextPage"
                              disabled={currentPage === Math.ceil(driveItems?.length / ITEMS_PER_PAGE)}
                              onClick={() => handlePageChange(currentPage + 1)}
                            >
                              <span class="nav-text">NEXT</span> →
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

export default PscBullettin;
