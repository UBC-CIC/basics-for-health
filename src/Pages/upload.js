import { useState } from 'react';
import { Collapse, Alert, Button, Box, Stack, TextField } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { Storage, API, graphqlOperation } from 'aws-amplify';
import { createForm } from '../graphql/mutations';
import awsExports from '../aws-exports';

export default function Upload() {
  const [formTitle, setFormTitle] = useState('');
  const [formUser, setFormUser] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState('')
  const [alertContent, setAlertContent] = useState('');

  async function handleChange(e) {
    const f = e.target.files[0];
    setSelectedFile(f.name);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formTitle === '') {
      setFieldError(true);
      setErrorText("Please enter form title");
    } else {
        setFieldError(false);
        setErrorText('');
        try {
          await Storage.put(file.name, file, {
            contentType: "application/json"
          })
          .then(async (resp) => {
            const fileData = {
              input: {
                name: formTitle,
                otherUser: formUser,
                file: {
                  bucket: awsExports.aws_user_files_s3_bucket,
                  region: awsExports.aws_user_files_s3_bucket_region,
                  key: file.name
                }
              }
            }
            await API.graphql(graphqlOperation(createForm, fileData));
            if (resp.key === file.name) {
              setAlertType('success')
              setAlert(true);
              setAlertContent('File uploaded successfully');
            }
          })
        } catch (error) {
          console.log(error)
          setAlertType('error')
          setAlert(true);
          setAlertContent('Error uploading file');
        }
    }
  }

  return (
      <>
        {alert ? <Collapse in={alert}><Alert severity={alertType} onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
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
        </Box>
      </>
  )
}