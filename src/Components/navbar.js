import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Sidebar from './sidebar';
import { Auth } from 'aws-amplify';
import { useEffect, useState } from "react";

export default function Navbar() {
    const [admin, setAdmin] = useState(true);

    useEffect(() => {
        welcomeUser();
    })

    async function welcomeUser() {
        let user = await Auth.currentAuthenticatedUser();
        let container = document.getElementById('headText');
        container.innerHTML = 'Welcome, ' + user.username + '!';
    }

    async function signOut() {
        await Auth.signOut();
        window.location.reload();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                { admin ? <Sidebar /> : null}
                <Typography id="headText" style={{ flex: 1 }}></Typography>
                <Button onClick={signOut} variant="outlined" color="inherit">Sign out</Button>
            </Toolbar>
        </AppBar>
    )
}