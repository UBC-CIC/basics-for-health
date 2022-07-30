import { useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Sidebar from './sidebar';
import { Auth } from 'aws-amplify';
import { useEffect } from "react";
import AdminStatus from "../adminStatus";

export default function Navbar() {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        welcomeUser();
        isAdmin();
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

    async function isAdmin() {
        // let user = await Auth.currentAuthenticatedUser();
        // let group = user.signInUserSession.accessToken.payload['cognito:groups'];
        // if (group === undefined) {
        //     setAdmin(false);
        // } else {
        //     if (group.includes('Admins')) {
        //         setAdmin(true);
        //     }
        // }
        // let adminStatus = await IsAdmin();
        setAdmin(await AdminStatus());
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