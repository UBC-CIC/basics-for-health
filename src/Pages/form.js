import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Collapse, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import AdminStatus from '../Helpers/adminStatus';
import { Auth, Signer, Storage, API, graphqlOperation } from 'aws-amplify';
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
  const [fVersion, setFVersion] = useState(1);

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
      
      // let formNames = forms.data.listForms.items;
      // setAvailableForms(formNames);
      let x = [...new Set(forms.data.listForms.items.map((form)=>form.name))]
      setAvailableForms(x);
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
    let formID = await getFormID();
    let base = 'http://localhost:4004/hapi-fhir-jpaserver/fhir/Questionnaire/'
    let endpoint = base + formID; 
    axios.get(endpoint).then(async (resp) => {
      let endpoint = await getEndpoint('get')
      axios.get(endpoint).then((response) => {
        console.log(response)
        let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(resp.data, 'R4');
        let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", response.data.entry[0].resource, lhcForm, "R4");          
        window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
        setFormLoaded(true);
      }).catch((error) => {
        console.log(error)
        window.LForms.Util.addFormToPage(resp.data, 'formContainer');
        setFormLoaded(true);
      });
    }).catch((error) => {
      console.log(error)
    })

    
    // let s3Key = await getS3Key();
    // let formDef = await Storage.get(s3Key, { download: true });
    // let formResult = await formDef.Body.text()
    // let formObj = JSON.parse(formResult)

    // let signedURL = await signRequest('get');

    // await axios.get(signedURL).then((resp) => {
    //   console.log(resp)
    //   if (resp.data["entry"].length === 1) {
    //     window.LForms.Util.addFormToPage(formResult, 'formContainer');
    //     setFormLoaded(true);
    //   } else if (resp.data["entry"][1]["search"]["mode"] === "match") {
    //     let lhcForm = window.LForms.Util.convertFHIRQuestionnaireToLForms(formObj, 'R4');
    //     let formWithUserData = window.LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", resp.data["entry"][1]["resource"], lhcForm, "R4");          
    //     window.LForms.Util.addFormToPage(formWithUserData, 'formContainer');
    //     setFormLoaded(true);
    //   }
    // })
  }

  async function sendToHealthlake() { 
    let endpoint = await getEndpoint('get')

    axios.get(endpoint).then((resp) => {
      console.log(resp)
      if (resp.data.entry === undefined) {
        storeResponse();
      } else {
        updateResponse(resp.data.entry[0].resource.id);
      }
    }).catch((error) => {
      console.log(error)
    })
    // let signedURL = await signRequest('get');

    // await axios.get(signedURL).then((resp) => {
    //   console.log(resp)
    //   if (resp.data["entry"].length === 1) {
    //     storeResponse();
    //   } else if (resp.data["entry"][1]["search"]["mode"] === "match") {
    //     updateResponse(resp.data["entry"][1]["resource"]["id"]);
    //   }
    // })
    
  }

  async function updateResponse(resourceID) {
    let request = await getEndpoint('put', resourceID);

    axios(request).then((response) => {
      console.log(response);
      window.scrollTo({top: 0});
      if (response.status === 200) {
        setAlertContent('Answers updated');
        setAlert(true);
      }
    });
    // let signedURL = await signRequest('put', resourceID);

    // await axios({
    //   method: 'put',
    //   url: signedURL.url,
    //   headers: signedURL.headers,
    //   data: signedURL.data
    // }).then(() => {
    //   window.scrollTo({top: 0});
    //   setAlertContent('Form updated');
    //   setAlert(true);
    // });
  }

  async function storeResponse() {
    let request = await getEndpoint('post');

    axios(request).then((response) => {
      console.log(response);
      window.scrollTo({top: 0});
      if (response.status === 201) {
        setAlertContent('Answers submitted');
        setAlert(true);
      }
    });
    // let signedURL = await signRequest('post');

    // await axios({
    //   method: 'post',
    //   url: signedURL.url,
    //   headers: signedURL.headers,
    //   data: signedURL.data
    // }).then((response) => {
    //   window.scrollTo({top: 0});
    //   if (response.status === 201) {
    //     setAlertContent('Form submitted');
    //     setAlert(true);
    //   } else {
    //     console.log(response)
    //   }
    // });
  }

  async function getEndpoint(requestMethod, param) {
    let dataStore = 'http://localhost:4004/hapi-fhir-jpaserver/fhir/'
    let resourceType = 'QuestionnaireResponse';
    let baseEndpoint = dataStore + resourceType;

    let formID = await getFormID()

    if (requestMethod === 'post') {
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      fhirQR.subject = {
        reference: "Patient/" + patientID
      }
      fhirQR.questionnaire = 'http://localhost:4004/hapi-fhir-jpaserver/fhir/Questionnaire/' + formID

      const request = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        url: baseEndpoint,
        data: JSON.stringify(fhirQR)
      };
      return request;
    } else if (requestMethod === 'put') {
      let endpoint = baseEndpoint + '/' + param;
      let fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
      fhirQR.id = param;
      const request = {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        url: endpoint,
        data: JSON.stringify(fhirQR)
      };
      return request;
    } else if (requestMethod === 'get') {
      let searchParam = '?subject=Patient/' + patientID + '&questionnaire=http://localhost:4004/hapi-fhir-jpaserver/fhir/Questionnaire/' + formID
      let endpoint = baseEndpoint + searchParam;
      return endpoint
    }
  }

  async function getFormVersion(e) {
    const f = e.target.value;
    setSelectedForm(f);

    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: f, sortDirection: 'DESC', limit: 1}));
    let formVersion = chosenForm.data.getFormByName.items[0].version;
    setFVersion(formVersion)
  }

  async function getFormID() {
    let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: selectedForm, version: {eq: version}}));
    let id = chosenForm.data.getFormByName.items[0].formID;
    return id
  }

  // async function signRequest(requestMethod, param) {
  //   const credentials = {
  //       access_key: (await Auth.currentCredentials()).accessKeyId,
  //       secret_key: (await Auth.currentCredentials()).secretAccessKey,
  //       session_token: (await Auth.currentCredentials()).sessionToken
  //   };

  //   let dataStore = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/';
  //   let resourceType = 'QuestionnaireResponse';
  //   let endpoint = dataStore + resourceType;

  //   let formURL = await getS3URL();
  //   let user = await Auth.currentAuthenticatedUser();

  //   let fhirQR;

  //   if (requestMethod !== 'get') {
  //     fhirQR = window.LForms.Util.getFormFHIRData('QuestionnaireResponse', 'R4');
    
  //     fhirQR.subject = {
  //         reference: "Patient/" + patientID
  //     }
  //     fhirQR.meta.tag = [
  //       {
  //         "code": "lformsVersion: 30.0.0"
  //       },
  //       {
  //         "code": formURL
  //       }
  //     ]
  //     fhirQR.questionnaire = formURL
  //     fhirQR.author = {
  //       reference: user.username
  //     }
  //   }

  //   const serviceInfo = {
  //       service: 'healthlake',
  //       region: 'us-east-1'
  //   };

  //   if (requestMethod === 'post') {
  //       const request = {
  //       method: 'POST',
  //       url: endpoint,
  //       data: JSON.stringify(fhirQR)
  //       };
        
  //       let signedRequest = Signer.sign(request, credentials, serviceInfo);
  //       delete signedRequest.headers['host'];
  //       return signedRequest;
  //   } else if (requestMethod === 'put') {
  //       let endpoint = dataStore + resourceType + '/' + param;
  //       fhirQR.id = param;

  //       const request = {
  //           method: 'PUT',
  //           url: endpoint,
  //           data: JSON.stringify(fhirQR)
  //       };
        
  //       let signedRequest = Signer.sign(request, credentials, serviceInfo);
  //       delete signedRequest.headers['host'];
  //       signedRequest.headers['content-type'] = 'application/json';
  //       return signedRequest;
  //   } else if (requestMethod === 'get') {
  //       // let searchParam = '?subject=Patient/' + patientID + '&questionnaire=' + formURL
  //       let searchParam = '?subject=Patient/' + patientID + '&_tag=' + formURL
  //       let endpoint = dataStore + resourceType + searchParam;
  //       return Signer.signUrl(endpoint, credentials)
  //   }
  // }

  // async function getS3Key() {
  //   let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: selectedForm}));
  //   let key = chosenForm.data.getFormByName.items[0].file.key;
  //   return key
  // }

  // async function getS3URL() {
  //   let s3Key = await getS3Key()
  //   let signedFormURL = await Storage.get(s3Key)
  //   let formURL = signedFormURL.substring(0, signedFormURL.indexOf('?X-Amz-Algorithm'))
  //   return formURL
  // }

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
            <Select value={selectedForm} label="Select a form" onChange={getFormVersion}>
              {availableForms.map((form) => <MenuItem key={form} value={form}>{form}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField type="number" label="Version" size="small" defaultValue={1} style={{width: 80}} InputProps={{inputProps: {min: 1, max: fVersion}}} onChange={(e) => {setVersion(e.target.value)}} />
          <Button type='submit' style={{ backgroundColor: 'transparent' }} onClick={() => setButtonClicked('loadForm')}>Load</Button>
        </div>
        <div id="formContainer" style={{ paddingTop: '1em', paddingRight: '1em', paddingBottom: '1em' }}></div>
        {formLoaded ? <Button type='submit' variant="contained" style={{ float: 'right', marginRight: '1em' }} endIcon={<SendIcon />} onClick={() => setButtonClicked('store')}>Submit</Button> : null}
      </form>
    </>
  );
}

export default Form;