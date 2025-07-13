// File: src/lib/firebaseClient.ts
import firebase from "firebase/compat/app";
import "firebase/compat/remote-config";

const firebaseConfig = {
   apiKey: "AIzaSyCbNQcNzFObrnzAuBqFUFFOTA6RdaSFw6o",
  authDomain: "aimethods-e8521.firebaseapp.com",
  projectId: "aimethods-e8521",
  appId: "1:1093809088702:web:e893ba5362145e094196ef", 
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const remoteConfig = app.remoteConfig();

remoteConfig.settings = {
  minimumFetchIntervalMillis: 10000, // 10 seconds for dev
  fetchTimeoutMillis: 60000,         // ✅ 60 second timeout
};
