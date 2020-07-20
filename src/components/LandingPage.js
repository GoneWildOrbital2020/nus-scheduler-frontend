import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { light, medium, accent } from '../colors';
import heroPage from '../images/heroPage.svg';
import hero from '../images/herov1.png';
import customize from '../images/customize.svg';
import note from '../images/note.svg';
import plan from '../images/plan.svg';
import Footer from './footer';
import NavbarDrawer from './NavbarDrawer';

const useStyles = makeStyles((theme) => ({
  landing: {
    width: '100%',
    textAlign: 'left',
  },
  top: {
    height: 'calc(100vh - 73px)',
    marginTop: '73px',
    [theme.breakpoints.up('lg')]: {
      paddingTop: '4rem',
      paddingLeft: '6rem',
    },
    [theme.breakpoints.down('md')]: {
      backgroundPosition: 'center',
      backgroundSize: 'auto 100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backgroundImage: `url(${heroPage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundSize: '100% 100%',
    marginLeft: '-1px',
  },
  paragraph: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '45rem',
    },
    [theme.breakpoints.down('md')]: {
      width: '80%',
      margin: '0 auto',
    },
  },
  typography: {
    marginBottom: '1rem',
  },
  title: {
    marginBottom: '1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      width: '80%',
      margin: '1rem auto',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
      margin: '0 auto',
      marginBottom: '1rem',
    },
  },
  description: {
    marginBottom: '1rem',
    fontFamily: 'Ubuntu',
    letterSpacing: '0.1rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.125rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.25rem',
    },
  },
  button: {
    marginTop: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '0.5rem',
    },
  },
  bottom: {},
  hero: {
    position: 'relative',
    width: '50vw',
    marginBottom: '2rem',
    [theme.breakpoints.up('lg')]: {
      top: '-23rem',
      marginBottom: '-23rem',
      float: 'right',
      marginRight: '6rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80vw',
    },
  },
  grid: {
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    margin: '0 auto',
  },
  innerGrid: {
    width: '33.3%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  innerGridContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
    },
  },
  icon: {
    height: '20vh',
    margin: '2rem 0',
    alignSelf: 'center',
    filter: `drop-shadow(3px 3px 3px #8B484B)`,
  },
  iconTitle: {
    color: accent,
    textShadow: `1px 1px 3px #424D4D`,
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [elevation, setElevation] = useState(0);

  const handleScroll = () => {
    const newY = window.scrollY;
    if (newY === 0) {
      setElevation(0);
    } else {
      setElevation(4);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={classes.landing}>
      <NavbarDrawer elevation={elevation} />
      {mediumScreen ? (
        <div className={classes.top}>
          <img src={hero} alt="" className={classes.hero} />
          <Typography
            variant="h2"
            style={{ color: light }}
            className={classes.title}
          >
            Do You Have Problem Organizing Your Schoolwork?
          </Typography>
          <div className={classes.paragraph}>
            <Typography
              variant="h3"
              style={{ color: medium }}
              className={classes.description}
            >
              NUS Scheduler is a one-stop solution for your daily academic
              planning. Stop being overwhelmed by your course load.
            </Typography>
          </div>
          <Link to="/login">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Start Now
            </Button>
          </Link>
        </div>
      ) : (
        <div className={classes.top}>
          <Typography
            variant="h2"
            style={{ color: light }}
            className={classes.title}
          >
            Do You Have Problem Organizing Your Schoolwork?
          </Typography>
          <div className={classes.paragraph}>
            <Typography
              variant="h3"
              style={{ color: medium }}
              className={classes.description}
            >
              NUS Scheduler is a one-stop solution for your daily academic
              planning. Stop being overwhelmed by your course load.
            </Typography>
          </div>
          <Link to="/login">
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="large"
            >
              Start Now
            </Button>
          </Link>
          <img src={hero} alt="" className={classes.hero} />
        </div>
      )}
      <div className={classes.bottom}>
        <Typography
          variant="h3"
          style={{
            color: light,
            textAlign: 'center',
            fontFamily: 'Ubuntu',
            textShadow: `3px 3px 10px #424D4D`,
            letterSpacing: '0.3rem',
          }}
          className={classes.typography}
        >
          FEATURES
        </Typography>
        <Grid container item direction="row" className={classes.grid}>
          <Grid container direction="column" className={classes.innerGrid}>
            <div className={classes.innerGridContent}>
              <img src={customize} alt="" className={classes.icon} />
              <Typography variant="h5" className={classes.iconTitle}>
                Make It Your Own
              </Typography>
              <Typography variant="h6" style={{ color: light }}>
                <ul>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                </ul>
              </Typography>
            </div>
          </Grid>
          <Grid container direction="column" className={classes.innerGrid}>
            <div className={classes.innerGridContent}>
              <img src={plan} alt="" className={classes.icon} />
              <Typography variant="h5" className={classes.iconTitle}>
                Be a Master Planner
              </Typography>
              <Typography variant="h6" style={{ color: light }}>
                <ul>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                </ul>
              </Typography>
            </div>
          </Grid>
          <Grid container direction="column" className={classes.innerGrid}>
            <div className={classes.innerGridContent}>
              <img src={note} alt="" className={classes.icon} />
              <Typography variant="h5" className={classes.iconTitle}>
                Make It Your Own
              </Typography>
              <Typography variant="h6" style={{ color: light }}>
                <ul>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                  <li>Lorem Ipsum Dolor Sit Amet</li>
                </ul>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
