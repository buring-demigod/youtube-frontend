
import React from 'react';
import { useRouter } from 'next/router';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { makeStyles } from "@mui/styles";

import formatTime from '@/utils/functions/formatTime';
import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    box: {
      width: 370,
      height: 500,
      padding: '14px 14px',
      [theme.breakpoints.down('md')]: {
        width: 180,
        height: 250
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      },
    },
    card: {
      border: 'none !important',
      boxShadow: 'none !important',
      cursor: 'pointer',
      height: '500px',
      backgroundColor: 'darkgray',
    },
    media: {
      width: 360,
      height: 275,
      objectFit: 'contain',
      [theme.breakpoints.down('md')]: {
        width: 180,
        height: 250
      }
    },
    content: {
      width: 360,
      fontWeight: 600,
      padding: '0px !important',
      marginTop: '24px'
    },
    itemCard: {
      border: 'none !important',
      boxShadow: 'none !important',
      display: 'flex',
      cursor: 'pointer',
    },
    itemMedia: {
      width: 160,
      height: 90,
      borderRadius: '8px'
    },
    itemContent: {
      width: 'calc(100% - 160px)',
      padding: '0px 0px 0px 8px !important'
    },
    videoWrapper: {
      height: 'calc(100vh - 105px)',
      marginTop: '35px',
      overflowY: 'scroll',
      overflowX: 'hidden',
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



const LeftContent = ({ thumbnail, title, videoId, handleClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} onClick={() => handleClick(videoId)}>
      <CardMedia
        className={classes.media}
        component="img"
        image={thumbnail}
      />
      <CardContent className={classes.content}>
        {title}
      </CardContent>
    </Card>
  );
}

const ItemCard = ({ thumbnail, title, time, channelTitle, videoId, handleClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.itemCard} onClick={() => handleClick(videoId)}>
      <CardMedia
        className={classes.itemMedia}
        component="img"
        image={thumbnail}
      />
      <CardContent className={classes.itemContent}>
        <Stack spacing={1} alignItems="start">
          <Typography>{title}</Typography>
          <Typography fontSize={12} color="gray">{channelTitle} .{formatTime(time)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

const Playlist = ({ videos }) => {
  const classes = useStyles();
  const router = useRouter();
  const { setDrawer } = useMainContext();

  const handleClick = (videoId) => {
    setDrawer(false);
    router.push({ pathname: '/watch', query: { v: videoId } })
  }

  return (
    <>
      <Box className={classes.box}>
        <LeftContent
          thumbnail={videos[0].snippet.thumbnails.high.url}
          title={videos[0].snippet.title}
          videoId={videos[0].snippet.resourceId.videoId}
          handleClick={handleClick}
        />
      </Box>
      <Box className={classes.videoWrapper} >
        <Stack spacing={2} alignItems="start">
          {videos.map((video, index) => {
            return (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <Typography fontSize={15} >{index + 1}</Typography>
                <ItemCard
                  key={index}
                  thumbnail={video.snippet.thumbnails.maxres?.url || video.snippet.thumbnails.high?.url || video.snippet.thumbnails.standard?.url || video.snippet.thumbnails.default?.url}
                  title={video.snippet.title}
                  time={video.snippet.publishedAt}
                  channelTitle={video.snippet.videoOwnerChannelTitle}
                  videoId={video.snippet.resourceId.videoId}
                  handleClick={handleClick}
                />
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </>
  )
}

export default Playlist;