import Navbar from './Components/navbar';
import Form from './Pages/form';
import Upload from './Pages/upload';
import Admin from './Pages/admin';
import { Routes, Route } from 'react-router-dom'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useEffect, useState } from 'react';
Amplify.configure(awsExports);

function App(props) {
  const client = props.client;
  const [patient, setPatient] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    let pat = await client.patient.read();
    setPatient(pat);
    setLoading(false);
    let token = client.state.tokenResponse.access_token
    setAccessToken(token)
  }

  if (loading) {
    return <span>Loading...</span>
  }
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Form param={[patient, accessToken]} />} />
        <Route path="/upload" element={<Upload param={accessToken}/>} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
}

export default withAuthenticator(App);