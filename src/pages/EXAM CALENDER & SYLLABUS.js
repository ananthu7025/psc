import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api/modules/api';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { useGetUserDetailsQuery } from '../api/modules/login';

const YourComponent = () => {
  const [selectedFolder, setSelectedFolder] = useState('');
  const [subfoldersForFiles, setSubfoldersForFiles] = useState([]);
  const [data, setData] = useState([]);
  const [loadingSubfolders, setLoadingSubfolders] = useState(true);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { data: user, refetch } = useGetUserDetailsQuery();
  useEffect(() => {
    // Set the initial selected folder when the component mounts
    if (!selectedFolder && subfoldersForFiles.length > 0) {
      setSelectedFolder(subfoldersForFiles[0]);
    }
  }, [selectedFolder, subfoldersForFiles]);
  const fetchFiles = async () => {
    try {
      setLoadingFiles(true);
      const response = await fetch(`${BASE_URL}/exam_calnder/files/${selectedFolder}`);
      const result = await response.json();
      setData(result.pdfFiles);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        setLoadingSubfolders(true);
        const response = await fetch(`${BASE_URL}/exam_calnder`);
        const result = await response.json();
        setSubfoldersForFiles(result.folders);
      } catch (error) {
        console.error('Error fetching folders:', error);
      } finally {
        setLoadingSubfolders(false);
      }
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    if (selectedFolder) {
      fetchFiles();
    } else {
      setData([]);
    }
  }, [selectedFolder]);

  const [selectedSubfolder, setSelectedSubfolder] = useState(null);
  const [newSubfolder, setNewSubfolder] = useState('');
  const [subfoldersForUpload, setSubfoldersForUpload] = useState([]);

  const fetchSubfolders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exam_calnder/subfolders`);
      const result = await response.json();
      setSubfoldersForUpload(result.subfolders);
    } catch (error) {
      console.error('Error fetching subfolders:', error);
    }
  };

  useEffect(() => {
    fetchSubfolders();
  }, []);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const subfolder = selectedSubfolder ? selectedSubfolder.value : newSubfolder;
    const uploadUrl = `${BASE_URL}/exam/upload?subfolder=${encodeURIComponent(subfolder)}`;
    const formData = new FormData();
    formData.append('pdf', file);
    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('File uploaded successfully'); // Display success toast
        fetchFiles();
        window.location.reload()

      })
      .catch(error => console.error('Error uploading PDF:', error));
  };


  const optionsArrayForFiles = Object.values(subfoldersForFiles);
  const optionsArrayForUpload = Object.values(subfoldersForUpload);
  console.log(user)
  return (
    <div style={{ minHeight: "90vh" }} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - EXAM CALENDAR & SYLLABUS</h6>
                      </div>
                      <div className="col-6 text-end">
                        <select
                          className="input-search"
                          name="folder"
                          id="folder"
                          value={selectedFolder}
                          onChange={(e) => setSelectedFolder(e.target.value)}
                        >
                          <option value="">Select Year/Subfolder</option>
                          {loadingSubfolders ? (
                            <option value="" disabled>Loading Folders...</option>
                          ) : (
                            subfoldersForFiles.map((folder) => (
                              <option key={folder} value={folder}>
                                {folder}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">File</th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingFiles ? (
                        <tr>
                          <td colSpan="2" className="text-center">
                            Loading Files...
                          </td>
                        </tr>
                      ) : data && data.length > 0 ? (
                        data.map((file, index) => (
                          <tr key={index}>
                            <td className="align-middle">
                              {file}
                            </td>
                            <td className="align-middle">
                              <a
                                href={`${BASE_URL}/download/${selectedFolder}/${encodeURIComponent(file)}`}
                                className="text-secondary font-weight-bold text-xs"
                                // target="_blank"
                                rel="noopener noreferrer"
                                download={file}
                              >
                                Download
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" className="text-center">
                            No files found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {user?.isAdmin ?
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
        : null
      }
    </div>
  );
};

export default YourComponent;
