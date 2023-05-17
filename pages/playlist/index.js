import Drawer from '@/components/Drawer';
import { useMainContext } from '@/context/createMainContext';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import Playlist from '@/components/Playlist';
import HandleTokenExpire from '@/utils/functions/handleTokenExpire';

const useStyles = makeStyles((theme) => (
  {
    stack: {
      overflow: 'hidden',
      [theme.breakpoints.down('d')]: {
        width: '95vw'
      },
    }
  }
));

const Index = ({ loadedPlaylistVideos, loadedUser, loadedSubscriptions, errorStatus }) => {
  const classes = useStyles();
  const [playlist, setPlaylist] = useState(loadedPlaylistVideos);

  const { drawer, handleUser, handleSubscriptions } = useMainContext();
  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));


  useEffect(() => {
    if (errorStatus === 'token expired') {
      HandleTokenExpire();
    }
    handleUser(loadedUser);
    handleSubscriptions(loadedSubscriptions);

  }, [loadedSubscriptions, loadedUser]);

  return (
    <Stack
      className={classes.stack}
      direction="row"
      alignItems="start"
      spacing={2}
      sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)', }}
    >
      {playlist.length > 0 && <Playlist videos={playlist} />}
      {/* {loadedUser.name === '' && <Typography>need to sign in first</Typography>} */}
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Stack>
  )
}

export async function getServerSideProps(context) {
  const { list } = context.query;
  let loadedPlaylistVideos = [];
  let loadedSubscriptions = null;
  let loadedUser = { name: '', email: '', picture: '' };
  let errorStatus = null;

  try {
    const videosResponse = await axios.get('http://localhost:3001/playlistvideos', {
      params: {
        id: list,
        token: context.req.cookies.token
      }
    });
    loadedPlaylistVideos = videosResponse.data;
  } catch (error) {
    errorStatus = error.response.data.error;
  }

  if (context.req.cookies.token) {
    try {
      const response = await axios.get('http://localhost:3001/subcriptions', {
        params: {
          token: context.req.cookies.token
        }
      });
      loadedSubscriptions = response.data.data;

      const userResponse = await axios.get('http://localhost:3001/getUser', {
        params: {
          token: context.req.cookies.token
        }
      });
      loadedUser = userResponse.data;
    } catch (error) {
      errorStatus = error.response.data.error;
    }
  }

  return {
    props: { loadedPlaylistVideos, loadedUser, loadedSubscriptions, errorStatus },
  };
}

export default Index;