import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import FHIR from 'fhirclient';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const ehrClientID = process.env.REACT_APP_EHR_CLIENT_ID
// const ehrClientSecret = process.env.REACT_APP_EHR_CLIENT_SECRET

const smartFhirLaunch = () => {
  FHIR.oauth2.init({
    clientId: 'ad1c147a-7450-495e-96ca-b6eccbaa6cdb',
    clientSecret: 'IDZZICahKXWODWF1sEbHnphqC41vX6VR',
    scope: 'launch patient/Patient.read user/Patient.read user/Practitioner.read user/Questionnaire.* patient/QuestionnaireResponse.* openid profile online_access',
  })
  .then(client => {
    root.render(
      <React.StrictMode>
        <Router>
          <App client={client} />
        </Router>
      </React.StrictMode>
    );
  })
};

smartFhirLaunch();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
