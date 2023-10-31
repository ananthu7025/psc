import React, { useState } from 'react';
import useGoogleDrive from '../components/GDrive';

const PscNotification = () => {
  const folderIds = {
    '2024': '17G24ujo48DMaga9cLsMW0nv2E2OyknRR',
    '2023': '1MIfjlfrK4aRzzGSNXbUjN8Twk4uXV-VQ',
    '2022': '1Ib_7cswMvmLVVr1DHso3-Yg_2RqN-lvx',
    '2021': '1SOVXza-07hdCj3X4EsH9Q9TWWD5wh4fm',
  };

  const [selectedYear, setSelectedYear] = useState('2023');
  const driveItems = useGoogleDrive(folderIds[selectedYear]);

  const openPDF = (webContentLink) => {
    window.open(webContentLink, '_blank');
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div style={{minHeight:"90vh"}} className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row"></div>

          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-success shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">PscNotification</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <div className="card h-100">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0">Home - PscNotification</h6>
                      </div>
                      <div className="col-6 text-end">
                        <input className="input-search" type="text" placeholder="Search" />
                        <select
                          className="input-search"
                          name="year"
                          id="year"
                          value={selectedYear}
                          onChange={handleYearChange}
                        >
                          {Object.keys(folderIds).map((year) => (
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
                      {driveItems.map((item, index) => (
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
                              onClick={() => openPDF(item.webContentLink)}
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
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

export default PscNotification;
