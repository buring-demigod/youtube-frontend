import React, { useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';
import { makeStyles } from '@mui/styles';
import { useMainContext } from '@/context/createMainContext';
import axios from 'axios';
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => (
  {
    container: {
      padding: '0px 30px 0px 36px',
      height: 'calc(100vh - 114px)',
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
      },
      [theme.breakpoints.down('g')]: {
        padding: '0px 0px'
      }
    },
    videoContainer: {
      [theme.breakpoints.down('f')]: {
        justifyContent: 'center'
      },
    }
  }
));

const Feed = ({ activeButton }) => {
  const classes = useStyles();
  const ref = useRef(null);
  const { videos, handleVideos, setVideoToken, nextVideoPageToken } = useMainContext();

  const handleScroll = debounce(async () => {
    const { scrollTop, clientHeight, scrollHeight } = ref.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPageVideoResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
        params: {
          pageToken: nextVideoPageToken,
          query: activeButton === 'All' ? null : activeButton,
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
    <Box ref={ref} className={classes.container}>
      <Stack className={classes.videoContainer} direction="row" flexWrap="wrap" alignItems="center" >
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            type="homeCard"
            thumbnail={video.items[0].snippet.thumbnails.medium.url}
            channelDisplay={video.items[0].snippet.thumbnails.default.url}
            title={video.items[0].snippet.title}
            time={video.items[0].snippet.publishedAt}
            channelTitle={video.items[0].snippet.channelTitle}
            views={video.items[0].statistics.viewCount}
            videoId={video.items[0].id}
            channelId={video.items[0].snippet.channelId}
          />
        ))}
      </Stack>
    </Box>
  )
}



export default Feed;