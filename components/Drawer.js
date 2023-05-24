
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Box, Icon, Stack, Typography, useMediaQuery } from '@mui/material';

//Icons
import {
  HomeIcon, SubscriptionsIcon, VideoLibraryIcon, HistoryOutlinedIcon, SlideshowOutlinedIcon, WatchLaterOutlinedIcon, ThumbUpOutlinedIcon, WhatshotOutlinedIcon, LocalMallOutlinedIcon, MusicNoteOutlinedIcon, MovieOutlinedIcon, SettingsInputAntennaOutlinedIcon, SportsEsportsOutlinedIcon, NewspaperOutlinedIcon, EmojiEventsOutlinedIcon, LightbulbOutlinedIcon, CheckroomOutlinedIcon, SettingsOutlinedIcon, OutlinedFlagRoundedIcon, HelpOutlineOutlinedIcon, AnnouncementOutlinedIcon, HomeOutlinedIcon, VideoLibraryOutlinedIcon, SubscriptionsOutlinedIcon, WatchLaterIcon, ThumbUpIcon, WhatshotIcon, LocalMallIcon, MusicNoteIcon, MovieIcon, SettingsInputAntennaIcon, SportsEsportsIcon, NewspaperIcon, EmojiEventsIcon, LightbulbIcon, CheckroomIcon, PersonOutlinedIcon, FlagIcon, HelpIcon, AnnouncementIcon, PersonIcon, FacebookIcon, FacebookOutlinedIcon
} from '../public/icons';

const useStyles = makeStyles((theme) => (
  {
    box: {
      padding: '0px 8px 0px 14px',
      position: 'relative',
      width: '200px',
      overflowY: 'hidden',
      '&:hover': {
        overflowY: 'scroll',
      },
      maxHeight: 'calc(100vh - 64px)',
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '5px',
        top: '0px',
        right: '0px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray',
        borderRadius: '5px',
      },
      [theme.breakpoints.down('d')]: {
        display: 'none',
        position: 'absolute',
        zIndex: '3',
        backgroundColor: 'white'
      },
    },
    smallBox: {
      marginLeft: '0 !important',
      padding: '0px 0px',
      [theme.breakpoints.down('g')]: {
        display: 'none',
      }
    },
    icons: {
      padding: '8px 8px',
    },
    divider: {
      width: '200px',
      margin: '10px 0px',
      borderTop: '1px solid gray'
    },
    p: {
      padding: '0px 8px',
      userSelect: 'none'
    },
    stack: {
      borderRadius: '14px',
      cursor: 'pointer',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: 'rgba(184, 179, 179, 0.295)'
      }
    }
  }
));

const SidebarContent = ({ items, direction, spacing, typographyFont, contentSpacing, stackWidth }) => {
  const classes = useStyles();
  const router = useRouter();
  const { drawerActive, setDrawer, handleDrawerActive } = useMainContext();

  return (
    <Stack spacing={spacing || 0.2} alignItems="start" sx={{ marginLeft: '2px' }}>
      {items.map((item) => (
        <Stack
          className={classes.stack}
          key={item.name}
          direction={direction || 'row'}
          spacing={contentSpacing || 2.5}
          alignItems="center"
          sx={{ backgroundColor: drawerActive === item.name ? 'rgba(184, 179, 179, 0.295)' : 'white', width: stackWidth || '190px' }}
          onClick={() => {
            handleDrawerActive(item.name);
            setDrawer(false);
            router.push(`${item.targetPath}`);
          }
          }
        >
          <Icon className={classes.icons}>
            {drawerActive === item.name ? item.activeIcon : item.icon}
          </Icon>
          <Typography sx={{ fontSize: typographyFont || '15px', fontWeight: drawerActive === item.name ? '500' : '400' }}>
            {item.name}
          </Typography>
        </Stack>
      )
      )}
    </Stack>
  )
}

const SubscriptionContent = () => {
  const classes = useStyles();
  const router = useRouter();
  const { drawerActive, setDrawer, handleDrawerActive, subscriptions } = useMainContext();

  return (
    <Stack spacing={0.8} alignItems="start" sx={{ marginLeft: '2px' }}>
      {subscriptions.map((item, index) => (
        <Stack
          className={classes.stack}
          key={index} direction='row'
          spacing={2.5}
          alignItems="center"
          sx={{ backgroundColor: drawerActive === item.snippet.title ? 'rgba(184, 179, 179, 0.295)' : 'white', width: '190px' }} onClick={() => {
            handleDrawerActive(item.snippet.title);
            setDrawer(false);
            router.push({ pathname: `/${item.snippet.resourceId.channelId}` });
          }}
        >
          <Image
            src={item.snippet.thumbnails.high.url}
            width={30}
            height={30}
            style={{ borderRadius: '50%', padding: '8px 0px 8px 8px' }}
            alt="channel picture"
          />
          <Typography sx={{ fontSize: '14px', fontWeight: drawerActive === item.snippet.title ? '500' : '400' }}>
            {item.snippet.title}
          </Typography>
        </Stack>
      )
      )}
    </Stack>
  )
}

