import { IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { makeStyles } from '@mui/styles';

//Icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

const useStyles = makeStyles((theme) => (
  {
    comment: {
      width: '93%',
    },
    profilePicture: {
      borderRadius: '50%'
    }
  }
))

const CommentCard = ({ profilePicture, userName, content, likeCount, time }) => {
  const classes = useStyles();

  return (
    <Stack direction="row" spacing={2} alignItems="start" sx={{ width: '100%' }} >
      <Image
        className={classes.profilePicture}
        alt="profile picture"
        src={profilePicture}
        width={40}
        height={40}
      />
      <Stack className={classes.comment} spacing={1} alignItems="start">
        <Stack direction="row" spacing={1} alignItems="baseline">
          <Typography fontSize={13} fontWeight={500}>{userName} </Typography>
          <Typography fontSize={11} color='gray'>{time}</Typography>
        </Stack>

        <Typography fontSize={13}>{content}</Typography>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Stack direction="row" alignItems="center">
            <IconButton sx={{ padding: 0 }}>
              <ThumbUpOffAltIcon sx={{ color: 'black', fontSize: 24 }} />
            </IconButton>
            <Typography fontSize={13} sx={{ paddingLeft: '6px' }}>{likeCount}</Typography>
          </Stack>
          <IconButton sx={{ padding: 0 }}>
            <ThumbDownOffAltIcon sx={{ color: 'black', fontSize: 24 }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CommentCard;