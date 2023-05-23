import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react';
import { makeStyles } from "@mui/styles";
import Image from 'next/image';

const useStyles = makeStyles((theme) => (
  {
    stack: {
      width: '90%',
      height: '180px',
    },
    button: {
      height: '30px',
      width: '90px',
      padding: '4px 8px',
      font: '14px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '14px',
      [theme.breakpoints.down('m')]: {
        width: '45px'
      }
    },
    subscribe: {
      color: 'white',
      backgroundColor: 'black',
    },
    join: {
      width: '60px',
      color: 'black',
      backgroundColor: 'white',
      border: '1px solid black',
      [theme.breakpoints.down('m')]: {
        width: '30px'
      }
    },
    sections: {
      padding: '12px 8px',
      fontSize: '14px',
      color: 'gray',
      width: '90px',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }
))

const ChannelDetails = ({ image, title, subscribers, videoCount, description, active, handleSectionChange }) => {
  const classes = useStyles();
  return (
    <Stack className={classes.stack} justifyContent="space-between">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          <Image
            src={image}
            height={128}
            width={128}
            style={{ borderRadius: '50%' }}
            alt='thumbnail'
          />
          <Stack spacing={0.5} alignItems="start" justifyContent="center">
            <Typography fontSize={24} fontWeight={400}>{title}</Typography>
            <Typography fontSize={11} color="gray">@{title} {subscribers} subscribers {videoCount}videos</Typography>
            <Typography fontSize={14} color="gray">{description.slice(0, 70)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} direction="row">
          <button className={`${classes.subscribe} ${classes.button}`}>Subscribe</button>
          <button className={`${classes.join} ${classes.button}`}>Join</button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={4} >
        {
          ['HOME', 'VIDEO', 'LIVE', 'PLAYLIST', 'CHANNELS', 'ABOUT'].map((item, index) => {
            return (
              <Typography key={index} className={classes.sections} sx={{ borderBottom: item === active && '1px solid gray', fontWeight: item === active && '500' }} onClick={() => handleSectionChange(item)}>
                {item}
              </Typography>
            )
          })
        }
      </Stack>
    </Stack>
  )
}

export default ChannelDetails