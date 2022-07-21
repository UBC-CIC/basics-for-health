import { useEffect, useState } from 'react';
import { FhirQ } from './form';
import { ToastContainer, toast, Zoom} from 'react-toastify';
import axios from 'axios';
import Navbar from './navbar';
import { Amplify, Auth, Signer} from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App() {
  const [patientID, setPatientID] = useState('');

  useEffect(() => {
    renderForm();
  }, []);

  function notify(type, text) {
    if (type === 'success') {
      toast.success(text, {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast.error(text, {
        position: "top-center",
        autoClose: 3000,
        transition: Zoom,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }

  async function renderForm() {
      let formDef = FhirQ;
      window.LForms.Util.addFormToPage(formDef, 'formContainer');
  }

  async function loadResponse() {
    let searchParameter = '?subject=Patient/' + patientID;
    let signedURL = await signRequest('get', searchParameter);

    await axios.get(signedURL).then((resp) => {
      if (resp.data["entry"][1]["search"]["mode"] === "match") {
        let fhirForm = FhirQ;
        let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(fhirForm, 'R4');
        let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", resp.data["entry"][1]["resource"], lhcForm, "R4");          
        window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
        notify('success', 'Form loaded.');
      } else {
        notify('error', 'Error loading form.');
      } 
    })
  }

  async function sendToHealthlake() { 
    let searchParameter = '?subject=Patient/' + patientID;
    let signedURL = await signRequest('get', searchParameter);

    await axios.get(signedURL).then((resp) => {
      if (resp.data["entry"].length === 1) {
        storeResponse();
      } else if (resp.data["entry"][1]["search"]["mode"] === "match") {
          updateResponse(resp.data["entry"][1]["resource"]["id"]);
      }
    })
  }

  async function updateResponse(resourceID) {
    let signedURL = await signRequest('put', resourceID);

    await axios({
      method: 'put',
      url: signedURL.url,
      headers: signedURL.headers,
      data: signedURL.data
    }).then((response) => {
      console.log(response);
      notify('success','Form updated.');
    });
  }

  async function storeResponse() {
    let signedURL = await signRequest('post');

    await axios({
      method: 'post',
      url: signedURL.url,
      headers: signedURL.headers,
      data: signedURL.data
    }).then((response) => {
      console.log(response);
      if (response.status === 201) {
        notify('success','Form submitted.');
        renderForm();
      } else {
        notify('error', 'Error submitting form.')
      }
    });
  }

  async function signRequest(requestMethod, param) {
    const credentials = {
      access_key: (await Auth.currentCredentials()).accessKeyId,
      secret_key: (await Auth.currentCredentials()).secretAccessKey,
      session_token: (await Auth.currentCredentials()).sessionToken
    };

    let dataStore = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/';
    let resourceType = 'QuestionnaireResponse';
    let endpoint = dataStore + resourceType;

    let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
    fhirQR.subject = {
      reference: "Patient/" + patientID
    }

    const serviceInfo = {
      service: 'healthlake',
      region: 'us-east-1'
    };

    if (requestMethod === 'post') {
      const request = {
        method: 'POST',
        url: endpoint,
        data: JSON.stringify(fhirQR)
      };
      
      let signedRequest = Signer.sign(request, credentials, serviceInfo);
      delete signedRequest.headers['host'];
      return signedRequest;
    } else if (requestMethod === 'put') {
        let endpoint = dataStore + resourceType + '/' + param;
        fhirQR.id = param;

        const request = {
          method: 'PUT',
          url: endpoint,
          data: JSON.stringify(fhirQR)
        };
        
        let signedRequest = Signer.sign(request, credentials, serviceInfo);
        delete signedRequest.headers['host'];
        signedRequest.headers['content-type'] = 'application/json';
        return signedRequest;
    } else {
        let endpoint = dataStore + resourceType + param;
        return Signer.signUrl(endpoint, credentials)
    }
  }

  function numbersOnly(e) {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setPatientID(e.target.value);
    }
  }

  return (
    <>
      <Navbar />
      <form style={{ marginLeft: '1em', marginTop: '1.5em'}}>
        <label>Patient ID:</label>
        <input style={{ margin: '0.5em', border: '1px solid'}} value={patientID} minLength={10} maxLength={10} required onChange={numbersOnly} />
      </form>
      <div id="formContainer" style={{ padding: '1em' }}></div>
      <button onClick={sendToHealthlake} style={{ float: 'right', marginRight: '1em' }}>Submit</button>
      <button onClick={loadResponse} style={{ float: 'left', marginLeft: '1em' }}>Load</button>
      <ToastContainer />
    </>
  );
}

export default withAuthenticator(App);