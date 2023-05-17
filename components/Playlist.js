import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React from 'react';
import { makeStyles } from "@mui/styles";
import VideoCard from './VideoCard';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => (
  {
    box: {
      width: 370,
      height: 500,
      padding: '14px 14px',
    },
    card: {
      border: 'none !important',
      boxShadow: 'none !important',
      cursor: 'pointer',
      height: '500px',
      backgroundColor: 'darkgray'
    },
    media: {
      width: 360,
      height: 275,
      objectFit: 'contain'
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
      '&::-webkit-scrollbar': {
        width: '5px',
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

const ItemCard = ({ thumbnail, title, views, channelTitle, videoId, handleClick }) => {
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
          <Typography fontSize={12} color="gray">{channelTitle}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

const Playlist = ({ videos }) => {
  const classes = useStyles();
  const router = useRouter();

  const handleClick = (videoId) => {
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
                <Typography fontSize={15} >{index}</Typography>
                <ItemCard
                  key={index}
                  thumbnail={video.snippet.thumbnails.high.url}
                  title={video.snippet.title}
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