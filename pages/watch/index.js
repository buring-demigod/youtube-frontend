import { makeStyles } from '@mui/styles';
import { Box, Stack, useMediaQuery } from '@mui/material';
import Player from '@/components/Player';
import Recommended from '@/components/Recommended';
import getVideo from '@/utils/functions/getVideo';
import getComments from '@/utils/functions/getComments';
import { useMainContext } from '@/context/createMainContext';
import { useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => (
  {
    box: {
      padding: '8px 0px 8px 14px',
      margin: '16px 0px',
      height: 'calc(100vh - 92px)',
      width: '99%',
      overflowY: 'scroll',
      '&::-webkit-scrollbar': {
        width: 10,
        height: 3,
        top: 0,
        right: 0
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
      }
    },
  }
))

const Index = ({ loadedVideos, loadedComments }) => {
  const classes = useStyles();
  const aboveBreakPointK = useMediaQuery((theme) => theme.breakpoints.up('k'));
  const { handleVideos, handleComments } = useMainContext();

  useEffect(() => {
    handleVideos(loadedVideos);
    handleComments(loadedComments);
  }, [loadedVideos, loadedComments])

  return (
    <Box className={classes.box}>
      <Stack direction={(aboveBreakPointK && 'row') || 'column'} spacing={2}>
        <Player />
        <Recommended />
      </Stack>
    </Box>
  )
}

export async function getServerSideProps(context) {
  const { v } = context.query;

  let loadedVideos = [];
  let loadedComments = [];

  try {
    const videosResponse = await axios.get('http://localhost:3001/videos', {
      params: {
        videoId: v
      }
    });
    loadedVideos = videosResponse.data;
  } catch (error) {
    loadedVideos = [];
  }

  try {
    const response = await axios.get('http://localhost:3001/comments', {
      params: {
        videoId: v
      }
    });
    loadedComments = response.data.items;
  } catch (error) {
    loadedComments = [];
  }

  return {
    props: { loadedVideos, loadedComments },
  };
}

export default Index;