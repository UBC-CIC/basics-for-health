import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Auth } from 'aws-amplify';
import { useEffect } from "react";

export default function Navbar() {
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
                <Typography id="headText" style={{ flex: 1 }}></Typography>
                <div>
                    <Button onClick={signOut} variant="outlined" color="inherit">Sign out</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}