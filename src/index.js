import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import "./index.css"
import Contacts from "./components/Contacts"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './reduxcontainer/store';
import ChartsandMaps from './components/ChartsandMaps';
import EditContact from './components/EditContact';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
      <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Contacts />} />
                  <Route path="/chartsandmaps" element={<ChartsandMaps />} />
                  <Route path="/editcontact/:uuid" element={<EditContact />} />
              </Routes>
      </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer />
    </PersistGate>
  </Provider>
);