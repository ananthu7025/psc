import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useAuth } from './Auth';

const useGoogleDrive = (folderId) => {
  const [driveItems, setDriveItems] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const fetchDriveItems = async (folderId) => {
    try {
      const response = await gapi.client.drive.files.list({
        q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder'`,
        fields: 'files(id, name)',
      });

      const folders = response.result.files || [];
console.log("hi res",response)
      for (const folder of folders) {
        const subFolderId = folder.id;
        const subResponse = await gapi.client.drive.files.list({
          q: `'${subFolderId}' in parents and mimeType='application/pdf'`,
          fields: 'files(id, name, webContentLink)',
        });
        folder.files = subResponse.result.files || [];

        // If the subfolder contains more folders, recursively fetch files
        if (folder.files.length > 0) {
          for (const subfolder of folder.files) {
            if (subfolder.mimeType === 'application/vnd.google-apps.folder') {
              await fetchDriveItems(subfolder.id);
            }
          }
        }
      }

      setDriveItems(folders);
    } catch (error) {
      console.error('Error fetching Google Drive data: ', error);
      setDriveItems([]);
    }
  };

  useEffect(() => {
    const SCOPES = 'https://www.googleapis.com/auth/drive';
    const CLIENT_ID = '1040794350920-3lus2v8oe50jrtq1tkv59p9fhr38snp9.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyBEW880_KMUQNvOxyl7K0mr_-BD95bX9FI';
    const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

    const loadDriveAPI = async () => {
      try {
        await gapi.load('client:auth2');
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });

        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
          // Handle authentication as before
        } else {
          setIsAuthenticated(true);
          fetchDriveItems(folderId);
        }
      } catch (error) {
        console.error('Error loading Google Drive API: ', error);
      }
    };

    loadDriveAPI();
  }, [folderId, setIsAuthenticated]);

  return driveItems;
};

export default useGoogleDrive;
