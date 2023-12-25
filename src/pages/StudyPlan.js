import React, { useEffect, useState } from 'react';
import images from '../images';
import { BASE_URL } from '../api/modules/api';
import toast from 'react-hot-toast';

const StudyPlan = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [mainsubfolderOptions, setMainsubfolderOptions] = useState([]);
  const [secondsubfolderOptions, setSecondsubfolderOptions] = useState([]);
  const [selectedMainsubfolder, setSelectedMainsubfolder] = useState('');
  const [selectedSecondsubfolder, setSelectedSecondsubfolder] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [newMainSubfolder, setNewMainSubfolder] = useState('');
  const [newSecondSubfolder, setNewSecondSubfolder] = useState('');

  const handleNewMainSubfolderChange = (event) => {
    setNewMainSubfolder(event.target.value);
  };

  const handleNewSecondSubfolderChange = (event) => {
    setNewSecondSubfolder(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/list`);
        const jsonData = await response.json();
        setData(jsonData);
        const mainSubfolders = jsonData.map((folder) => folder.name);
        setMainsubfolderOptions(mainSubfolders);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const selectedFolder = data?.find((folder) => folder.name === selectedMainsubfolder);
    const secondSubfolders = selectedFolder?.contents.map((subfolder) => subfolder.name) || [];
    setSecondsubfolderOptions(secondSubfolders);
  }, [data, selectedMainsubfolder]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !selectedMainsubfolder || !selectedSecondsubfolder) {
      toast.error('Please select a file and subfolders to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await fetch(
        `${BASE_URL}/upload_SCRT/${selectedMainsubfolder}/${selectedSecondsubfolder}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        toast.success('File uploaded successfully!');
        window.location.reload()
      } else {
        toast.error('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file');
    }
  };
  const downloadPDF = (subfolder, day, fileName) => {
    const downloadLink = `${BASE_URL}/scrt/download/${subfolder}/${day}/${fileName}`;
    window.location.href = downloadLink;
  };

  const [currentDay, setCurrentDay] = useState(null);

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
                      {data &&
                        data
                          .sort((a, b) => {
                            const numberA = parseInt(a?.name.match(/\d+/)) || 0;
                            const numberB = parseInt(b?.name.match(/\d+/)) || 0;
                            return numberA - numberB;
                          }).map((folder, folderIndex) => (
                            <div className="accordion-item" key={folderIndex}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '30px' }}>
                                <h2 className="accordion-header">
                                  <button
                                    className="accordion-button"
                                    type="button"
                                    onClick={() => handleDayClick(null)}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse-${folderIndex}`}
                                    aria-expanded="true"
                                    aria-controls={`collapse-${folderIndex}`}
                                  >
                                    {folder?.name}
                                  </button>
                                </h2>
                                <img
                                  onClick={() => handleDayClick(null)}
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse-${folderIndex}`}
                                  aria-expanded="true"
                                  aria-controls={`collapse-${folderIndex}`}
                                  style={{ width: '40px', height: '25px', marginRight: '30px', cursor: 'alias' }}
                                  src={images?.down}
                                  alt="down-arrow"
                                />
                              </div>
                              <div
                                id={`collapse-${folderIndex}`}
                                className="accordion-collapse collapse "
                                aria-labelledby={`heading-${folderIndex}`}
                                data-bs-parent="#accordion"
                              >
                                <div className="accordion-body">
                                  {folder?.contents &&
                                    folder?.contents
                                      .sort((a, b) => {
                                        const dayA = parseInt(a?.name?.match(/\d+/)); // Extract numeric part from day name
                                        const dayB = parseInt(b?.name?.match(/\d+/));
                                        return dayA - dayB;
                                      })
                                      .map((subfolder, subfolderIndex) => (
                                        <div key={subfolderIndex}>
                                          <h5 style={{ marginLeft: '70px' }}>{subfolder?.name}</h5>
                                          {subfolder?.contents &&
                                            subfolder?.contents.map((file, fileIndex) => (
                                              <div key={fileIndex}>
                                                <ul style={{ marginLeft: '90px' }}>
                                                  <li
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => downloadPDF(folder?.name, subfolder?.name, file?.name)}
                                                  >
                                                    {file?.name}
                                                  </li>
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
          <div>
      <div>
        <label>Main Subfolder:</label>
        <select onChange={(e) => setSelectedMainsubfolder(e.target.value)}>
          <option value="">Select Main Subfolder</option>
          {mainsubfolderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Second Subfolder:</label>
        <select onChange={(e) => setSelectedSecondsubfolder(e.target.value)}>
          <option value="">Select Second Subfolder</option>
          {secondsubfolderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
          <label>New Main Subfolder:</label>
          <input type="text" value={newMainSubfolder} onChange={(e) =>setSelectedMainsubfolder(e.target.value)}/>
        </div>
        <div>
          <label>New Second Subfolder:</label>
          <input type="text" value={newSecondSubfolder} onChange={(e) =>setSelectedSecondsubfolder(e.target.value)} />
        </div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
        </div>
      </div>
    </div>
  );
};


export default StudyPlan;
