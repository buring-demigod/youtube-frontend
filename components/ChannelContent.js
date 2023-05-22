import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Box, Stack, Typography } from '@mui/material';
import VideoCard from './VideoCard';

const useStyles = makeStyles((theme) => (
  {
    stack: {
      width: '90%',
    },
    left: {
      top: '40%',
      left: '-14px',
      cursor: 'pointer',
      alignItems: 'center',
      zIndex: 1,
      position: 'absolute',
      fontSize: '25px',
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      boxShadow: '-1px 3px 5px black',
    },
    right: {
      position: 'absolute',
      top: '40%',
      right: '-14px',
      fontSize: '25px',
      cursor: 'pointer',
      alignItems: 'center',
      zIndex: 1000,
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      boxShadow: '1px 3px 5px black',
    },
    divider: {
      width: '100%',
      margin: '18px 0px !important'
    }
  }
));

const VideoSlider = ({ items, type, videoLeftId, videoRightId }) => {
  const classes = useStyles();
  const sliderRef = useRef(null);
  const [scrollPosition, setscrollPosition] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const { scrollWidth, clientWidth } = slider;

    const leftEl = document.querySelector(`#${videoLeftId}`);
    const rightEl = document.querySelector(`#${videoRightId}`);

    if (leftEl && scrollPosition === 0) {
      leftEl.style.display = 'none';
    } else if (leftEl) {
      leftEl.style.display = 'flex';
      leftEl.style.justifyContent = 'center';
    }
    if (rightEl && clientWidth + scrollPosition >= scrollWidth) {
      rightEl.style.display = 'none';
    } else if (rightEl) {
      rightEl.style.display = 'flex';
      rightEl.style.justifyContent = 'center';
    }
  }, [scrollPosition]);


  const scrollRight = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: 200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition + 200);
  }

  const scrollLeft = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: -200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition - 200);
  }

  return (
    <Box ref={sliderRef} sx={{ width: '100%', overflow: 'hidden' }}>
      <Stack sx={{ width: 'fit-content' }} direction="row" spacing={1.5} alignItems="start">
        {items.map((video, index) => {
          return (
            <VideoCard
              key={index}
              type={type || "sliderVideoCard"}
              thumbnail={video.items[0].snippet.thumbnails.high.url}
              title={video.items[0].snippet.title}
              time={video.items[0].snippet.publishedAt}
              views={video.items[0].statistics.viewCount}
              videoId={video.items[0].id}
            />
          )
        })}
      </Stack>
      <div className={classes.left} id={videoLeftId} onClick={scrollLeft} >&lt;</div>
      <div className={classes.right} id={videoRightId} onClick={scrollRight} >&gt;</div>
    </Box>
  )
}


const PlaylistSlider = ({ items, videoLeftId, videoRightId }) => {
  const classes = useStyles();
  const sliderRef = useRef(null);
  const [scrollPosition, setscrollPosition] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const { scrollWidth, clientWidth } = slider;

    const leftEl = document.querySelector(`#${videoLeftId}`);
    const rightEl = document.querySelector(`#${videoRightId}`);

    if (leftEl && scrollPosition === 0) {
      leftEl.style.display = 'none';
    } else if (leftEl) {
      leftEl.style.display = 'flex';
      leftEl.style.justifyContent = 'center';
    }
    if (rightEl && clientWidth + scrollPosition >= scrollWidth) {
      rightEl.style.display = 'none';
    } else if (rightEl) {
      rightEl.style.display = 'flex';
      rightEl.style.justifyContent = 'center';
    }
  }, [scrollPosition]);


  const scrollRight = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: 200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition + 200);
  }

  const scrollLeft = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: -200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition - 200);
  }

  return (
    <Box ref={sliderRef} sx={{ width: '100%', overflow: 'hidden' }}>
      <Stack sx={{ width: 'fit-content' }} direction="row" spacing={1.5} alignItems="start">
        {items.map((video, index) => {
          return (
            <VideoCard
              key={index}
              type="playlistCard"
              thumbnail={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              itemCount={video.contentDetails.itemCount}
              videoId={video.id}
            />
          )
        })}
      </Stack>
      <div className={classes.left} id={videoLeftId} onClick={scrollLeft} >&lt;</div>
      <div className={classes.right} id={videoRightId} onClick={scrollRight} >&gt;</div>
    </Box>
  )
}

const ChannelContent = ({ recentVideos, popularVideos, playlists }) => {
  const classes = useStyles();
  console.log(popularVideos);

  return (
    <Stack className={classes.stack}>
      {recentVideos.length > 0 &&
        <>
          <Stack spacing={2} alignItems="start" sx={{ position: 'relative' }}>

            <Typography fontSize={16} fontWeight={500}>Videos</Typography>
            <VideoSlider items={recentVideos} videoLeftId="vLeft" videoRightId="vRight" />

          </Stack>
        </>
      }
      {popularVideos.length > 0 &&
        <>
          <div className={classes.divider} />
          <Stack spacing={2} alignItems="start" sx={{ position: 'relative' }}>
            <Typography fontSize={16} fontWeight={500}>Popular Videos</Typography>
            <VideoSlider items={popularVideos} videoLeftId="pvLeft" videoRightId="pvRight" />

          </Stack>
        </>
      }
      {playlists.length > 0 &&
        <>
          <div className={classes.divider} />
          <Stack spacing={2} alignItems="start" sx={{ position: 'relative' }}>
            <Typography fontSize={16} fontWeight={500}>Playlist</Typography>
            <PlaylistSlider items={playlists} videoLeftId="plLeft" videoRightId="plRight" />
          </Stack>
        </>
      }
    </Stack>
  );
}

export default ChannelContent


