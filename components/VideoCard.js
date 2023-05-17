import { Card, CardContent, CardMedia, Icon, Stack, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Image from "next/image";
import { useRouter } from "next/router";
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

const useStyles = makeStyles((theme) => (
  {
    homecard: {
      height: 320,
      width: 'calc((100% - 48px) / 3)',
      border: 'none',
      boxShadow: 'none',
      margin: '4px 8px',
      [theme.breakpoints.down('d')]: {
        width: 'calc((100% - 48px) / 3)',
        height: 300
      },
      [theme.breakpoints.down('f')]: {
        width: 360,
      },
      [theme.breakpoints.down('g')]: {
        margin: '8px 4px 8px 0px'
      },
      [theme.breakpoints.down('md')]: {
        width: 'calc((100% - 48px) / 2)',
      },
      [theme.breakpoints.down('i')]: {
        width: 360
      },
    },
    homemedia: {
      height: 200,
      borderRadius: 12,
    },
    homecontent: {
      padding: '16px 0px 0px 0px'
    },
    homeimage: {
      borderRadius: '50%'
    },
    hometitle: {
      fontWeight: '500'
    },
    searchcard: {
      height: 250,
      width: '100%',
      display: 'flex',
      border: 'none',
      boxShadow: 'none',
      [theme.breakpoints.down('md')]: {
        height: '225px'
      },
      [theme.breakpoints.down('i')]: {
        height: '200px'
      },
      [theme.breakpoints.down('sm')]: {
        height: '150px'
      }
    },
    searchmedia: {
      borderRadius: 12,
      height: "225px",
      width: "400px",
      [theme.breakpoints.down('md')]: {
        width: '350px',
        height: '200px'
      },
      [theme.breakpoints.down('i')]: {
        width: '300px',
        height: '175px'
      },
      [theme.breakpoints.down('sm')]: {
        width: '225px',
        height: '125px'
      }
    },
    searchcontent: {
      marginLeft: '12px',
      padding: '0px',
      width: 'calc(100% - 412px)',
      [theme.breakpoints.down('md')]: {
        width: 'calc(100% - 362px)'
      },
      [theme.breakpoints.down('i')]: {
        width: 'calc(100% - 312px)'
      },
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 267px)'
      }
    },
    searchimage: {
      borderRadius: '50%',
    },
    relatedCard: {
      width: 'calc(100% - 4px)',
      height: 94,
      margin: '24px 0px 0px 4px !important',
      [theme.breakpoints.down('k')]: {
        margin: '24px 0px 0px 0px !important'
      },
      display: 'flex',
      border: 'none',
      boxShadow: 'none',
    },
    relatedMedia: {
      borderRadius: 12,
      height: 94,
      width: 168
    },
    relatedContent: {
      width: 'calc(100% - 176px)',
      padding: '0px !important',
      margin: '0px 0px 0px 8px'
    },
    relatedImage: {
      borderRadius: '50%',
    },
    sliderVideoCard: {
      width: 210,
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer'
    },
    sliderVideoMedia: {
      width: 210,
      height: 118,
      borderRadius: '4px'
    },
    sliderVideoContent: {
      padding: '0px !important',

    },
    playlistCard: {
      width: 210,
      border: 'none',
      boxShadow: 'none',
      position: 'relative',
      cursor: 'pointer'
    },
    playlistMedia: {
      width: 210,
      height: 118,
      borderRadius: '4px'
    },
    playlistContent: {
      padding: '0px !important',
    },
    numberItems: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      width: '45%',
      height: '118px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
  }
));


const PlaylistCard = ({ thumbnail, title, videoId, itemCount, handleClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.playlistCard} onClick={() => handleClick(videoId)} >
      <CardMedia
        component="img"
        className={classes.playlistMedia}
        image={thumbnail}
        title={title}
      />
      <CardContent className={classes.playlistContent} >
        <Stack spacing={0.5} alignItems='start'>
          <Stack sx={{ width: '100%' }}>
            <Typography fontSize={13} fontWeight={500} >{title.slice(0, 60)}</Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} direction="row" spacing={1} alignItems="start">
            <Typography fontSize={11} sx={{ color: 'gray' }} >view full playlist </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <div className={classes.numberItems}>
        <Typography>{itemCount}</Typography>
        <Icon sx={{ width: 40, height: 40 }}><PlaylistPlayIcon fontSize="30" /></Icon>
      </div>
    </Card>
  );
}

const SliderVideoCard = ({ thumbnail, title, views, videoId, handleClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.sliderVideoCard} onClick={() => handleClick(videoId)} >
      <CardMedia
        component="img"
        className={classes.sliderVideoMedia}
        image={thumbnail}
        title={title}
      />
      <CardContent className={classes.sliderVideoContent} >
        <Stack spacing={0.5} alignItems='start'>
          <Stack sx={{ width: '100%' }}>
            <Typography fontSize={13} fontWeight={500} >{title.slice(0, 40)}</Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} direction="row" spacing={1} alignItems="start">
            <Typography fontSize={11} sx={{ color: 'gray' }} >{views} views</Typography>
            <Typography fontSize={11} sx={{ color: 'gray' }} >6 days ago</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

