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
  const [value, setValue] = useState();

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

  // async function fhirPost() {
  //   let base = 'https://lforms-fhir.nlm.nih.gov/baseR4';
  //   let resourceType = '/Questionnaire';
  //   let endpoint = base + resourceType;
  //   let questionnaire = FhirQ;

  //   axios({
  //     method: 'post',
  //     url: endpoint,
  //     data: questionnaire
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // }

  async function renderForm() {
      let formDef = FhirQ;
      window.LForms.Util.addFormToPage(formDef, 'formContainer');
  }

  async function loadResponse() {
    let resourceID = "/" + value;
    let signedURL = await signRequest('get', resourceID);

    await axios.get(signedURL).then((resp) => {
        console.log(resp.data);
        if (resp.status === 200) {
          let fhirForm = FhirQ;
          let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(fhirForm, 'R4');
          let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", resp.data, lhcForm, "R4");          
          window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
          notify('success', 'Form loaded.');
        } else {
          notify('error', 'Error loading form.');
        } 
    }).catch(notify('error', 'Error loading form.'))
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
        setValue(response.data.id);
        notify('success','Form submitted.');
        renderForm();
      } else {
        notify('error', 'Error submitting form.')
      }
    });
  }

  async function signRequest(requestMethod, id) {
    const credentials = {
      access_key: (await Auth.currentCredentials()).accessKeyId,
      secret_key: (await Auth.currentCredentials()).secretAccessKey,
      session_token: (await Auth.currentCredentials()).sessionToken
    };

    let dataStore = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/';
    let resourceType = 'QuestionnaireResponse';
    let endpoint = dataStore + resourceType;

    if (requestMethod === 'post') {
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');

      const request = {
        method: 'POST',
        url: endpoint,
        data: JSON.stringify(fhirQR)
      };
  
      const serviceInfo = {
        service: 'healthlake',
        region: 'us-east-1'
      };
      
      let signedRequest = Signer.sign(request, credentials, serviceInfo);
      delete signedRequest.headers['host'];
      
      return signedRequest;
    } else {
      let endpoint = dataStore + resourceType + id;
      return Signer.signUrl(endpoint, credentials)
    }
  }

  return (
    <>
      <Navbar />
      <div id="formContainer" style={{ padding: '1em' }}></div>
      <button onClick={storeResponse} style={{ float: 'right', marginRight: '1em' }}>Submit</button>
      <button onClick={loadResponse} style={{ float: 'left', marginLeft: '1em' }}>Load</button>
      <ToastContainer />
    </>
  );
}

export default withAuthenticator(App);
