import axios from 'axios';
import RNFS from 'react-native-fs';
import customAdapter from './screens/customAdapter';

export const TOKEN_JWT = 'token_jwt';
export const USER_NAME = 'user_name';
export const API_URL = 'https://oldev.bibalex.org';
//172.16.0.43   oldev.bibalex.org
// export const API_URL = 'https://webtest.bibalex.org';

export const copyFileFromAssetsToDocumentDirectory = async () => {
  const documentDirectoryPath = RNFS.DocumentDirectoryPath;
  const assetCertPath = 'dmzcer.csr'; // Adjust the path according to your assets directory structure
  const assetKeyPath = 'dmzcer.p8.pem';
  const assetPFXPath = 'DMZ_Admin.pfx';
  try {
    await RNFS.copyFileAssets(assetCertPath, `${documentDirectoryPath}/dmzcer.csr`);
    await RNFS.copyFileAssets(assetKeyPath, `${documentDirectoryPath}/dmzcer.p8.pem`);
    await RNFS.copyFileAssets(assetPFXPath, `${documentDirectoryPath}/DMZ_Admin.pfx`);
    console.log('File copied from assets to document directory');
  } catch (error) {
    console.error('Error copying file:', error);
  }
};

const certFilePath = RNFS.DocumentDirectoryPath + '/dmzcer.csr';
const keyFilePath = RNFS.DocumentDirectoryPath + '/dmzcer.p8.pem';
const PFXFilePath = RNFS.DocumentDirectoryPath + '/DMZ_Admin.pfx';

// Read the certificate and private key files asynchronously
export const getCertificateAndPrivateKey = async () => {
  await copyFileFromAssetsToDocumentDirectory();
  console.log('certFilePath', certFilePath);
  const certFile = await RNFS.readFile(certFilePath, 'utf8');
  const privateKey = await RNFS.readFile(keyFilePath, 'utf8');
  // const PFXCER = await RNFS.readFile(PFXFilePath, 'utf8');
  console.log('certFile', certFile);
  console.log('privateKey', privateKey);
  return { certFile, privateKey };
};


// const axiosInstance = axios.create({
//   adapter: customAdapter,
// });
// export default axiosInstance;