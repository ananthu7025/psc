import React, { useState } from 'react';
import { BASE_URL } from '../api/modules/api';

const DownloadButton = ({ subfolder, fileName,monthName }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/download?subfolder=${subfolder}&fileName=${fileName}&monthName=${monthName}`);
      if (response.ok) {
        // Trigger download using the fetched file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Error downloading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  return (
    <button onClick={handleDownload}>
      Download {fileName}
    </button>
  );
};

export default DownloadButton;
