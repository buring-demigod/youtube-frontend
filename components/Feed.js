import React from 'react';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';
import { makeStyles } from '@mui/styles';
import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    container: {
      padding: '0px 30px 0px 36px',
      height: 'calc(100vh - 114px)',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '5px',
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

const Feed = () => {
  const classes = useStyles();
  const { videos } = useMainContext();
  return (videos.length > 0 &&
    <Box className={classes.container}>
      <Stack className={classes.videoContainer} direction="row" flexWrap="wrap" alignItems="center" >
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            type="homeCard"
            thumbnail={video.items[0].snippet.thumbnails.medium.url}
            channelDisplay={video.items[0].snippet.thumbnails.default.url}
            title={video.items[0].snippet.title}
            channelTitle={video.items[0].snippet.channelTitle}
            views={video.items[0].statistics.viewCount}
            videoId={video.items[0].id}
          />
        ))}
      </Stack>
    </Box>
  )
}



export default Feed;