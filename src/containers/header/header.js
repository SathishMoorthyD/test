import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import HomeIcon from '@mui/icons-material/Home';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import RateReviewIcon from '@mui/icons-material/RateReview';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {AppRouter } from '../../app-router.js';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Header(props) {
   

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
const routerpath =[
  { title:'Home',icon:<HomeIcon /> ,path:'/dashboard'},  
  // { title:'CPP',icon:<InboxIcon /> ,path:'/cpp'},

  //   { title:'MenuB',icon:<CreditScoreIcon /> ,path:'/MenuB'},
  //   { title:'MenuC',icon:<InsertDriveFileIcon /> ,path:'/MenuC'},
  //   { title:'MenuD',icon:<RateReviewIcon /> ,path:'/MenuD'},
  //   { title:'MenuE',icon:<SettingsIcon /> ,path:'/MenuE'},
  //   { title:'UserMaster',icon:<PersonIcon /> ,path:'/UserMaster'},
  { title:'MenuE',icon:<SettingsIcon /> ,path:'/MenuE'},
  { title:'MenuD',icon:<RateReviewIcon /> ,path:'/MenuD'},  
  { title:'CPP',icon:<InboxIcon /> ,path:'/cpp'},       
  { title:'MenuC',icon:<InsertDriveFileIcon /> ,path:'/MenuC'},
  { title:'MenuB',icon:<CreditScoreIcon /> ,path:'/MenuB'},
  { title:'UserMaster',icon:<PersonIcon /> ,path:'/UserMaster'},
    
]
const handleRouter=(path)=>{
  console.log(path)
 
}
const handleLogout=()=>{
  handleClose();
  localStorage.clear();
  window.location.href = "/";
}
const [anchorEl, setAnchorEl] = React.useState(null);

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
    <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#f3f3f3' ,
          color:'black'
        }}
      > 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            IKYAM 
          </Typography>
          {localStorage.getItem('AccessToken') &&
          <div style={{justifyItems:'flex-end',alignItems:'flex-end'}}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
     <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routerpath.map((router, index) => (
              <a  href={router.path} style={{textDecoration:'none',color:'black'}} >
            <ListItem button key={index} onClick={()=>handleRouter(router.path)}>
               
              <ListItemIcon>
               {router.icon}
              </ListItemIcon>
              <ListItemText primary={router.title} />
             
            </ListItem>
          </a>
          ))}
        </List>
        
      </Drawer>
      <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >

        <Divider />
        <List>
          {routerpath.map((router, index) => (
              <a  href={router.path} style={{textDecoration:'none',color:'black'}} >
            <ListItem button key={index} onClick={()=>handleRouter(router.path)}>

              <ListItemIcon>
               {router.icon}
              </ListItemIcon>
              <ListItemText primary={router.title} />

            </ListItem>
          </a>
          ))}
        </List>

        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <AppRouter></AppRouter>
      </Box>
    </Box>
  
  );
}