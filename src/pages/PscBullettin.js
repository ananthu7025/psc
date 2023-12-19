import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api/modules/api';
import images from '../images';
import Select from 'react-select';

const YourComponent = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedMonth, setSelectedMonth] = useState('Select');
  const [folderData, setFolderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/subfolders`);
        const data = await response.json();
        setFolderData(data.subfolders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    setCurrentItems(folderData.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, folderData]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setSelectedMonth('Select');
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(currentItems)
  const openPDF = (webLink) => {
    console.log('Opening PDF:', webLink);
    window.open(webLink, '_blank');
  };
  const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const [newSubfolder, setNewSubfolder] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);

  // Options array for the Select component
  const optionsArrayForUpload = folderData.map((folder) => ({
    value: folder.mainSubfolder,
    label: folder.mainSubfolder,
  }));

  // Event handler for file input change
  const handleFileChange = (event) => {
    setFileToUpload(event.target.files[0]);
  };

  // Event handler for upload button click
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', fileToUpload);
      formData.append('subfolder', selectedSubfolder ? selectedSubfolder.value : newSubfolder);

      const response = await fetch(`${BASE_URL}/upload_pscbullet`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error uploading file:', error);
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
                      <div className="col-6 text-end"></div>
                      <div className="col-6 text-end">
                        <select className="input-search" style={{ marginRight: "10px" }} value={selectedYear} onChange={handleYearChange}>
                          {folderData.map(folder => (
                            <option key={folder.mainSubfolder} value={folder.mainSubfolder}>
                              {folder.mainSubfolder}
                            </option>
                          ))}
                        </select>
                        <select className="input-search" value={selectedMonth} onChange={handleMonthChange}>
                          <option>Select</option>
                          {folderData
                            .find(folder => folder.mainSubfolder === selectedYear)
                            ?.secondSubfolders.map(secondSubfolder => (
                              <option key={secondSubfolder.subfolder} value={secondSubfolder.subfolder}>
                                {secondSubfolder.subfolder}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <table className="table align-items-center mb-0 mt-2">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Year</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">PDF File Name</th>
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
                          currentItems?.map((item) => (
                            item?.secondSubfolders
                              .filter(secondSubfolder => secondSubfolder.subfolder === selectedMonth)
                              .map((filteredSubfolder, subfolderIndex) => (
                                filteredSubfolder.pdfFiles.map((pdfFile, pdfIndex) => (
                                  <tr key={`${subfolderIndex}-${pdfIndex}`}>
                                    <td>
                                      <div className="d-flex px-2 py-1">

                                        <p className="text-xs font-weight-bold mb-0">{selectedYear}</p>

                                      </div>
                                    </td>
                                    <td className="align-middle">
                                      <p className="text-secondary font-weight-bold text-xs">
                                        {pdfFile}
                                      </p>
                                    </td>
                                    <td className="align-middle">
                                      <a
                                        onClick={() => openPDF(`${BASE_URL}/pscbullet_download/${selectedYear}/${selectedMonth}/${encodeURIComponent(pdfFile)}`)}
                                        className="text-secondary font-weight-bold text-xs"
                                        rel="noopener noreferrer"
                                        download={pdfFile}
                                      >
                                        Download
                                      </a>
                                    </td>
                                  </tr>
                                ))
                              ))
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
                              {Array.from({ length: Math.ceil(folderData?.length / ITEMS_PER_PAGE) }).map((_, index) => (
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
                              disabled={currentPage === Math.ceil(folderData?.length / ITEMS_PER_PAGE)}
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
      <div>
        <h2>Upload PDF:</h2>
        <label>Select or Create Subfolder:</label>
        <Select
          options={optionsArrayForUpload}
          value={selectedSubfolder}
          onChange={(selectedOption) => {
            setSelectedSubfolder(selectedOption);
            setNewSubfolder('');
          }}
          isSearchable
          isClearable
          placeholder="Select or create subfolder..."
        />
        {!selectedSubfolder && (
          <div>
            <label htmlFor="newSubfolder">New Subfolder Name:</label>
            <input
              type="text"
              id="newSubfolder"
              value={newSubfolder}
              onChange={(event) => setNewSubfolder(event.target.value)}
            />
          </div>
        )}
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default YourComponent;
