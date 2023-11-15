import React, { useEffect, useState } from 'react';
import images from '../images';

const CurrentAffairs = () => {


  const [selectedYear, setSelectedYear] = useState('2023');
  // const driveItems = useGoogleDrive(folderIds[selectedYear]);
const [driveItems,setDriveItems]=useState([])
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/files?folderId=1wvt2MMZpr-v48LchHAB3my8WTYX5i-pu`);
      const data = await response.json(); // Parse the JSON response
      setDriveItems(data.files);  // Update this line
      console.log(data.files, "dd");
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  fetchData();
}, [selectedYear]); 
  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        setTimeout(() => setLoading(false), 5000); 
  }, []);
  const reversedList = driveItems?.slice()?.reverse()
console.log(reversedList)
  return (
    <div style={{minHeight:"90vh"}} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>

          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Current Affairs</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - Current Affairs</h6>
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
  driveItems  ? (
    driveItems?.slice()?.reverse()?.map((item, index) => (
      <tr key={item.id}>
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
          {item.name}
        </a>
      </td>
      <td className="align-middle">
        <a
          href="javascript:;"
          className="text-secondary font-weight-bold text-xs"
          data-toggle="tooltip"
          data-original-title="Edit user"
          onClick={() => openPDF(item.webViewLink)}
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

export default CurrentAffairs;
