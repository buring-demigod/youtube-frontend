import axios from 'axios';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { VideoCard, Slider, Comments } from './index'
import { useMainContext } from '@/context/createMainContext';


const useStyle = makeStyles((theme) => (
  {
    box: {
      width: '402px',
      [theme.breakpoints.down('k')]: {
        width: '94vw',
        paddingLeft: '28px'
      },
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '20px'
      },
      [theme.breakpoints.down('m')]: {
        paddingLeft: '16px'
      },
      [theme.breakpoints.down('l')]: {
        paddingLeft: '14px'
      }
    }
  }
));


const Recommended = () => {
  const classes = useStyle();
  const [activeButton, setActiveButton] = useState('All');
  const { videos, handleVideos, setVideoToken } = useMainContext();

  const handleClick = async (item) => {
    if (item === activeButton) return;
    const videosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        query: item === 'All' ? null : item,
      }
    });

    setActiveButton(item);
    setVideoToken(videosResponse.data.nextPageToken);
    handleVideos(videosResponse.data.videos);
  }

  return (
    videos.length > 0 &&
    <Box className={classes.box}>
      <Stack spacing={1} alignItems="start">
        <Slider active={activeButton} handleClick={handleClick} boxShadow='0px 0px 8px 20px white'
          height='70%' />
        {videos.map((video, index) =>

          <VideoCard
            key={index}
            type="relatedCard"
            thumbnail={video.items[0].snippet.thumbnails.high.url}
            channelDisplay={video.items[0].snippet.thumbnails.high.url}
            title={video.items[0].snippet.title}
            time={video.items[0].snippet.publishedAt}
            channelTitle={video.items[0].snippet.channelTitle}
            views={video.items[0].statistics.viewCount}
            description={video.items[0].snippet.description}
            videoId={video.items[0].id}
          />
        )}
      </Stack>
    </Box>
  )
}

export default Recommended