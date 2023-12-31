import axios from "axios";
import { useState, useEffect } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useMainContext } from "@/context/createMainContext";
import { Slider, Feed } from '../components/index';
import HandleTokenExpire from "@/utils/functions/handleTokenExpire";

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

const Home = ({ loadedVideos, loadedSubscriptions, loadedUser, nextPageToken, errorStatus }) => {
  const classes = useStyles();
  const { handleVideos, handleSubscriptions, handleUser, drawer, setVideoToken } = useMainContext();
  const [activeButton, setActiveButton] = useState('All');

  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  useEffect(() => {
    if (errorStatus === 'token expired') {
      HandleTokenExpire();
    }
    handleUser(loadedUser);
    handleVideos(loadedVideos);
    setVideoToken(nextPageToken);
    handleSubscriptions(loadedSubscriptions);
  }, [loadedVideos, loadedSubscriptions, loadedUser]);

  const handleClick = async (item) => {
    if (item === activeButton) return;

    const videosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        query: item === 'All' ? null : item,
      }
    });

    setActiveButton(item);
    handleVideos(videosResponse.data.videos);
    setVideoToken(videosResponse.data.nextPageToken);
  }

  return (

    <Stack
      className={classes.stack}
      alignItems="start"
      spacing={2}
      sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)', }}
    >
      <Slider active={activeButton} handleClick={handleClick} boxShadow='0px 0px 8px 30px white'
        height='85%' />
      <Feed activeButton={activeButton} />
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Stack>
  )
}

export async function getServerSideProps(context) {
  let loadedVideos = [];
  let nextPageToken = null;
  let loadedSubscriptions = null;
  let loadedUser = { name: '', email: '', picture: '' };
  let errorStatus = null;

  try {
    const videosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos');
    loadedVideos = videosResponse.data.videos;
    nextPageToken = videosResponse.data.nextPageToken;
  } catch (error) {
    loadedVideos = [];
  }

  if (context.req.cookies.token) {
    try {
      const response = await axios.get('https://youtubebackend.azurewebsites.net/subcriptions', {
        params: {
          token: context.req.cookies.token
        }
      });
      loadedSubscriptions = response.data.data;

      const userResponse = await axios.get('https://youtubebackend.azurewebsites.net/getUser', {
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
    props: { loadedVideos, loadedSubscriptions, loadedUser, nextPageToken, errorStatus, },
  };
}

export default Home;