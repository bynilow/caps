import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createContext } from 'react';
import * as firebase from 'firebase/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA1TPiG1cAR87pppwgddqTvkV4BaeSKNUk",
  authDomain: "caps-23b6a.firebaseapp.com",
  projectId: "caps-23b6a",
  storageBucket: "caps-23b6a.appspot.com",
  messagingSenderId: "1008125486658",
  appId: "1:1008125486658:web:233256e77ba9cf6fc66fdb",
  measurementId: "G-2VK3TDX4D8"
};
firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Context = createContext<any>(null);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Context.Provider value={{
      firebase,
      auth
    }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>
  </React.StrictMode >

);

reportWebVitals();
