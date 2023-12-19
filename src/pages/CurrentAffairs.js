import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import images from '../images';
import toast from 'react-hot-toast';
import { useGetUserDetailsQuery } from '../api/modules/login';
import { BASE_URL } from '../api/modules/api';

const CurrentAffairs = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const [newSubfolder, setNewSubfolder] = useState('');
  const fileInputRef = useRef(null);
  const { data, refetch } = useGetUserDetailsQuery();

  useEffect(() => {
    updateFolders();
  }, []);

  const updateFolders = () => {
    setLoading(true);
    fetch(`${BASE_URL}/current_affairs`)
      .then(response => response.json())
      .then(data => {
        setFolders(data.folders);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching folders:', error));
  };

  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!uploadFile) {
      alert('Please select a file to upload.');
      return;
    }
    const subfolder = selectedSubfolder ? selectedSubfolder.value : newSubfolder;
    const uploadUrl = `${BASE_URL}/upload?subfolder=${encodeURIComponent(subfolder)}`;
    const formData = new FormData();
    formData.append('pdf', uploadFile);
    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('File uploaded successfully'); // Display success toast
        updateFolders();
        resetForm();
      })
      .catch(error => console.error('Error uploading PDF:', error));
  };
  const resetForm = () => {
    setUploadFile(null);
    setSelectedSubfolder(null);
    setNewSubfolder('');
    window.location.reload()
  
  };
  const subfolderOptions = folders.map(folder => ({ value: folder.subfolder, label: folder.subfolder }));
  const handleOpenPDF = (subfolder, file) => {
    const pdfUrl = `${BASE_URL}/pdfs/${encodeURIComponent(subfolder)}/${encodeURIComponent(file)}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = pdfUrl;
    downloadLink.setAttribute('download', file);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">PSC CurrentAffairs</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - CurrentAffairs</h6>
                      </div>
                    </div>
                  </div>
                  {loading ? (
                    <div style={{ display: "flex", justifyContent: "center", marginLeft: "30px", marginBottom: "100px" }}>
                      <span className="loader"></span>
                    </div>
                  ) : (
                    <div style={{ marginLeft: "30px" }} className="accordion" id="accordion">
                      {folders && folders?.length > 0 ? (
                        folders.map((subfolder, index) => (
                          <div className="accordion-item" key={index}>
                            <div style={{ justifyContent: "space-between" }} className='d-flex'>
                              <h2 className="accordion-header" id={`heading-${index}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`}>
                                  {subfolder?.subfolder}
                                </button>
                              </h2>
                              <img data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="true" aria-controls={`collapse-${index}`} style={{ width: "40px", height: "25px", marginRight: "30px", cursor: "pointer" }} src={images?.down}
                              />
                            </div>
                            <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordion">
                              <div className="accordion-body">
                                {subfolder?.pdfFiles?.map((file, idx) => (
                                  <div key={idx}>
                                    <ul>
                                      <li style={{ cursor: "pointer" }} onClick={() => handleOpenPDF(subfolder.subfolder, file)}>
                                        {file}
                                      </li>
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
                            <img style={{ width: "200px", height: "230px" }} src={images?.down}
                              alt="Empty" />
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
      {
            data?.isAdmin ?
      <div>
        <h2>Upload PDF:</h2>
        <label>Select or Create Subfolder:</label>
        <Select
          options={subfolderOptions}
          value={selectedSubfolder}
          onChange={(selectedOption) => {
            setSelectedSubfolder(selectedOption);
            setNewSubfolder(''); // Reset newSubfolder when an existing subfolder is selected
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
              ref={fileInputRef}
            />
          </div>
        )}
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    :null
        }
        </div>
  );
};

export default CurrentAffairs;
