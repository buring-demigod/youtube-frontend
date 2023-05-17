import { Stack, useMediaQuery } from "@mui/material";
import Slider from "@/components/Slider";
import Drawer from '@/components/Drawer';
import Feed from "@/components/Feed";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useMainContext } from "@/context/createMainContext";
import { useEffect } from "react";
import axios from "axios";
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
))

const Home = ({ loadedVideos, loadedSubscriptions, loadedUser, errorStatus }) => {
  const classes = useStyles();
  const [activeButton, setActiveButton] = useState('All');
  const { handleVideos, handleSubscriptions, handleUser, drawer } = useMainContext();
  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  useEffect(() => {
    if (errorStatus === 'token expired') {
      HandleTokenExpire();
    }
    handleUser(loadedUser);
    handleVideos(loadedVideos);
    handleSubscriptions(loadedSubscriptions);

  }, [loadedVideos, loadedSubscriptions, loadedUser]);

  const handleClick = async (item) => {
    if (item === activeButton) return;
    const videosResponse = await axios.get('http://localhost:3001/videos', {
      params: {
        query: item === 'All' ? null : item,
      }
    });
    loadedVideos = videosResponse.data;
    setActiveButton(item);
    handleVideos(loadedVideos);
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
      <Feed />
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Stack>
  )
}

export async function getServerSideProps(context) {
  let loadedVideos = [];
  let loadedSubscriptions = null;
  let loadedUser = { name: '', email: '', picture: '' };
  let errorStatus = null;

  try {
    const videosResponse = await axios.get('http://localhost:3001/videos');
    loadedVideos = videosResponse.data;
  } catch (error) {
    loadedVideos = [];
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
    props: { loadedVideos, loadedSubscriptions, loadedUser, errorStatus },
  };
}

export default Home;