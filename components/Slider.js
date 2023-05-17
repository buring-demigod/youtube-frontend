import React, { useRef, useState, useEffect } from 'react';
import { Stack, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => (
  {
    box: {
      position: 'relative',
      width: '100%',
      marginLeft: '4px',
      [theme.breakpoints.down('d')]: {
        width: '97%'
      },
      [theme.breakpoints.down('g')]: {
        marginLeft: '0px'
      }
    },
    slider: {
      height: '40px',
      overflow: 'hidden'
    },
    button: {
      fontSize: '13px',
      padding: '0px 12px',
      cursor: 'pointer',
      border: 'none',
      borderRadius: '8px',
      whiteSpace: 'nowrap',
      backgroundColor: 'rgba(184, 179, 179, 0.295)',
    },
    activeButton: {
      backgroundColor: 'black',
      color: 'white'
    },
    left: {
      position: 'absolute',
      top: '4px',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 1,
      backgroundColor: 'white',
    },
    right: {
      position: 'absolute',
      top: '4px',
      right: '8px',
      fontSize: '20px',
      cursor: 'pointer',
      zIndex: 1,
      backgroundColor: 'white',

    }

  }
));

const Slider = ({ active, handleClick, boxShadow, height }) => {

  const classes = useStyles();
  const sliderRef = useRef(null);
  const [scrollPosition, setscrollPosition] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    const { scrollWidth, clientWidth } = slider;


    const leftEl = document.querySelector(`.${classes.left}`);
    const rightEl = document.querySelector(`.${classes.right}`);

    if (leftEl && scrollPosition === 0) {
      leftEl.style.display = 'none';
    } else if (leftEl) {
      leftEl.style.display = 'block';
    }
    if (rightEl && clientWidth + scrollPosition >= scrollWidth) {
      rightEl.style.display = 'none';
    } else if (rightEl) {
      rightEl.style.display = 'block';
    }
  }, [scrollPosition])


  const scrollRight = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: 200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition + 200);
  }

  const scrollLeft = () => {
    const slider = sliderRef.current;
    slider.scrollBy({ left: -200, behavior: 'smooth' });
    setscrollPosition((prevScrollPosition) => prevScrollPosition - 200);
  }

  return (
    <Box className={classes.box}>
      <Stack ref={sliderRef} className={classes.slider} direction="row" spacing={1.5} alignItems="start">
        {['All', 'Computer Programming', 'Designing', 'Stream', 'Horror', 'Sketch Comedy', 'Drama', 'News', 'Ravish Kumar', 'Pokemon', 'music', 'weather', 'code with harry', 'latest', 'tech', 'science'].map((item, index) => (
          <button key={index} style={{ height: height }} onClick={(e) => handleClick(e.target.innerText)} className={`${classes.button} ${active === item ? classes.activeButton : null}`}>{item}</button>
        ))}
      </Stack>
      <div className={classes.left} onClick={scrollLeft} style={{ boxShadow: boxShadow }}>&lt;</div>
      <div className={classes.right} onClick={scrollRight} style={{ boxShadow: boxShadow }}>&gt;</div>
    </Box>
  )
}

export default Slider