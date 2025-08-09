import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  SwipeableDrawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { format } from 'date-fns';
import { useTheme } from '@mui/material/styles';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';

const Layout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItem = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color='secondary' />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create'
    }
  ];

  const drawerContent = (
    <Box>
      <Typography variant="h5" sx={{ m: 2 }}>
        Zeed Notes
      </Typography>
      <List>
        {menuItem.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false); // Close drawer on mobile
            }}
            sx={{
              background: location.pathname === item.path ? '#f4f4f4' : 'transparent',
              '&:hover': { background: '#f4f4f4' }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', background: '#f9f9f9', width: '100%' }}>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`
        }}
        elevation={1}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography sx={{fontSize: '1.2rem', fontWeight: 'bold', flexGrow: 1  }}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography sx={{ flexGrow: 1, textAlign: 'right' }}>
            ZEDDICUSS
          </Typography>
          <Avatar
            src="https://avatars.githubusercontent.com/u/102410648?v=4"
            alt="Zeddicus"
            sx={{ width: 30, height: 30, marginLeft: 2 }}
          />
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box'
            }
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <SwipeableDrawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box'
            }
          }}
        >
          {drawerContent}
        </SwipeableDrawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: 8, // offset for AppBar height
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
