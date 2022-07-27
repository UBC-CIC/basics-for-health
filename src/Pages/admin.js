import { Box, TextField, Stack, FormControlLabel, Checkbox, Button } from '@mui/material'
import { useState } from 'react'

function Admin() {
    const [text, setText] = useState('');
    const [errorText, setErrorText] = useState('');
    const [checked, setChecked] = useState(false);

    function isValidEmail(email) {
        let re = /\S+@\S+\.\S+/;
        return !(re.test(email));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (text === '') {
            setErrorText("Please enter email");
        } else if(isValidEmail(text)) {
            setErrorText('Please enter a valid email')
        } else {
            setErrorText('');
            if (checked) {
                console.log('done')
            }
        }
    };

    const checkChanged = () => {
        setChecked(!checked);
    };

    return (
        <Box 
            component='form'
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                marginTop: '3em',
                justifyContent: 'center'
            }}>
            <Stack spacing={2}>
                <h2>Authorize administrative privilages for another user</h2>
                <TextField
                    value={text}
                    label="Email"
                    onChange={(e) => {setText(e.target.value)}}
                    error={isValidEmail(text)}
                    helperText={errorText}
                    variant="standard" 
                />
                <FormControlLabel
                    control={<Checkbox checked={checked} onChange={checkChanged}/>}
                    label="I want this user to be an administrator"
                />
                <Box display="flex" justifyContent='flex-end'>
                    <Button type='submit' style={{width: 'fit-content'}}>Submit</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default Admin;