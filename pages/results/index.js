import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';
import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';

//Icons
import TuneIcon from '@mui/icons-material/Tune';
import VideoCard from '@/components/VideoCard';
import { useMainContext } from '@/context/createMainContext';


const useStyles = makeStyles((theme) => (
  {
    Box: {
      marginTop: '4px',
      display: 'flex',
      justifyContent: 'center',
      overflowY: 'hidden',
      [theme.breakpoints.down('g')]: {
        width: '100% !important'
      },
      [theme.breakpoints.down('d')]: {
        width: '95vw'
      },
    },
    InnerBox: {
      width: '90%',
      [theme.breakpoints.down('k')]: {
        width: '100%'
      }
    },
    divider: {
      margin: '4px 10px',
      border: '1px solid grey'
    },
    container: {
      margin: '8px 0px',
      padding: '0px 8px',
    },
    videoContainer: {
      height: 'calc(100vh - 130px)',
      width: '100%',
      marginTop: '16px',
      paddingLeft: '2px',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '5px',
        top: '0px',
        right: '0px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
      }
    }
  }
));

const Index = ({ loadedVideos, nextPageToken }) => {
  const classes = useStyles();
  const router = useRouter();
  const ref = useRef(null);

  const { search_query } = router.query;
  const { videos, handleVideos, setVideoToken, nextVideoPageToken, drawer } = useMainContext();
  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  useEffect(() => {
    handleVideos(loadedVideos);
    setVideoToken(nextPageToken);
  }, [loadedVideos]);

  const handleScroll = debounce(async () => {
    const { scrollTop, clientHeight, scrollHeight } = ref.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPageVideoResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
        params: {
          query: search_query,
          pageToken: nextVideoPageToken,
        }
      });
      handleVideos([...videos, ...nextPageVideoResponse.data.videos]);
      setVideoToken(nextPageVideoResponse.data.nextPageToken);
    }
  }, 1000);

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('scroll', handleScroll);
      }
    }
  });



  return (videos.length > 0 &&
    <Box className={classes.Box} sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)', }}>
      <Box className={classes.InnerBox}>
        <Stack>
          <Stack direction="row" alignItems="center">
            <IconButton>
              <TuneIcon />
            </IconButton>
            <Typography fontSize={14}>
              Filters
            </Typography>
          </Stack>
          <div className={classes.divider} />
          <Box ref={ref} className={classes.videoContainer}>
            <Stack className={classes.container} spacing={3}>
              {videos.map((video, index) => (
                <VideoCard
                  key={index}
                  type="searchCard"
                  thumbnail={video.items[0].snippet.thumbnails.maxres?.url || video.items[0].snippet.thumbnails.standard.url || video.items[0].snippet.thumbnails.medium?.url}
                  channelDisplay={video.items[0].snippet.thumbnails.standard.url}
                  title={video.items[0].snippet.title}
                  time={video.items[0].snippet.publishedAt}
                  channelTitle={video.items[0].snippet.channelTitle}
                  views={video.items[0].statistics.viewCount}
                  description={video.items[0].snippet.description}
                  videoId={video.items[0].id}
                  channelId={video.items[0].snippet.channelId}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { search_query } = context.query;

  let loadedVideos = [];
  let nextPageToken = null;

  try {
    const videosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        query: search_query
      }
    });
    loadedVideos = videosResponse.data.videos;
    nextPageToken = videosResponse.data.nextPageToken;

  } catch (error) {
    console.log(error.message);
  }
  return {
    props: { loadedVideos, nextPageToken },
  };
}

export default Index;