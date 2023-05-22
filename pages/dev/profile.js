import { useMainContext } from '@/context/createMainContext';
import { Box, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles((theme) => (
  {
    box: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px !important'
    },
    stack: {
      width: '800px'
    },
    main: {
      fontSize: '28px',
      fontWeight: '900'
    }
  }
));

const profile = () => {
  const classes = useStyles();
  const { drawer } = useMainContext();
  const belowBreakPointD = useMediaQuery((theme) => theme.breakpoints.down('d'));

  const handleGithubClick = () => {
    window.open('https://github.com/buring-demigod', '_blank')
  }

  const handleLinkedinClick = () => {
    window.open('https://www.linkedin.com/in/mohdfaiz1612/', '_blank');
  }

  return (
    <Box className={classes.box} sx={{ width: drawer ? 'calc(100vw - 270px)' : 'calc(100vw - 120px)' }}>
      <Stack className={classes.stack} spacing={4} alignItems="center">
        <Typography className={classes.main}>Software Engineer</Typography>
        <Stack direction="row" alignItems="start" spacing={6} sx={{ width: '100%' }}>
          <Stack spacing={1} sx={{ width: 'calc((100% / 3))' }}>
            <Typography fontSize={15} fontWeight={500}>About me</Typography>
            <Typography fontSize={13} component="ul" sx={{ listStyleType: 'disc', pl: 2 }}>
              <li>My name is Mohammed Faiz Khan.</li>
              <li>I am a software engineer specializing in the MERN stack, with a strong passion for backend development.</li>
              <li>I enjoy working with technologies such as Node.js, Express.js, MongoDB, and React, leveraging their power to create efficient and performant solutions.</li>
              <li>I am constantly seeking opportunities to expand my knowledge and stay up-to-date with the latest trends and best practices in backend development.</li>
            </Typography>
          </Stack>
          <Image
            src='/profile.jpg'
            width={200}
            height={200}
            alt='picture'
            style={{ borderRadius: '50%' }}
          />
          <Stack spacing={1} alignItems="start">
            <Typography fontSize={15} fontWeight={500}>Check out</Typography>
            <IconButton onClick={handleGithubClick}><GitHubIcon /></IconButton>
            <IconButton onClick={handleLinkedinClick}><LinkedInIcon /></IconButton>
            <a href='/Online.pdf' download style={{ textDecoration: 'none' }}>Download resume</a>
          </Stack>
        </Stack>

      </Stack>
      {
        drawer && belowBreakPointD &&
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: '0px', left: '0px', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }} />
      }
    </Box>
  );
}
export default profile