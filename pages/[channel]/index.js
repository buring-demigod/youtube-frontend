import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { makeStyles } from "@mui/styles";

import { useMainContext } from '@/context/createMainContext';
import { Banner, ChannelContent, ChannelDetails } from '../../components/index'
import HandleTokenExpire from '@/utils/functions/handleTokenExpire';


const useStyles = makeStyles((theme) => (
  {
    entireBox: {
      height: 'calc(100vh - 80px)',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '5px',
        top: '0px',
        right: '0px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
      },
      [theme.breakpoints.down('g')]: {
        marginLeft: '0px !important'
      }
    },
    box: {
      overflow: 'hidden',
      width: '100%',
      height: 180,
      position: 'relative',
      [theme.breakpoints.down('d')]: {
        width: '95vw'
      },
    },
    channelbox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    },
    divider: {
      width: '100%',
      margin: '0px 0px 14px 0px !important',
      border: '1px solid gray',
      position: 'relative',
    },
    contentBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    }
  }
))

const Index = ({ loadedChannel, loadedChannelVideos, loadedPopularVideos, loadedPlaylists, loadedSubscriptions, loadedUser, errorStatus }) => {
  const classes = useStyles();
  const [channelInfo, setChannelInfo] = useState(loadedChannel);
  const [channelVideos, setChannelVideos] = useState(loadedChannelVideos);
  const [popularVideos, setPopularVideos] = useState(loadedPopularVideos);
  const [playlists, setPlaylists] = useState(loadedPlaylists);
  const [channelSet, setChannelSet] = useState('HOME');
  const { handleSubscriptions, handleUser, drawer } = useMainContext();

  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));
  const belowBreakPointG = useMediaQuery((theme) => theme.breakpoints.down('g'));

  useEffect(() => {
    if (errorStatus === 'token expired') {
      HandleTokenExpire();
    }
    handleUser(loadedUser);
    handleSubscriptions(loadedSubscriptions);

    setChannelInfo(loadedChannel);
    setChannelVideos(loadedChannelVideos);
    setPopularVideos(loadedPopularVideos);
    setPlaylists(loadedPlaylists);
  }, [loadedChannel, loadedChannelVideos, loadedPopularVideos, loadedPlaylists]);

  const handleSectionChange = (item) => {
    setChannelSet(item);
  }

  return (
    channelInfo &&
    <Box className={classes.entireBox}>
      <Stack spacing={2} alignItems="center" sx={{ width: belowBreakPointG ? '100vw' : belowBreakPointD ? 'calc(100vw - 120px)' : drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)' }}>
        {channelInfo.brandingSettings.image &&
          <Box
            className={classes.box}
            alignItems="start"
            spacing={2}
          >
            <Banner
              bannerImage={channelInfo.brandingSettings.image.bannerExternalUrl}
            />
          </Box>}
        <Box className={classes.channelbox}>
          <ChannelDetails
            image={channelInfo.snippet.thumbnails.high.url}
            title={channelInfo.snippet.title}
            subscribers={channelInfo.statistics.subscriberCount}
            videoCount={channelInfo.statistics.videoCount}
            description={channelInfo.snippet.description}
            active={channelSet}
            handleSectionChange={handleSectionChange}
          />
        </Box>
        <div className={classes.divider} />
        <Box className={classes.contentBox}>
          <ChannelContent recentVideos={channelVideos} popularVideos={popularVideos} playlists={playlists} />
        </Box>
      </Stack>
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { channel } = context.query;
  let loadedChannel = null;
  let loadedChannelVideos = [];
  let loadedPopularVideos = [];
  let loadedPlaylists = [];

  let loadedSubscriptions = null;
  let loadedUser = { name: '', email: '', picture: '' };
  let errorStatus = null;

  try {
    const channelResponse = await axios.get('https://youtubebackend.azurewebsites.net/channel', {
      params: {
        channelId: channel
      }
    });
    loadedChannel = channelResponse.data;

    const channelVideosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        channelId: channel,
        order: "date"
      }
    });

    loadedChannelVideos = channelVideosResponse.data.videos;

    const popularVideosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        channelId: channel,
        order: "viewCount"
      }
    });

    loadedPopularVideos = popularVideosResponse.data.videos;

    const playlistsResponse = await axios.get('https://youtubebackend.azurewebsites.net/playlist', {
      params: {
        channelId: channel
      }
    });

    loadedPlaylists = playlistsResponse.data;

  } catch (error) {
    console.log(error.message);
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
    props: { loadedChannel, loadedChannelVideos, loadedPopularVideos, loadedPlaylists, loadedSubscriptions, loadedUser, errorStatus },
  };
}

export default Index;