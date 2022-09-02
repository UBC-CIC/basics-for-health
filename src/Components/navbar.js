import { useState } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import Sidebar from './sidebar';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import AdminStatus from "../Helpers/adminStatus";

export default function Navbar() {
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

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
        navigate("/");
        window.location.reload();
    }

    async function isAdmin() {
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