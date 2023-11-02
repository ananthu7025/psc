import React, { useState, useEffect } from 'react';
import useGoogleDrive from '../components/GDrive';
import { useGetFolderQuery } from '../api/modules/quiz.Module';
import images from '../images';

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
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };
  const filteredDriveItems = useGoogleDrive(folderData?.find(item => item.year === selectedYear && item.month === selectedMonth)?.folderId) || [];
console.log(folderData.find(item => item.year === selectedYear))
  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };  const [loading, setLoading] = useState(true);

  useEffect(() => {
        setTimeout(() => setLoading(false), 5000); 
  }, []);

  return (
    <div style={{minHeight:"90vh"}} className="container-fluid py-4">
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
                        <input className="input-search" type="text" placeholder="Search" />
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
  <div style={{ display: "flex", justifyContent: "center", marginLeft: "280px", marginBottom: "100px",textAlign:"center" }}>
    <span className="loader"></span>
  </div>
) : (
  filteredDriveItems.length > 0 ? (
    filteredDriveItems.map((item, index) => (
      <tr key={item.id}>
      <td>
        <div className="d-flex px-2 py-1">
          <p className="text-xs font-weight-bold mb-0">{selectedYear}</p>
        </div>
      </td>
      <td className="align-middle">
        <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
          {item.name}
        </a>
      </td>
      <td className="align-middle">
        <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user" onClick={() => openPDF(item.webContentLink)}>
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
