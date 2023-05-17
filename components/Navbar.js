import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';

//Icons 
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { AppBar, Box, Stack, Toolbar, IconButton, Typography, Icon, useMediaQuery } from '@mui/material'
import { useMainContext } from '@/context/createMainContext';
import Image from 'next/image';

//CSS Styles 
const useStyles =
  makeStyles((theme) => ({
    appbar: {
      backgroundColor: 'white',
      color: 'black',
      boxShadow: 'none',
      height: '70px',
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'start'
    },
    toolbar: {
      padding: '0px 14px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    searchbar: {
      height: '38px',
      padding: '0px 0px 0px 12px',
      border: '1px solid rgba(184, 179, 179, 0.295)',
      borderRight: 'none',
      borderRadius: '30px 0px 0px 30px',
      width: '500px',
      '&:focus': {
        outline: 'none',
      },
      '&::placeholder': {
        color: 'rgba(48, 46, 46, 0.295)',
        fontSize: '14px',
      },
      [theme.breakpoints.down('f')]: {
        width: 400,
      },
      [theme.breakpoints.down('md')]: {
        width: 300,
      },
      [theme.breakpoints.down('g')]: {
        width: 200,
      },
      [theme.breakpoints.down('i')]: {
        display: 'none',
      },
    },
    searchwrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    searchbutton: {
      height: '40px',
      padding: '0px 16px 0px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid rgba(184, 179, 179, 0.295)',
      borderRadius: '0px 30px 30px 0px',
      background: 'rgba(184, 179, 179, 0.295)',
      [theme.breakpoints.down('i')]: {
        border: 'none',
        borderRadius: '50%',
        background: 'white'
      }
    },
    smBox: {
      height: 40,
    },
    smInput: {
      height: '38px',
      padding: '0px 0px 0px 12px',
      border: '1px solid rgba(184, 179, 179, 0.295)',
      borderRight: 'none',
      borderRadius: '30px 0px 0px 30px',
      width: '300px',
      '&:focus': {
        outline: 'none',
      },
      '&::placeholder': {
        color: 'rgba(48, 46, 46, 0.295)',
        fontSize: '14px',
      }
    },
    smIcon: {
      height: '40px',
      padding: '0px 16px 0px 20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid rgba(184, 179, 179, 0.295)',
      borderRadius: '0px 30px 30px 0px',
      background: 'rgba(184, 179, 179, 0.295)',
    }
  }));


const NavMain = () => {
  const router = useRouter();
  const { handleDrawer } = useMainContext();
  return (
    <Stack direction="row" spacing={0.8} alignItems="center">
      <IconButton onClick={handleDrawer}>
        <MenuIcon sx={{ fontSize: '28px', color: 'black' }} />
      </IconButton>
      <IconButton onClick={() => router.push('/')}>
        <YouTubeIcon sx={{ fontSize: '40px', color: 'red' }} />
        <Typography variant="h6">Youtube</Typography>
      </IconButton>
    </Stack>
  );
}

const NavSearch = ({ inputStyles, IconStyles, handleOpen }) => {

  const [searchValue, setSearchValue] = useState('');
  const belowBreakPointI = useMediaQuery((theme) => theme.breakpoints.down('i'));
  const router = useRouter();
  const { handleVideos } = useMainContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVideos([]);
    router.push({
      pathname: '/results',
      query: { search_query: searchValue }
    });
  }

  const classes = useStyles();
  return (
    <Stack direction="row" spacing={0.8} alignItems="center" >
      <div className={classes.searchwrapper} >
        <form onSubmit={handleSubmit}>
          <input
            placeholder='Search'
            className={inputStyles || classes.searchbar}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
        <IconButton
          className={IconStyles || classes.searchbutton}
          onClick={(belowBreakPointI && handleOpen) || handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <IconButton >
        <MicIcon sx={{ color: 'black' }} />
      </IconButton>
    </Stack>
  );
}

const NavEnd = () => {
  const classes = useStyles();
  const { user, handleSignUp } = useMainContext();

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <IconButton>
        <VideoCallIcon sx={{ color: 'black' }} />
      </IconButton>
      <IconButton>
        <NotificationsNoneIcon sx={{ color: 'black' }} />
      </IconButton>
      {(user.name !== '' && <Image src={user.picture} width={30} height={30} alt="user profile" style={{ borderRadius: '50%' }} />) || <button onClick={handleSignUp} >sign up</button>}
    </Stack>
  )
}

const SmNavSearch = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <Box className={classes.smBox}>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton onClick={handleClose}>
          <ArrowBackIcon />
        </IconButton>
        <NavSearch inputStyles={classes.smInput} IconStyles={classes.smIcon} />
      </Stack>
    </Box>
  )
}

const Navbar = ({ client }) => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(true);
  const belowBreakPointI = useMediaQuery((theme) => theme.breakpoints.down('i'));

  const handleClose = () => {
    setSearchOpen(false);
  }

  const handleOpen = () => {
    setSearchOpen(true);
  }

  return (
    <AppBar className={classes.appbar} >
      <Toolbar className={classes.toolbar}>
        {searchOpen && belowBreakPointI && <SmNavSearch handleClose={handleClose} />}
        {(!searchOpen || !belowBreakPointI) &&
          <>
            <NavMain />
            <NavSearch handleOpen={handleOpen} />
            <NavEnd />
          </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;