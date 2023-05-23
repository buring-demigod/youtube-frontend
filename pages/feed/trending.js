import { Box, Card, CardContent, CardMedia, Stack, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    stack: {
      overflow: 'hidden',
      [theme.breakpoints.down('d')]: {
        width: '95vw'
      },
    },
    image: {
      borderRadius: '50%'
    },
    sliderItem: {
      padding: '8px 18px',
      fontSize: '14px',
      cursor: 'pointer'
    },
    divider: {
      width: '100%',
      margin: '0px !important',
      border: '1px solid gray'
    },
    card: {
      height: '150px',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: 'none',
      boxShadow: 'none !important',
      cursor: 'pointer'
    },
    cardMedia: {
      height: '138px',
      width: '246px',
      borderRadius: '14px',
      [theme.breakpoints.down('m')]: {
        height: '120px',
        width: '170px',
      }
    },
    content: {
      width: 'calc(100% - 500px)',
      padding: '0px 12px !important',
      [theme.breakpoints.down('k')]: {
        width: '100%'
      }
    },
    videoWrapper: {
      height: 'calc(100vh - 223px)',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: '10px',
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

const Videos = ({ video }) => {
  const classes = useStyles();
  const router = useRouter();
  const belowBreakPointSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const belowBreakPointm = useMediaQuery((theme) => theme.breakpoints.down('m'));

  const handleClick = (id) => {
    router.push({ pathname: '/watch', query: { v: id } });
  }

  return (
    <Card className={classes.card} onClick={() => handleClick(video.id)}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        image={video.snippet.thumbnails.high.url}
      />
      <CardContent className={classes.content}>
        <Stack spacing={1} alignItems="start">
          <Typography fontSize={(belowBreakPointm && 15) || 18}>{video.snippet.title.slice(0, 60)}</Typography>
          <Typography fontSize={12} color="gray">{video.snippet.channelTitle}  {video.statistics.viewCount}  6days ago</Typography>
          <Typography fontSize={12} color="gray">{(belowBreakPointm && video.snippet.description.slice(0, 50)) || (belowBreakPointSm && video.snippet.description.slice(0, 80)) || video.snippet.description.slice(0, 150)}</Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

const Trending = ({ loadedVideos, loadedSubscriptions, loadedUser, errorStatus }) => {
  const classes = useStyles();
  const [selected, setSelected] = useState("MUSIC");
  const [videos, setVideos] = useState(loadedVideos);
  const { handleSubscriptions, handleUser, drawer } = useMainContext();
  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  useEffect(() => {
    handleUser(loadedUser);
    handleSubscriptions(loadedSubscriptions);
    setSelected('MUSIC');

  }, [loadedUser, loadedSubscriptions]);

  const handleChange = async (item) => {
    const id = item === 'MUSIC' ? 10 : item === 'GAMING' ? 20 : 1;

    const videosResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${id}&key=AIzaSyCGt-gmiy6bnlHcrG8c7huvU1KxP5b-Nug`);
    setVideos(videosResponse.data.items);
    setSelected(item);
  }

  return (
    <Stack
      className={classes.stack}
      alignItems="start"
      spacing={2}
      sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)', }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ height: '80px' }}>
        <Image
          src='/trending-icon-3.jpg'
          className={classes.image}
          width={80}
          height={80}
          alt="trending"
        />
        <Typography fontSize={24}>Trending</Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="start">
        {["MUSIC", "GAMING", "MOVIES"].map((item, index) => {
          return (
            <Typography
              key={index}
              className={classes.sliderItem}
              sx={{ fontWeight: selected === item && '600', borderBottom: selected === item && '2px solid gray' }}
              onClick={() => handleChange(item)}
            >
              {item}
            </Typography>
          )
        })}
      </Stack>
      <div className={classes.divider} />
      <Box className={classes.videoWrapper}>
        <Stack spacing={2} alignItems="start">
          {videos.map((video, index) => <Videos key={index} video={video} />)}
        </Stack>
      </Box>
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
    const videosResponse = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=10&key=AIzaSyCGt-gmiy6bnlHcrG8c7huvU1KxP5b-Nug');
    loadedVideos = videosResponse.data.items;
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
      errorStatus = error.response.data.message;
    }
  }

  return {
    props: { loadedVideos, loadedSubscriptions, loadedUser, errorStatus },
  };
}

export default Trending;