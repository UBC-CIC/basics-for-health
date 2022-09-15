import { useState } from 'react';
import { Drawer, List, ListItemText, Box, IconButton, ListItem } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  return (
    <>
      <IconButton color="inherit" sx={{ mr: 2 }} onClick={() => setIsOpen(true)}>
        <Menu />
      </IconButton>
      <Drawer open={isOpen} anchor="left" onClose={() => setIsOpen(false)}>
        <Box width='15rem' role='presentation' onClick={() => setIsOpen(false)}>
          <List disablePadding>
            <ListItem button onClick={() => navigate('/upload')}>
              <ListItemText primary="Upload a form" />
            </ListItem>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemText primary="Fill out a form" />
            </ListItem>
            <ListItem button onClick={() => navigate('/admin')}>
              <ListItemText primary="Add an admin user" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}