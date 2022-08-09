import { useState } from 'react';
import { Collapse, Alert, Button, Box, Stack, TextField } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { Storage } from 'aws-amplify';

export default function Upload() {
  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState('');
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  async function handleChange(e) {
    const f = e.target.files[0];
    setSelectedFile(f.name);
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Storage.put(file.name, file, {
        level: "protected",
        contentType: "application/json"
      })
      .then(resp => {
        if (resp.key === file.name) {
          setAlert(true);
          setAlertContent('File uploaded successfully');
        }
      })
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
      <>
        {alert ? <Collapse in={alert}><Alert severity='success' onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
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
                    label="Practitioner Username"
                    variant="outlined" 
                    size="small"
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