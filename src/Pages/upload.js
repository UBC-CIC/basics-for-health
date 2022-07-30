import { useState } from 'react';
import { Button, Box, Stack, TextField } from "@mui/material";
import { UploadFile } from "@mui/icons-material";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file.name);
  }

  return (
      <>
        <Box 
            component='form'
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