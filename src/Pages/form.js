import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Collapse, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AdminStatus from '../adminStatus';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { listForms, getFormByName } from '../graphql/queries';

function Form(props) {
  const patient = props.param[0];
  const practitioner = props.param[1];
  const patientID = patient.id;
  const token = props.param[2]
  const [formLoaded, setFormLoaded] = useState(false);
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [version, setVersion] = useState();
  const [formVersion, setFormVersion] = useState(1);

  const questionnaireEndpoint = 'https://launch.smarthealthit.org/v/r4/fhir/Questionnaire/';

  useEffect(() => {
    fetchForms();
    patientData();
  }, []);

  async function fetchForms() {
    try {
      let user = await Auth.currentAuthenticatedUser();
      let isAdmin = await AdminStatus();
      let forms;
      if (isAdmin) {
        forms = await API.graphql(graphqlOperation(listForms, {filter: {owner: {eq: user.username}}}));
      } else {
        forms = await API.graphql(graphqlOperation(listForms, {filter: {otherUser: {eq: user.username}}}));
      }
      let formNames = [...new Set(forms.data.listForms.items.map((form)=>form.name))];
      setAvailableForms(formNames);
    } catch (error) {
      console.log(error);
    }
  }

  async function patientData() {
    let name = '<b>Patient Name:</b> &nbsp' + props.param[0].name[0].given + ' ' + props.param[0].name[0].family;
    let id = '<b>Patient ID:</b> &nbsp' + patientID;
    document.getElementById('patientDataContainer').innerHTML = name + ', &nbsp' + id;
  }

  async function loadResponse() {
    let formID = await getFormID();
    let endpoint = questionnaireEndpoint + formID; 
    axios({
      method: 'get',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      url: endpoint,
    }).then(async (resp) => {
      let endpoint = await httpRequest('get');
      axios({
        method: 'get',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        url: endpoint,
      }).then((response) => {
        let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(resp.data, 'R4');
        let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", response.data.entry[0].resource, lhcForm, "R4");          
        window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
        setFormLoaded(true);
      }).catch((error) => {
        window.LForms.Util.addFormToPage(resp.data, 'formContainer');
        setFormLoaded(true);
      });
    }).catch((error) => {
      console.log(error)
    })
  }

  async function checkResponseExists() { 
    let endpoint = await httpRequest('get');

    axios({
      method: 'get',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      url: endpoint,
    }).then((resp) => {
      if (resp.data.entry === undefined) {
        storeResponse();
      } else {
        updateResponse(resp.data.entry[0].resource.id);
      }
    }).catch((error) => {
      console.log(error);
    })    
  }

  async function updateResponse(resourceID) {
    let request = await httpRequest('put', resourceID);

    axios({
      method: 'put',
      headers: request.headers,
      url: request.url,
      data: request.data
    }).then((response) => {
      window.scrollTo({top: 0});
      if (response.status === 200) {
        setAlertContent('Answers updated');
        setAlert(true);
      }
    });
  }

  async function storeResponse() {
    let request = await httpRequest('post');

    axios({
      method: 'post',
      headers: request.headers,
      url: request.url,
      data: request.data
    }).then((response) => {
      window.scrollTo({top: 0});
      if (response.status === 200) {
        setAlertContent('Answers submitted');
        setAlert(true);
      }
    });
  }

  async function httpRequest(requestMethod, responseID) {
    let baseEndpoint = 'https://launch.smarthealthit.org/v/r4/fhir/';
    let formID = await getFormID()

    if (requestMethod === 'post') {
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      fhirQR.subject = {
        reference: "Patient/" + patientID
      }
      fhirQR.questionnaire = questionnaireEndpoint + formID
      let bundle = {
        "resourceType": "Bundle",
        "meta": {
          "tag": [
            {
              "system": "https://ehealthbc.ca/NamingSystem/eforms/correlationId",
              "code": "982d66ef-2fe1-4a74-a050-c35b61bdad2c"
            }
          ]
        },
        "type": "transaction",
        "entry": [
          {
            "request": {
              "method": "POST",
              "url": "Patient"
            }
          },
          {
            "request": {
              "method": "POST",
              "url": "Practitioner"
            }
          },
          {
            "request": {
              "method": "POST",
              "url": "Questionnaire"
            }
          }
        ]
      }
      bundle.entry[0].resource = patient
      bundle.entry[1].resource = practitioner
      bundle.entry[2].resource = fhirQR

      const request = {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        url: baseEndpoint,
        data: bundle
      };
      return request;
    } else if (requestMethod === 'put') {
      let endpoint = baseEndpoint + '/QuestionnaireResponse/' + responseID;
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      fhirQR.id = responseID;
      const request = {
        method: 'put',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        url: endpoint,
        data: JSON.stringify(fhirQR)
      };
      return request;
    } else if (requestMethod === 'get') {
      let searchParam = '/QuestionnaireResponse?subject=Patient/' + patientID + '&questionnaire=' + questionnaireEndpoint + formID
      let searchEndpoint = baseEndpoint + searchParam;
      return searchEndpoint
    }
  }

  async function handleFormSelection(e) {
    const formSelected = e.target.value;
    setSelectedForm(formSelected);
    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: formSelected, sortDirection: 'DESC', limit: 1}));
    let chosenFormVersion = chosenForm.data.getFormByName.items[0].version;
    setFormVersion(chosenFormVersion);
  }

  async function getFormID() {
    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: selectedForm, version: {eq: version}}));
    let id = chosenForm.data.getFormByName.items[0].formID;
    return id;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (buttonClicked === 'store') {
      checkResponseExists();
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