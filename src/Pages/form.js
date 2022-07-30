import { useEffect, useState } from 'react';
import { FhirQ } from '../questionnaire';
import axios from 'axios';
import { Alert, Collapse, Button, TextField, IconButton, InputAdornment } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search'
import { Auth, Signer } from 'aws-amplify';

import 'react-toastify/dist/ReactToastify.css';

function Form() {
  const [patientID, setPatientID] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const [isFieldError, setIsFieldError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  useEffect(() => {
    renderForm();
  }, []);

  async function renderForm() {
      let formDef = FhirQ;
      window.LForms.Util.addFormToPage(formDef, 'formContainer');
  }

  async function loadResponse() {
    let searchParameter = '?subject=Patient/' + patientID;
    let signedURL = await signRequest('get', searchParameter);

    await axios.get(signedURL).then((resp) => {
      if (resp.data["entry"].length === 1) {
        fieldError('Patient does not exist');
      } else if (resp.data["entry"][1]["search"]["mode"] === "match") {
        let fhirForm = FhirQ;
        let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(fhirForm, 'R4');
        let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", resp.data["entry"][1]["resource"], lhcForm, "R4");          
        window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
        setAlertContent('Form loaded');
        setAlert(true);
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
    }).then(() => {
      window.scrollTo({top: 0});
      setAlertContent('Form updated');
      setAlert(true);
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
      window.scrollTo({top: 0});
      if (response.status === 201) {
        setAlertContent('Form submitted');
        setAlert(true);
      } else {
        console.log(response)
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

  function fieldError(text) {
    setIsFieldError(true);
    setErrorText(text)
    document.querySelector('#patient-id').scrollIntoView({block: 'center', inline: 'start'});
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (patientID === '') {
      fieldError('Field required');
    } else if (patientID.length !== 10) {
      fieldError('Please enter a valid ID number');
    } else {
      setIsFieldError(false);
      setErrorText('');
      if (buttonClicked === 'store') {
        sendToHealthlake();
      } else {
        loadResponse();
      }
    }
  }

  return (
    <>
      {alert ? <Collapse in={alert}><Alert severity='success' onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
      <form style={{ marginLeft: '1em', marginTop: '1.5em' }} onSubmit={ handleSubmit }>
        <TextField
            id='patient-id'
            value={patientID}
            label="Patient ID"
            onChange={numbersOnly}
            error={isFieldError}
            helperText={errorText}
            variant="outlined"
            size="small"
            InputProps={{autoComplete: 'off', endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" type='submit' onClick={() => setButtonClicked('load')}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )}}
        />
        <div id="formContainer" style={{ paddingTop: '1em', paddingRight: '1em', paddingBottom: '1em' }}></div>
        <Button type='submit' variant="contained" style={{ float: 'right', marginRight: '1em' }} endIcon={<SendIcon />} onClick={() => setButtonClicked('store')}>Submit</Button>
      </form>
    </>
  );
}

export default Form;