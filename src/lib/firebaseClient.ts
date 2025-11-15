import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getRemoteConfig, fetchAndActivate, getString } from "firebase/remote-config";

const firebaseConfig = {
   apiKey: "AIzaSyCbNQcNzFObrnzAuBqFUFFOTA6RdaSFw6o",
  authDomain: "aimethods-e8521.firebaseapp.com",
  projectId: "aimethods-e8521",
  appId: "1:1093809088702:web:e893ba5362145e094196ef",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const remoteConfig = getRemoteConfig(app);
export { fetchAndActivate, getString };

remoteConfig.settings.minimumFetchIntervalMillis = 10000; // 10 seconds for dev
remoteConfig.settings.fetchTimeoutMillis = 60000;         // ✅ 60 second timeout
