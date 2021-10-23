import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 240;

const NavBar = () => {
    return (
        <Drawer
        sx={{
            position: "fixed",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Speakers', 'About Project'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText sx={{color: '#696969'}} primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    );
};

export default NavBar;