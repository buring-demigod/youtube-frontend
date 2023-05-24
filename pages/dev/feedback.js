import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useMainContext } from '@/context/createMainContext';

const useStyles = makeStyles((theme) => (
  {
    box: {
      display: 'flex',
      justifyContent: 'center',
      [theme.breakpoints.down('m')]: {
        marginLeft: '62px'
      }
    },
    stack: {
      width: '400px',
      height: '400px'
    },
    input: {
      fontSize: '14px',
      backgroundColor: 'rgba(184, 179, 179, 0.295)',
      borderRadius: '20px',
      color: 'black',
      marginTop: '10px',
      padding: '10px',
      '&::placeholder': {
        fontSize: '13px',
        color: 'black'
      },
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      padding: '4px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      backgroundColor: 'white'
    }
  }
));

const Feedback = ({ loadedUser, errorStatus }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const { user, handleUser, drawer } = useMainContext();

  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  useEffect(() => {
    handleUser(loadedUser);
  }, [loadedUser])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === '') {
      alert('form should contain atleast one character');
      return;
    }

    try {
      const response = await axios.post('https://youtubebackend.azurewebsites.net/feedback', {
        feedback: text,
        email: user.email
      });
      alert('feedback sent');
    } catch (error) {
      alert('some error occuered');
    }
  }

  return (

    <Box className={classes.box} sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)' }}>
      {user.name !== '' &&
        <Stack className={classes.stack} spacing={2} alignItems="center">
          <Typography fontSize={25} fontWeight={700}>Feedback Form</Typography>
          <form className={classes.form}>
            <label htmlFor="feedback" style={{ fontWeight: '500' }}>Message</label>
            <textarea name='feedback' value={text} onChange={(e) => setText(e.target.value)} className={classes.input} placeholder='write your feedback here' cols="40" rows="10" />
          </form>
          <button className={classes.button} onClick={handleSubmit}>Submit</button>
        </Stack>
      }
      {user.name === '' && <div>need to sign in first to give feedback</div>}
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Box>
  )
}

export async function getServerSideProps(context) {
  let loadedUser = { name: '', email: '', picture: '' };
  let errorStatus = null;

  if (context.req.cookies.token) {
    try {
      const userResponse = await axios.get('https://youtubebackend.azurewebsites.net/getUser', {
        params: {
          token: context.req.cookies.token
        }
      });
      loadedUser = userResponse.data;
    } catch (error) {
      errorStatus = error.response.data.error;
    }
  }

  return {
    props: { loadedUser, errorStatus },
  };
}
export default Feedback;