const RelatedCard = ({ thumbnail, title, channelTitle, views, videoId, handleClick }) => {
  const classes = useStyles();
  const belowBreakPointK = useMediaQuery((theme) => theme.breakpoints.down('k'));

  return (
    <Card className={classes.relatedCard} onClick={() => handleClick(videoId)} >
      <CardMedia
        component="img"
        className={classes.relatedMedia}
        image={thumbnail}
        title={title}
      />
      <CardContent className={classes.relatedContent} >
        <Stack spacing={1} alignItems='start'>
          <Stack sx={{ width: '100%' }}>
            <Typography fontSize={13} fontWeight={500} >{(belowBreakPointK && title.slice(0, 80)) || title.slice(0, 50)}{(belowBreakPointK && title.length >= 77 && '...') || title.length >= 47 && '...'}</Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} alignItems="start">
            <Typography fontSize={12} sx={{ color: 'gray' }} >{channelTitle}</Typography>
            <Typography fontSize={12} sx={{ color: 'gray' }} >{views} .  6 days ago</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}


const SearchCard = ({ thumbnail, channelDisplay, title, description, channelTitle, views, videoId, handleClick }) => {
  const classes = useStyles();
  const belowBreakPointI = useMediaQuery((theme) => theme.breakpoints.down('i'));

  return (
    <Card className={classes.searchcard} onClick={() => handleClick(videoId)} >
      <CardMedia
        component="img"
        className={classes.searchmedia}
        image={thumbnail}
        title={title}
      />
      <CardContent className={classes.searchcontent} >
        <Stack spacing={2} alignItems='start'>
          <Stack sx={{ width: '100%' }}>
            <Typography fontSize={18} >{(belowBreakPointI && title.slice(0, 30)) || title.slice(0, 57)}{title.length >= 30 && '...'}</Typography>
            <Typography fontSize={12} sx={{ color: 'gray' }} >{views} .  6 days ago</Typography>
          </Stack>
          <Stack sx={{ width: '100%' }} direction="row" alignItems="center">
            <Image
              src={channelDisplay}
              className={classes.searchimage}
              alt='channel profile picture'
              width={30}
              height={30}
            />
            <Typography fontSize={12} sx={{ color: 'gray', paddingLeft: '8px' }} >{channelTitle}</Typography>
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Typography fontSize={11} sx={{ wordWrap: 'break-word' }}>{(belowBreakPointI && description.slice(0, 90)) || description.slice(0, 150)}{description.length > 90 && '...'}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

const GetHomeCard = ({ thumbnail, channelDisplay, title, channelTitle, views, videoId, handleClick }) => {
  const classes = useStyles();

  return (
    <Card className={classes.homecard} onClick={() => handleClick(videoId)}>
      <CardMedia
        className={classes.homemedia}
        image={thumbnail}
        title="green iguana"
      />
      <CardContent className={classes.homecontent} >
        <Stack direction='row' spacing={2} alignItems='flex-start'>
          <Image
            src={channelDisplay}
            className={classes.homeimage}
            alt='channel profile picture'
            width={45}
            height={45}
          />
          <Stack alignItems='start'>
            <Typography fontSize={15} fontWeight='500'>{title.slice(0, 44)}{title.length >= 47 && '...'}</Typography>
            <Typography fontSize={13} sx={{ color: 'gray' }} >{channelTitle}</Typography>
            <Typography fontSize={13} sx={{ color: 'gray' }} >{views} .  6 days ago</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}


const VideoCard = ({ type, thumbnail, channelDisplay, title, itemCount, channelTitle, views, videoId, description }) => {
  const router = useRouter();

  const handleClick = (videoId) => {
    router.push({ pathname: '/watch', query: { v: videoId } })
  }

  const handlePlaylistClick = (id) => {
    router.push({ pathname: '/playlist', query: { list: id } });
  }

  switch (type) {
    case 'searchCard':
      return (
        <SearchCard
          thumbnail={thumbnail}
          channelDisplay={channelDisplay}
          title={title}
          channelTitle={channelTitle}
          views={views}
          description={description}
          videoId={videoId}
          handleClick={handleClick}
        />
      )
      break;
    case 'relatedCard':
      return (
        <RelatedCard
          thumbnail={thumbnail}
          channelDisplay={channelDisplay}
          title={title}
          channelTitle={channelTitle}
          views={views}
          description={description}
          videoId={videoId}
          handleClick={handleClick}
        />
      )
      break;
    case "sliderVideoCard":
      return (
        <SliderVideoCard
          thumbnail={thumbnail}
          title={title}
          views={views}
          videoId={videoId}
          handleClick={handleClick}
        />
      )
      break;
    case "playlistCard":
      return (
        <PlaylistCard
          thumbnail={thumbnail}
          title={title}
          itemCount={itemCount}
          videoId={videoId}
          handleClick={handlePlaylistClick}
        />
      )
      break;
    default:
      return (
        <GetHomeCard
          thumbnail={thumbnail}
          channelDisplay={channelDisplay}
          title={title}
          channelTitle={channelTitle}
          views={views}
          videoId={videoId}
          handleClick={handleClick}
        />
      );
  }
}

export default VideoCard;