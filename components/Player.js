import { IconButton, Stack, useMediaQuery } from "@mui/material"
import ReactPlayer from "react-player"

//Icons
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Description from "./Description";
import Comments from "./Comments";



const useStyles = makeStyles((theme) => (
  {
    videoStack: {
      width: '66vw',
      alignItems: 'center',
      [theme.breakpoints.down('k')]: {
        width: '97vw'
      }
    },
    controlContainer: {
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      color: 'white'
    },
    playerBox: {
      height: '500px',
      width: '93%',
      position: 'relative',
      [theme.breakpoints.down('f')]: {
        height: '400px'
      },
      [theme.breakpoints.down('k')]: {
        width: '92%'
      },
      [theme.breakpoints.down('j')]: {
        height: '350px'
      }
    },
    pauseIcon: {
      color: 'white',
      fontSize: '40px'
    },
    volumeIcon: {
      color: 'white',
      fontSize: '35px'
    }
  }
));

const Player = () => {
  const classes = useStyles();
  const router = useRouter();

  const { v } = router.query;
  const aboveBreakPointK = useMediaQuery((theme) => theme.breakpoints.up('k'));

  const [play, setPlay] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <Stack className={classes.videoStack} spacing={2}>
      <div className={classes.playerBox} >
        {hasWindow &&
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${v}`}
            playing={play}
            muted={mute}
            controls={false}
            config={{
              youtube: {
                playerVars: { rel: 0, modestbranding: 1 }
              }
            }}
            height='100%'
            width='100%'
            onPause={() => setPlay(false)}
            onPlay={() => setPlay(true)}
          >
          </ReactPlayer>
        }
        <Stack className={classes.controlContainer}>
          <Stack direction="row" spacing={2} alignItems="center">
            {play &&
              <IconButton onClick={() => setPlay(false)}>
                <PauseIcon className={classes.pauseIcon} />
              </IconButton>
            }
            {
              !play &&
              <IconButton onClick={() => setPlay(true)}>
                <PlayArrowIcon className={classes.pauseIcon} />
              </IconButton>
            }
            {
              !mute &&
              <IconButton onClick={() => setMute(true)}>
                <VolumeUpIcon className={classes.volumeIcon} />
              </IconButton>
            }
            {
              mute &&
              <IconButton onClick={() => setMute(false)}>
                <VolumeOffIcon className={classes.volumeIcon} />
              </IconButton>
            }
          </Stack>
        </Stack>
      </div>
      <Description />
      {aboveBreakPointK && <Comments />}
    </Stack>
  )
}

export default Player;