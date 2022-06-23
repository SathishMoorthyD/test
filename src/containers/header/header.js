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
import ikyamlogo from '../../ikyam_as_logo.png';
import { logout } from '../../services/login/login.service.js';
import { useNavigate } from 'react-router-dom';
import { ListItemButton } from '@mui/material';


const drawerWidth = 200;

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
  const [urlSelected, setUrlSelected] = React.useState(sessionStorage.getItem("urlSelected"));
  const [role, setRole] = React.useState(localStorage.getItem("Role"));
  const [open, setOpen] = React.useState(false);
  //const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
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
  { title:'Home',icon:<HomeIcon /> ,path:'/dashboard', show:'userapprover'},  
  // { title:'CPP',icon:<InboxIcon /> ,path:'/cpp'},

  //   { title:'MenuB',icon:<CreditScoreIcon /> ,path:'/MenuB'},
  //   { title:'MenuC',icon:<InsertDriveFileIcon /> ,path:'/MenuC'},
  //   { title:'MenuD',icon:<RateReviewIcon /> ,path:'/MenuD'},
  //   { title:'MenuE',icon:<SettingsIcon /> ,path:'/MenuE'},
  //   { title:'UserMaster',icon:<PersonIcon /> ,path:'/UserMaster'},
  { title:'MenuE',icon:<InsertDriveFileIcon /> ,path:'/MenuE', show:'userapprover'},
  { title:'MenuD',icon:<InsertDriveFileIcon /> ,path:'/MenuD', show:'userapprover'},  
  { title:'CPP',icon:<InsertDriveFileIcon /> ,path:'/MenuA', show:'userapprover'},       
  { title:'MenuC',icon:<InsertDriveFileIcon /> ,path:'/MenuC', show:'userapprover'},
  { title:'MenuB',icon:<InsertDriveFileIcon /> ,path:'/MenuB', show:'userapprover'},
  { title:'UserMaster',icon:<PersonIcon /> ,path:'/UserMaster', show:'admin'},
    
]
const handleRouter=(i)=>{
  //alert (i);
  sessionStorage.setItem("urlSelected", i);
}

const handleLogout=()=>{
  handleClose();
  
  const responseData = logout(localStorage.getItem("UserId"));
  //console.log("header logout ", responseData);
  responseData.then(function(val){
  //console.log("header logout then", val);
  alert(val.data);
  if (val.status === 200)
  {
    localStorage.clear();
    window.location.href = "/";
  }
  })
}

const [anchorEl, setAnchorEl] = React.useState(null);

const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

// if (localStorage.getItem('AccessToken') === null || localStorage.getItem('AccessToken') === 'undefined')
// {
//   return (<AppRouter></AppRouter>);  
// }
// else
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {(localStorage.getItem('AccessToken') === null || localStorage.getItem('AccessToken') === 'undefined')?false: true &&
      <div>
      <AppBar
        position="fixed"
        open={mobileOpen}
        sx={{
          //width: { sm: `calc(100% - ${drawerWidth}px)` },
          //ml: { sm: `${drawerWidth}px` },
          background: '#f3f3f3' ,
          color:'black',
        }}
      > 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ...( mobileOpen &&  { display: 'none' })}}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            IKYAM 
          </Typography> */}
          {<img src={ikyamlogo} height="58px" hidden={mobileOpen}/>}
          <div class="col-8">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{float:"right"}}
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
            </div>
        </Toolbar>
      </AppBar>
      
      {/* <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"> */}
     {/* <Drawer
          container={container}
          variant="persistent"
          anchor='left'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          // ModalProps={{
          //   keepMounted: true, // Better open performance on mobile.
          // }}
          sx={{
            //display: { xs: 'block', sm: 'none' },
            width: { sm: drawerWidth }, flexShrink: { sm: 0 },
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
        
      </Drawer> */}
      <Drawer
          container={container}
          variant="persistent"
          anchor='left'
          onClose={handleDrawerToggle}
          sx={{
            //display: { xs: 'none', sm: 'block' }, 
            width: { sm: drawerWidth }, flexShrink: { sm: 3 },
            '& .MuiDrawer-paper': { boxSizing: 'content-box', width: drawerWidth }
          }}
          open={mobileOpen}
        >
        <DrawerHeader>
        {mobileOpen && <img src={ikyamlogo} class="ml-5" height="38px"/>}
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
        >
          {routerpath.map((router, index) => (
              <a href={router.path} style={{color:'grey'}} >
                {(router.show.indexOf(role) !== -1) && 
            <ListItemButton
              sx={{
                  "&.Mui-selected": {marginLeft:1,
                  backgroundColor: "#aedada", borderRadius: 2,
                  maxWidth:'85%', color:'green'
                  }}} 
              selected={index === Number(sessionStorage.getItem("urlSelected"))} 
              button key={index} onClick={()=>handleRouter(index)}>
              <ListItemIcon class="p-2 mr-2">
               {router.icon}
              </ListItemIcon>
              <ListItemText class="mr-1" primary={<Typography style={{ fontSize:'15px'}}>{router.title}</Typography>}/>
            </ListItemButton>}
          </a>
          ))}
        </List>
        </Drawer>
      {/* </Box> */}
      </div>}
      <Box
        component="main"
        //sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        sx={{ flexGrow: 1, p: 3 }}
        open={open}
       >
        <Toolbar />
        <AppRouter></AppRouter>
      </Box>
    </Box>
  </div>
  );
}