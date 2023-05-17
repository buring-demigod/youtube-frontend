import { IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

import SortIcon from '@mui/icons-material/Sort';
import Image from 'next/image';
import CommentCard from './CommentCard';
import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    commentContainer: {
      padding: '0px 4px',
      width: '100%',
    },
    yourComment: {
      width: '93%',
      height: 25,
      border: 'none',
      borderBottom: '1px solid gray',
      '&:focus': {
        outline: 'none',
      }
    },
    profilePicture: {
      borderRadius: '50%'
    }
  }
))

const Comments = () => {
  const classes = useStyles();
  const { comments } = useMainContext();

  const belowBreakPointK = useMediaQuery((theme) => theme.breakpoints.down('k'));

  return (
    comments.length > 0 &&
    <Stack spacing={2} alignItems="start" sx={{ width: '93%', marginTop: belowBreakPointK && '22px' }}>
      <Stack direction="row" spacing={3} alignItems="center" >
        <Typography sx={{ fontSize: 15, fontWeight: 400 }}>47293 Comments</Typography>
        <Stack direction='row' spacing={1} alignItems="center">
          <IconButton>
            <SortIcon sx={{ color: 'black' }} />
          </IconButton>
          <Typography sx={{ fontSize: 15, fontWeight: 400 }}>Sort By</Typography>
        </Stack>
      </Stack>
      <Stack className={classes.commentContainer} spacing={2} alignItems="center">
        <Stack direction="row" spacing={2} alignItems="start" sx={{ width: '100%' }} >
          <Image
            className={classes.profilePicture}
            alt="profile picture"
            src={comments[0].snippet.topLevelComment.snippet.authorProfileImageUrl}
            width={40}
            height={40}
          />
          <input className={classes.yourComment} placeholder='Add a comment' />
        </Stack>
        {comments.map((comment, index) =>
          <CommentCard
            key={index}
            profilePicture={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
            userName={comment.snippet.topLevelComment.snippet.authorDisplayName}
            content={comment.snippet.topLevelComment.snippet.textDisplay}
            likeCount={comment.snippet.topLevelComment.snippet.likeCount}
            time="6 days ago"
          />
        )}
      </Stack>
    </Stack>
  )
}

export default Comments