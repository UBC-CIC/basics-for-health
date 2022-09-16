import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Collapse, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AdminStatus from '../Helpers/adminStatus';
import { Auth, Signer, API, graphqlOperation } from 'aws-amplify';
import { listForms, getFormByName } from '../graphql/queries';

function Form(props) {
  const patientID = props.param.id;
  const [formLoaded, setFormLoaded] = useState(false);
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [version, setVersion] = useState();
  const [formVersion, setFormVersion] = useState(1);

  const questionnaireEndpoint = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/Questionnaire/';

  useEffect(() => {
    fetchForms()
    patientData();
  }, []);

  async function fetchForms() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let isAdmin = await AdminStatus();
      let forms;
      if (isAdmin) {
        forms = await API.graphql(graphqlOperation(listForms))
      } else {
        forms = await API.graphql(graphqlOperation(listForms, {filter: {otherUser: {eq: user.username}}}))
      }
      let formNames = [...new Set(forms.data.listForms.items.map((form)=>form.name))]
      setAvailableForms(formNames);
    } catch (error) {
      console.log(error)
    }
  }

  async function patientData() {
    let name = '<b>Patient Name:</b> &nbsp' + props.param.name[0].given + ' ' + props.param.name[0].family;
    let id = '<b>Patient ID:</b> &nbsp' + patientID;
    document.getElementById('patientDataContainer').innerHTML = name + ', &nbsp' + id;
  }

  async function loadResponse() {
    let questionnaireEndpoint = await signRequestQuestionnaire()
    axios.get(questionnaireEndpoint).then(async (resp) => {
      let signedURL = await signRequest('get');

      axios.get(signedURL).then((response) => {
        if (response.data["entry"].length === 1) {
          window.LForms.Util.addFormToPage(resp.data, 'formContainer');
          setFormLoaded(true);
        } else {
          let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(resp.data, 'R4');
          let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", response.data["entry"][1]["resource"], lhcForm, "R4");          
          window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
          setFormLoaded(true);
        }
      }).catch((error) => {
        window.LForms.Util.addFormToPage(resp.data, 'formContainer');
        setFormLoaded(true);
      });
    }).catch((error) => {
      console.log(error)
    })
  }

  async function signRequestQuestionnaire() {
    const credentials = {
      access_key: (await Auth.currentCredentials()).accessKeyId,
      secret_key: (await Auth.currentCredentials()).secretAccessKey,
      session_token: (await Auth.currentCredentials()).sessionToken
    };
    let formID = await getFormID()
    let endpoint = questionnaireEndpoint + formID;
  
    return Signer.signUrl(endpoint, credentials)
  }

  async function sendToHealthlake() { 
    let signedURL = await signRequest('get');

    axios.get(signedURL).then((resp) => {
      if (resp.data["entry"].length === 1) {
        storeResponse();
      } else if (resp.data["entry"][1]["search"]["mode"] === "match") {
        updateResponse(resp.data["entry"][1]["resource"]["id"]);
      }
    })
  }

  async function updateResponse(resourceID) {
    let signedURL = await signRequest('put', resourceID);

    axios({
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

    axios({
      method: 'post',
      url: signedURL.url,
      headers: signedURL.headers,
      data: signedURL.data
    }).then((response) => {
      window.scrollTo({top: 0});
      if (response.status === 201) {
        setAlertContent('Form submitted');
        setAlert(true);
      }
    });
  }

  async function handleFormSelection(e) {
    const formSelected = e.target.value;
    setSelectedForm(formSelected);
    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: formSelected, sortDirection: 'DESC', limit: 1}));
    let chosenFormVersion = chosenForm.data.getFormByName.items[0].version;
    setFormVersion(chosenFormVersion)
  }

  async function getFormID() {
    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: selectedForm, version: {eq: version}}));
    let id = chosenForm.data.getFormByName.items[0].formID;
    return id
  }

  async function signRequest(requestMethod, responseID) {
    const credentials = {
      access_key: (await Auth.currentCredentials()).accessKeyId,
      secret_key: (await Auth.currentCredentials()).secretAccessKey,
      session_token: (await Auth.currentCredentials()).sessionToken
    };

    let dataStore = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/QuestionnaireResponse';
    let formID = await getFormID()

    const serviceInfo = {
      service: 'healthlake',
      region: 'us-east-1'
    };

    if (requestMethod === 'post') {
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      fhirQR.subject = {
        reference: "Patient/" + patientID
      }
      fhirQR.meta.tag = [
        {
          "code": "lformsVersion: 30.0.0"
        },
        {
          "code": questionnaireEndpoint + formID
        }
      ]
      // fhirQR.questionnaire = questionnaireEndpoint + formID

      const request = {
        method: 'POST',
        url: dataStore,
        data: JSON.stringify(fhirQR)
      };
      
      let signedRequest = Signer.sign(request, credentials, serviceInfo);
      delete signedRequest.headers['host'];
      return signedRequest;
  } else if (requestMethod === 'put') {
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      let endpoint = dataStore + '/' + responseID;
      fhirQR.id = responseID;
      fhirQR.subject = {
        reference: "Patient/" + patientID
      }
      fhirQR.meta.tag = [
        {
          "code": "lformsVersion: 30.0.0"
        },
        {
          "code": questionnaireEndpoint + formID
        }
      ]
      // fhirQR.questionnaire = questionnaireEndpoint + formID

      const request = {
        method: 'PUT',
        url: endpoint,
        data: JSON.stringify(fhirQR)
      };
      
      let signedRequest = Signer.sign(request, credentials, serviceInfo);
      delete signedRequest.headers['host'];
      signedRequest.headers['content-type'] = 'application/json';
      return signedRequest;
    } else if (requestMethod === 'get') {
      // let searchParam = '?subject=Patient/' + patientID + '&questionnaire=' + formURL
      let searchParam = '?subject=Patient/' + patientID + '&_tag=' + questionnaireEndpoint + formID
      let searchEndpoint = dataStore + searchParam;
      return Signer.signUrl(searchEndpoint, credentials)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (buttonClicked === 'store') {
      sendToHealthlake();
    } else if (buttonClicked === 'loadForm') {
      loadResponse();
    }
  }

  return (
    <>
      <div id="patientDataContainer" style={{ height: '2.5em', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#739fd9', color: 'white'}} />
      {alert ? <Collapse in={alert}><Alert severity='success' onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
      <form style={{ marginLeft: '1em', marginTop: '1.5em' }} onSubmit={ handleSubmit }>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FormControl size="small" sx={{ marginRight: 1, minWidth: 250 }}>
            <InputLabel>Select a form</InputLabel>
            <Select value={selectedForm} label="Select a form" onChange={handleFormSelection}>
              {availableForms.map((form) => <MenuItem key={form} value={form}>{form}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField type="number" label="Version" size="small" defaultValue={1} style={{width: 80}} InputProps={{inputProps: {min: 1, max: formVersion}}} onChange={(e) => {setVersion(e.target.value)}} />
          <Button type='submit' style={{ backgroundColor: 'transparent' }} onClick={() => setButtonClicked('loadForm')}>Load</Button>
        </div>
        <div id="formContainer" style={{ paddingTop: '1em', paddingRight: '1em', paddingBottom: '1em' }}></div>
        {formLoaded ? <Button type='submit' variant="contained" style={{ float: 'right', marginRight: '1em' }} endIcon={<SendIcon />} onClick={() => setButtonClicked('store')}>Submit</Button> : null}
      </form>
    </>
  );
}

export default Form;