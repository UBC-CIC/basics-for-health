import { Collapse, Alert, Box, TextField, Grid, FormControlLabel, Checkbox, Button } from '@mui/material';
import { useState } from 'react';
import { Auth, API } from 'aws-amplify';

function Admin() {
  const [text, setText] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  async function addToGroup() { 
    let apiName = 'AdminQueries';
    let path = '/addUserToGroup';
    let myInit = {
      body: {
        "username" : text,
        "groupname": "Admins"
      }, 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
      } 
    }
    return await API.post(apiName, path, myInit).then(() => {
      setText('');
      setAlertContent('User is now an admin');
      setAlert(true);
    }).catch(() => {
      setFieldError(true);
      setErrorText('User does not exist');
    });
  }
    
  function handleSubmit(e) {
    e.preventDefault();
    if (text === '') {
      setFieldError(true);
      setErrorText("Please enter their username");
    } else {
      setFieldError(false);
      setErrorText('');
      if (checked) {
        addToGroup();
      }
    }
  };

  const checkChanged = () => {
    setChecked(!checked);
  };

  return (
    <>
      {alert ? <Collapse in={alert}><Alert severity='success' onClose={() => setAlert(false)}>{alertContent}</Alert></Collapse> : <></> }
      <Box component='form' onSubmit={handleSubmit}>
        <Grid 
          container
          marginTop='3em'
          justifyContent="center"
          alignItems="center"
          spacing={2}
          >
          <Grid item xs={12} align="center">
            <h2>Authorize administrative privileges for another user</h2>
          </Grid>
          <Grid item xs={11} sm={7} md={6} lg={4.7} align="center">
            <TextField
              fullWidth
              value={text}
              label="Username"
              onChange={(e) => {setText(e.target.value)}}
              error={fieldError}
              helperText={errorText}
              variant="standard"
              inputProps={{autoComplete: 'off'}}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={checkChanged}/>}
              label="I want this user to be an administrator"
            />
          </Grid>
          <Grid item xs={5} align="center">
            <Button type='submit'>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Admin;