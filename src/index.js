import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import FHIR from 'fhirclient';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const ehrClientID = process.env.REACT_APP_EHR_CLIENT_ID

const smartFhirLaunch = () => {
  FHIR.oauth2.init({
    clientId: ehrClientID,
    scope: 'launch patient/Patient.read patient/Questionnaire.read patient/Questionnaire.write patient/QuestionnaireResponse.read patient/QuestionnaireResponse.write openid profile online_access'
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
