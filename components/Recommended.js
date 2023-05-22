import { Box, Stack, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from './Slider';
import { makeStyles } from '@mui/styles';
import VideoCard from './VideoCard';
import Comments from './Comments';
import { useMainContext } from '@/context/createMainContext';
import axios from 'axios';

const useStyle = makeStyles((theme) => (
  {
    box: {
      width: '402px',
      [theme.breakpoints.down('k')]: {
        width: '94vw',
        paddingLeft: '28px'
      }

    }
  }
));


const Recommended = () => {
  const classes = useStyle();
  const belowBreakPointK = useMediaQuery((theme) => theme.breakpoints.down('k'));
  const { videos, handleVideos, setVideoToken } = useMainContext();
  const [activeButton, setActiveButton] = useState('All');

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
      {belowBreakPointK && <Comments />}
    </Box>
  )
}

export default Recommended