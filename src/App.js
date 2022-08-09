import Navbar from './Components/navbar';
import Form from './Pages/form';
import Upload from './Pages/upload';
import Admin from './Pages/admin';
import { Routes, Route } from 'react-router-dom'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

function App(props) {
  const client = props.client;
  const [patient, setPatient] = useState();

  useEffect(() => {
    client.patient.read().then((patient) => setPatient(patient));
  }, [client.patient]);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form param={patient} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
}

export default withAuthenticator(App);