const Drawer = () => {
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname;
  const { subscriptions, drawer } = useMainContext();

  const aboveBreakPointD = useMediaQuery((theme) => theme.breakpoints.up('d'));

  return (
    <>
      <Box
        className={classes.box}
        id="drawer"
        sx={{ display: drawer ? 'block !important' : 'none !important', position: path === '/watch' && 'absolute !important', zIndex: path === '/watch' && '3 !important', backgroundColor: path === '/watch' && 'white', }}>

        <SidebarContent
          items={[
            { name: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon />, targetPath: '/' },
            { name: 'Shorts', icon: <VideoLibraryOutlinedIcon />, activeIcon: <VideoLibraryIcon />, targetPath: '/shorts' },
            { name: 'Subscription', icon: <SubscriptionsOutlinedIcon />, activeIcon: <SubscriptionsIcon />, targetPath: '/feed/subscriptions' }
          ]}
        />

        <p className={classes.divider} />

        <SidebarContent
          items={[
            { name: 'Library', icon: <VideoLibraryOutlinedIcon />, activeIcon: <VideoLibraryIcon />, targetPath: '/playlist?list=LL' },
            { name: 'History', icon: <HistoryOutlinedIcon />, activeIcon: <HistoryOutlinedIcon />, targetPath: '/feed/history' },
            { name: 'Your videos', icon: <SlideshowOutlinedIcon />, activeIcon: <SlideshowOutlinedIcon /> },
            { name: 'Watch later', icon: <WatchLaterOutlinedIcon />, activeIcon: <WatchLaterIcon /> },
            { name: 'Liked videos', icon: <ThumbUpOutlinedIcon />, activeIcon: <ThumbUpIcon />, targetPath: '/playlist?list=LL' }
          ]}
        />

        {subscriptions &&
          <>
            <p className={classes.divider} />

            <Stack spacing={0.2} alignItems="start" sx={{ marginLeft: '2px' }}>
              <p className={classes.p}>Subscriptions</p>
              <SubscriptionContent />
            </Stack>
          </>
        }

        <p className={classes.divider} />

        <Stack spacing={0.2} alignItems="start" sx={{ marginLeft: '2px' }}>
          <p className={classes.p}>Explore</p>
          <SidebarContent
            items={[
              { name: 'Trending', icon: < WhatshotOutlinedIcon />, activeIcon: <WhatshotIcon />, targetPath: "/feed/trending" },
              { name: 'Shopping', icon: <LocalMallOutlinedIcon />, activeIcon: <LocalMallIcon />, targetPath: "/UCkYQyvc_i9hXEo4xic9Hh2g" },
              { name: 'Music', icon: <MusicNoteOutlinedIcon />, activeIcon: <MusicNoteIcon />, targetPath: "/UC-9-kyTW8ZkZNDHQJ6FgpwQ" },
              { name: 'News', icon: <NewspaperOutlinedIcon />, activeIcon: <NewspaperIcon />, targetPath: '/UCYfdidRxbB8Qhf0Nx7ioOYw' },
              { name: 'Sports', icon: <EmojiEventsOutlinedIcon />, activeIcon: <EmojiEventsIcon />, targetPath: '/UCEgdi0XIXXZ-qJOFPf4JSKw' },
              { name: 'Learning', icon: <LightbulbOutlinedIcon />, activeIcon: <LightbulbIcon />, targetPath: '/UCtFRv9O2AHqOZjjynzrv-xg' },
              { name: 'Fashion & Beauty', icon: <CheckroomOutlinedIcon />, activeIcon: <CheckroomIcon />, targetPath: '/UCrpQ4p1Ql_hG8rKXIKM1MOQ' }
            ]}
          />
        </Stack>

        <p className={classes.divider} />

        <SidebarContent
          items={[
            { name: 'About Developer', icon: <PersonOutlinedIcon />, activeIcon: <PersonIcon />, targetPath: '/dev/profile' },
            { name: 'Send feedback', icon: <AnnouncementOutlinedIcon />, activeIcon: <AnnouncementIcon />, targetPath: '/dev/feedback' }]}
        />

        <p className={classes.divider} />

        <Stack spacing={1} alignItems="start" sx={{ marginLeft: '2px' }}>
          <p className={classes.p}>About Press Copyright Contact us Creators Advertise Developers</p>
          <p className={classes.p}>Terms Privacy Policy & Safety How YouTube worksTest new features</p>
          <p className={classes.p}>@2023 Youtube Clone</p>
        </Stack>

      </Box>

      {/* Drawer that will be visible in screensize <= lg  */}
      {(!drawer || !aboveBreakPointD) && !(path === '/watch') &&
        <Box className={classes.smallBox} >
          <SidebarContent
            items={[
              { name: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon />, targetPath: '/' },
              { name: 'Shorts', icon: <VideoLibraryOutlinedIcon />, activeIcon: <VideoLibraryIcon />, targetPath: '/shorts' },
              { name: 'Subscription', icon: <SubscriptionsOutlinedIcon />, activeIcon: <SubscriptionsIcon />, targetPath: '/feed/subscriptions' },
              { name: 'Library', icon: <VideoLibraryOutlinedIcon />, activeIcon: <VideoLibraryIcon />, targetPath: '/playlist?list=LL' }
            ]}
            direction="column"
            spacing={2}
            contentSpacing={0.5}
            typographyFont={9}
            stackWidth={70}
          />
        </Box>}
    </>
  );
}

export default Drawer;