import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Box, Stack, useMediaQuery } from '@mui/material';
import { debounce } from 'lodash';

import { Player, Recommended } from '../../components/index';
import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    box: {
      padding: '8px 0px 8px 14px',
      margin: '16px 0px !important',
      height: 'calc(100vh - 92px)',
      width: '99%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      '&::-webkit-scrollbar': {
        width: 10,
        height: 3,
        top: 0,
        right: 0
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
      },
      [theme.breakpoints.down('i')]: {
        padding: '0px'
      }
    },
  }
));

const Index = ({ loadedVideos, nextPageToken, loadedComments, nextCPageToken }) => {
  const classes = useStyles();
  const router = useRouter();
  const { v } = router.query;
  const ref = useRef(null);
  const { videos, handleVideos, setVideoToken, nextVideoPageToken, comments, handleComments, setCommentToken, nextCommentPageToken, setDrawer, drawer } = useMainContext();

  const aboveBreakPointK = useMediaQuery((theme) => theme.breakpoints.up('k'));

  useEffect(() => {
    setDrawer(false);
    handleVideos(loadedVideos);
    setVideoToken(nextPageToken);
    handleComments(loadedComments);
    setCommentToken(nextCPageToken);
  }, [loadedVideos, loadedComments]);

  const handleScroll = debounce(async () => {
    const { scrollTop, clientHeight, scrollHeight } = ref.current;
    if (scrollTop + clientHeight >= scrollHeight * 0.5) {
      const nextPageVideoResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
        params: {
          videoId: v,
          pageToken: nextVideoPageToken,
        }
      });

      const nextPageCommentsResponse = await axios.get('https://youtubebackend.azurewebsites.net/comments', {
        params: {
          videoId: v,
          pageToken: nextCommentPageToken,
        }
      });
      handleVideos([...videos, ...nextPageVideoResponse.data.videos]);
      setVideoToken(nextPageVideoResponse.data.nextPageToken);
      handleComments([...comments, ...nextPageCommentsResponse.data.items]);
      setCommentToken(nextPageCommentsResponse.data.nextPageToken);
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

  return (
    <Box ref={ref} className={classes.box}>
      <Stack direction={(aboveBreakPointK && 'row') || 'column'} spacing={2}>
        <Player />
        <Recommended />
      </Stack>
      {
        drawer &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { v } = context.query;

  let loadedVideos = [];
  let nextPageToken = null;
  let loadedComments = [];
  let nextCPageToken = null;

  try {
    const videosResponse = await axios.get('https://youtubebackend.azurewebsites.net/videos', {
      params: {
        videoId: v
      }
    });
    loadedVideos = videosResponse.data.videos;
    nextPageToken = videosResponse.data.nextPageToken || null;
  } catch (error) {
    loadedVideos = [];
  }

  try {
    const response = await axios.get('https://youtubebackend.azurewebsites.net/comments', {
      params: {
        videoId: v
      }
    });
    loadedComments = response.data.items;
    nextCPageToken = response.data.nextPageToken || null;
  } catch (error) {
    loadedComments = [];
  }

  return {
    props: { loadedVideos, nextPageToken, loadedComments, nextCPageToken },
  };
}

export default Index;