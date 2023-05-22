import { Box, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useEffect, useState } from "react";
// import useMediaQuery from '@mui/material';


//Icons
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import ContentCutOutlinedIcon from '@mui/icons-material/ContentCutOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useRouter } from "next/router";
import axios from "axios";
import formatNumber from "@/utils/functions/formatNumber";
import formatTime from "@/utils/functions/formatTime";

const useStyles = makeStyles((theme) => (
  {
    descriptionBox: {
      width: '93%',
    },
    title: {
      fontSize: 20,
      fontWeight: 500
    },
    channelDisplay: {
      borderRadius: '50%',
      cursor: 'pointer'
    },
    channelTitle: {
      fontSize: 15,
      fontWeight: 500
    },
    subscriberCount: {
      fontSize: 12
    },
    subscribe: {
      marginLeft: '24px !important',
      background: 'black',
      color: 'white',
      fontSize: 14,
      height: '36.44px',
      width: 100,
      borderRadius: '24px'
    },
    like: {
      height: '36.44px',
      borderRadius: '20px',
      background: 'rgba(184, 179, 179, 0.295)'
    },
    clip: {
      height: '36.44px',
      borderRadius: '20px',
      background: 'rgba(184, 179, 179, 0.295)',
      [theme.breakpoints.down('h')]: {
        display: 'none'
      },
      [theme.breakpoints.down('k')]: {
        display: 'flex'
      },
      [theme.breakpoints.down('j')]: {
        display: 'none'
      }
    },
    infoBox: {
      width: '97%',
      backgroundColor: 'rgba(184, 179, 179, 0.295)',
      padding: '12px 12px',
      borderRadius: '8px'
    }
  }
));

const Description = () => {
  const classes = useStyles();
  const router = useRouter();
  const belowBreakPointF = useMediaQuery((theme) => theme.breakpoints.down('f'));
  const belowBreakPointK = useMediaQuery((theme) => theme.breakpoints.down('k'));
  const aboveBreakPointI = useMediaQuery((theme) => theme.breakpoints.up('i'));

  const { v } = router.query;
  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const videoResponse = await axios.get('https://youtubebackend.azurewebsites.net/video', {
        params: {
          videoId: v
        }
      });

      const channelResponse = await axios.get('https://youtubebackend.azurewebsites.net/channel', {
        params: {
          channelId: videoResponse.data.items[0]?.snippet.channelId
        }
      });

      setVideo(videoResponse.data.items[0]);
      setChannel(channelResponse.data);
      return;
    }

    if (v) {
      getData();
    }
  }, [v])


  return (
    video && channel &&
    <Stack className={classes.descriptionBox} spacing={2} alignItems="start">
      <Typography className={classes.title}>{video.snippet.title}</Typography>
      <Stack sx={{ width: '100%' }} direction={(!belowBreakPointF && 'row') || (belowBreakPointK && aboveBreakPointI && 'row') || 'column'} spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="start">
          <Image
            className={classes.channelDisplay}
            alt="Channel Profile Picture"
            src={channel.snippet.thumbnails.high.url}
            width={40}
            height={40}
          />
          <Stack alignItems="start">
            <Typography className={classes.channelTitle}>{video.snippet.channelTitle}</Typography>
            <Typography className={classes.subscriberCount}>{formatNumber(channel.statistics.subscriberCount)} subscribers</Typography>
          </Stack>
          <button className={classes.subscribe}>Subscribe</button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <IconButton className={classes.like} >
            <ThumbUpOutlinedIcon sx={{ padding: '0px 8px', color: 'black', fontSize: '22px' }} />
            <Typography sx={{ borderRight: '1px solid grey', paddingRight: '8px', color: 'black', fontSize: '14px' }}>{formatNumber(video.statistics.likeCount)}</Typography>
            <ThumbDownOutlinedIcon sx={{ padding: '0px 8px', color: 'black', fontSize: '22px' }} />
          </IconButton>
          <IconButton className={classes.like}>
            <ReplyOutlinedIcon sx={{ padding: '0px 2px 0px 8px', color: 'black', fontSize: '22px' }} />
            <Typography sx={{ padding: '0px 8px 0px 2px', color: 'black', fontSize: '14px' }}>Share</Typography>
          </IconButton>
          <IconButton className={classes.clip}>
            <ContentCutOutlinedIcon sx={{ padding: '0px 2px 0px 8px', color: 'black', fontSize: '22px' }} />
            <Typography sx={{ padding: '0px 8px 0px 2px', color: 'black', fontSize: '14px' }}>Clip</Typography>
          </IconButton>
          <IconButton className={classes.like}>
            <MoreHorizOutlinedIcon sx={{ color: 'black', borderRadius: '50%', fontSize: '22px' }} />
          </IconButton>
        </Stack>
      </Stack>
      <Box className={classes.infoBox}>
        <Stack alignItems="start">
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{video.statistics.viewCount} views {formatTime(video.snippet.publishedAt)}</Typography>
          <Typography sx={{ fontSize: '14px' }}>{(showMore && video.snippet.description) || video.snippet.description.slice(0, 200)}</Typography>
          {!showMore && video.snippet.description.length > 200 && <button onClick={() => setShowMore(true)} style={{ color: 'black', border: 'none', fontWeight: 'bold' }}>Show more</button>}
          {showMore && <button onClick={() => setShowMore(false)} style={{ color: 'black', border: 'none', fontWeight: 'bold', marginTop: '20px' }}>Show less</button>}
        </Stack>
      </Box>
    </Stack>
  )
}



export default Description;