import { useState, useEffect } from 'react';
import { Collapse, Alert, Button, Box, Stack, TextField, Tabs, Tab, FormControl, InputLabel, Select, MenuItem} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { Auth, Signer, Storage, API, graphqlOperation } from 'aws-amplify';
import axios from 'axios'
import { createForm } from '../graphql/mutations';
import { listForms, getFormByName } from '../graphql/queries';
import awsExports from '../aws-exports';

export default function Upload() {
  const [formTitle, setFormTitle] = useState('');
  const [formUser, setFormUser] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [updateFormFieldError, setUpdateFormFieldError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState('');
  const [updateFile, setUpdateFile] = useState();
  const [selectedUpdateFile, setSelectedUpdateFile] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('')
  const [alertContent, setAlertContent] = useState('');
  const [value, setValue] = useState(0);
  const [availableForms, setAvailableForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState('');

  const [ts, setTs] = useState(null);


  useEffect(() => {
    async function existingForms() {
      try {
        let forms = await API.graphql(graphqlOperation(listForms))      
        // let formNames = forms.data.listForms.items;
        // let x = new Set(formNames.map((n)=>n.name))
        let x = [...new Set(forms.data.listForms.items.map((form)=>form.name))]
        setAvailableForms(x);
      } catch (error) {
        console.log(error)
      }
    }
    existingForms()
  }, [])

  async function handleChange(e) {
    const f = e.target.files[0];
    setSelectedFile(f.name);
    setFile(e.target.files[0]);
  }

  async function handleUpdateChange(e) {
    const f = e.target.files[0];
    setSelectedUpdateFile(f.name);
    setUpdateFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let uploadFile = document.getElementById('uploadFile')
    if (formTitle === '') {
      setFieldError(true);
      setErrorText("Please enter form title");
    } else if (!uploadFile.files.length) {
      setAlert(true)
      setAlertContent('No file chosen')
      setAlertType('error')
    } else {
        setFieldError(false);
        setErrorText('');
        try {
            let req = await signRequest(false)
            axios({
              method: 'post',
              url: req.url,
              headers: req.headers,
              data: req.data
            }).then(async (response) => {
              console.log(response);
              const formData = {
                input: {
                  name: formTitle,
                  version: 1,
                  otherUser: formUser,
                  formID: response.data.id
                }
              }
            // let endpoint = 'http://localhost:4004/hapi-fhir-jpaserver/fhir/Questionnaire'
            // axios({
            //   method: 'post',
            //   headers: {'Content-Type': 'application/json'},
            //   url: endpoint,
            //   data: file
            // }).then(async (response) => {
            //   console.log(response);
            //   const formData = {
            //     input: {
            //       name: formTitle,
            //       version: 1,
            //       otherUser: formUser,
            //       formID: response.data.id
            //     }
            //   }
              await API.graphql(graphqlOperation(createForm, formData));
              setAlertType('success')
              setAlert(true);
              setAlertContent('File uploaded successfully');
            });
            
          // await Storage.put(file.name, file, {
          //   contentType: "application/json"
          // })
          // .then(async (resp) => {
          //   const fileData = {
          //     input: {
          //       name: formTitle,
          //       otherUser: formUser,
          //       file: {
          //         bucket: awsExports.aws_user_files_s3_bucket,
          //         region: awsExports.aws_user_files_s3_bucket_region,
          //         key: file.name
          //       }
          //     }
          //   }
            // await API.graphql(graphqlOperation(createForm, fileData));
            // if (resp.key === file.name) {
            //   setAlertType('success')
            //   setAlert(true);
            //   setAlertContent('File uploaded successfully');
            // }
        } catch (error) {
          console.log(error)
          setAlertType('error')
          setAlert(true);
          setAlertContent('Error uploading file');
        }
    }
  }

  async function signRequest(isUpdate) {
    const credentials = {
        access_key: (await Auth.currentCredentials()).accessKeyId,
        secret_key: (await Auth.currentCredentials()).secretAccessKey,
        session_token: (await Auth.currentCredentials()).sessionToken
    };

    let dataStore = 'https://healthlake.us-east-1.amazonaws.com/datastore/92641762d5c7ea1f301847e4b3633356/r4/Questionnaire';

    const serviceInfo = {
        service: 'healthlake',
        region: 'us-east-1'
    };

    const fr = new FileReader()

    if (isUpdate) {
      fr.readAsText(updateFile)
    } else {
      fr.readAsText(file)
    }
    
    fr.onload = function() {
      setTs(fr.result)
    }
    const request = {
      method: 'POST',
      url: dataStore,
      data: ts
    };
    
    let signedRequest = Signer.sign(request, credentials, serviceInfo);
    delete signedRequest.headers['host'];
    signedRequest.headers['content-type'] = 'application/json';
    return signedRequest;
  }

  async function handleFormUpdate(e) {
    e.preventDefault();
    let file = document.getElementById('updateFile')
    if (selectedForm === '') {
      setUpdateFormFieldError(true);
    } else if (!file.files.length) {
      setAlert(true)
      setAlertContent('No file chosen')
      setAlertType('error')
    } else {
      setUpdateFormFieldError(false)
      try {
          let chosenForm = await API.graphql(graphqlOperation(getFormByName, {name: selectedForm, sortDirection: 'DESC', limit: 1}));
          let formName = chosenForm.data.getFormByName.items[0].name;
          let newVersion = chosenForm.data.getFormByName.items[0].version + 1;
          // let endpoint = 'http://localhost:4004/hapi-fhir-jpaserver/fhir/Questionnaire'

          let req = await signRequest(true)

          axios({
            method: 'post',
            url: req.url,
            headers: req.headers,
            data: req.data
          }).then(async (response) => {
            console.log(response);
            const formData = {
              input: {
                name: formName,
                version: newVersion,
                formID: response.data.id
              }
            }

          // axios({
          //   method: 'post',
          //   headers: {'Content-Type': 'application/json'},
          //   url: endpoint,
          //   data: updateFile
          // }).then(async (response) => {
          //   console.log(response);
          //   const formData = {
          //     input: {
          //       name: formName,
          //       version: newVersion,
          //       formID: response.data.id
          //     }
          //   }
            await API.graphql(graphqlOperation(createForm, formData));
            setAlertType('success')
            setAlert(true);
            setAlertContent('Form updated successfully');
          });
        } catch (error) {
          console.log(error)
          setAlertType('error')
          setAlert(true);
          setAlertContent('Error uploading file');
        }
    }
  }

  const handleUpdate = (e, newValue) => {
    setValue(newValue);
  };

  return (
      <>
        {alert ? <Collapse in={alert}><Alert severity={alertType} onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
        <Box sx={{ width: '100%', marginTop: '2em' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={value} onChange={handleUpdate}>
              <Tab label="Upload Form" />
              <Tab label="Update Form" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                  <Stack spacing={2}>
                    <TextField
                        label="Form Title"
                        variant="outlined" 
                        size="small"
                        value={formTitle}
                        onChange={(e) => {setFormTitle(e.target.value)}}
                        error={fieldError}
                        helperText={errorText}
                        inputProps={{autoComplete: 'off'}}
                    />
                    <TextField
                        label="Username (optional)"
                        variant="outlined" 
                        size="small"
                        value={formUser}
                        onChange={(e) => {setFormUser(e.target.value)}}
                        inputProps={{autoComplete: 'off'}}
                    />
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadFile />}
                    >
                      Upload file
                      <input type="file" id="uploadFile" accept=".json" hidden onChange={handleChange}/>
                    </Button>
                    { selectedFile }
                    <Box display="flex" justifyContent='flex-end'>
                      <Button type='submit' style={{width: 'fit-content'}}>Submit</Button>
                    </Box>
                  </Stack>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box 
                component='form'
                onSubmit={handleFormUpdate}
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                  <Stack spacing={2}>
                    <FormControl size="small" sx={{ minWidth: 223 }}>
                      <InputLabel>Select form to update</InputLabel>
                      <Select value={selectedForm} error={updateFormFieldError} label="Select form to update" onChange={(e) => setSelectedForm(e.target.value)}>
                        {availableForms.map((form) => <MenuItem key={form} value={form}>{form}</MenuItem>)}
                      </Select>
                    </FormControl>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<UploadFile />}
                    >
                      Upload file
                      <input type="file" id="updateFile" accept=".json" hidden onChange={handleUpdateChange}/>
                    </Button>
                    { selectedUpdateFile }
                    <Box display="flex" justifyContent='flex-end'>
                        <Button type='submit' style={{width: 'fit-content'}}>Update</Button>
                    </Box>
                  </Stack>
            </Box>
          </TabPanel>
        </Box>
        {/* {alert ? <Collapse in={alert}><Alert severity={alertType} onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
        <Box 
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                marginTop: '3em',
                textAlign: 'center',
                justifyContent: 'center'
            }}>
              <Stack spacing={2}>
                <h2>Upload a new questionnaire</h2>
                <TextField
                    label="Form Title"
                    variant="outlined" 
                    size="small"
                    value={formTitle}
                    onChange={(e) => {setFormTitle(e.target.value)}}
                    error={fieldError}
                    helperText={errorText}
                    inputProps={{autoComplete: 'off'}}
                />
                <TextField
                    label="Username (optional)"
                    variant="outlined" 
                    size="small"
                    value={formUser}
                    onChange={(e) => {setFormUser(e.target.value)}}
                    inputProps={{autoComplete: 'off'}}
                />
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<UploadFile />}
                >
                  Upload file
                  <input type="file" accept=".json" hidden onChange={handleChange}/>
                </Button>
                { selectedFile }
                <Box display="flex" justifyContent='flex-end'>
                    <Button type='submit' style={{width: 'fit-content'}}>Submit</Button>
                </Box>
              </Stack>
        </Box> */}
      </>
  )
}

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 5 }}>
          {children}
        </Box>
      )}
    </div>
  );
}