import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import { useAuth } from './Auth';

const useGoogleDrive = (folderId) => {
  const [driveItems, setDriveItems] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useAuth();

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
          const handleLoginClick = async () => {
            try {
              await authInstance.signIn();
              setIsAuthenticated(true);
              fetchDriveItems(folderId);
            } catch (error) {
              console.error('Error signing in: ', error);
              setDriveItems([]);
            }
          };

          const alertMessage = 'You are not logged in. Please click OK to sign in with Google.';
          if (window.confirm(alertMessage)) {
            handleLoginClick();
          } else {
            setDriveItems([]);
            setIsAuthenticated(true);
            fetchDriveItems('');
          }
        } else {
          setIsAuthenticated(true);
          fetchDriveItems(folderId);
        }
      } catch (error) {
        console.error('Error loading Google Drive API: ', error);
      }
    };

    const fetchDriveItems = async (folderId) => {
      try {
        const resource = gapi.client.drive.files;
        const response = await resource.list({
          q: `'${folderId}' in parents and mimeType='application/pdf'`,
          fields: 'files(id, name, webContentLink)',
        });
        setDriveItems(response.result.files || []);
      } catch (error) {
        console.error('Error fetching Google Drive data: ', error);
        setDriveItems([]);
      }
    };

    loadDriveAPI();
  }, [folderId, setIsAuthenticated]);

  return driveItems;
};

export default useGoogleDrive;
