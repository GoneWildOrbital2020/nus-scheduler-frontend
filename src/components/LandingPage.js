import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  landing: {
    width: '100%',
    textAlign: 'left',
  },
  top: {
    height: '100vh',
    [theme.breakpoints.up('lg')]: {
      paddingTop: '4rem',
      paddingLeft: '6rem',
    },
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      backgroundPosition: '0 0',
      marginTop: '-1px',
    },
    backgroundImage: `url(${heroPage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 -20vh',
    backgroundSize: 'cover',
    marginLeft: '-1px',
  },
  paragraph: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '45rem',
    },
  },
  typography: {
    marginBottom: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
  bottom: {
    minHeight: '100vh',
  },
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
  },
  grid: {
    width: '75%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    margin: '0 auto',
  },
  innerGrid1: {
    width: '33.3%',
    alignItems: 'flex-start',
    // marginRight: '6rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      alignItems: 'center',
      marginRight: '0',
    },
  },
  innerGrid2: {
    width: '33.3%',
    alignItems: 'flex-start',
    // marginRight: '2rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      alignItems: 'center',
      marginRight: '0',
    },
  },
  innerGrid3: {
    width: '33.3%',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      alignItems: 'center',
    },
  },
  icon: {
    height: '30vh',
    margin: '2rem 0',
  },
  iconTitle: {
    color: accent,
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const mediumScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <div className={classes.landing}>
      {mediumScreen ? (
        <div className={classes.top}>
          <img src={hero} alt="" className={classes.hero} />
          <Typography
            variant="h2"
            style={{ color: light }}
            className={classes.typography}
          >
            Do You Have Problem Organizing Your Schoolwork?
          </Typography>
          <div className={classes.paragraph}>
            <Typography
              variant="h3"
              style={{ color: medium }}
              className={classes.typography}
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
            className={classes.typography}
          >
            Do You Have Problem Organizing Your Schoolwork?
          </Typography>
          <div className={classes.paragraph}>
            <Typography
              variant="h3"
              style={{ color: medium }}
              className={classes.typography}
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
          <img src={hero} alt="" className={classes.hero} />
        </div>
      )}
      <div className={classes.bottom}>
        <Typography
          variant="h2"
          style={{ color: light, textAlign: 'center' }}
          className={classes.typography}
        >
          Features
        </Typography>
        <Grid container item direction="row" className={classes.grid}>
          <Grid container direction="column" className={classes.innerGrid1}>
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
          </Grid>
          <Grid container direction="column" className={classes.innerGrid2}>
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
          </Grid>
          <Grid container direction="column" className={classes.innerGrid3}>
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LandingPage;
