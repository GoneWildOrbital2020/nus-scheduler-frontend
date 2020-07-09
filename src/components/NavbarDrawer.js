import * as React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Toolbar, makeStyles, useMediaQuery } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Navbar from './navbar';
import DrawerList from './DrawerList';
import DrawerMobile from './DrawerMobile';
import { light } from '../colors';

const useStyles = makeStyles((theme) => ({
  paperAnchorRight: {
    backgroundColor: light,
    width: '20%',
    [theme.breakpoints.down('md')]: {
      width: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '35%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '60%',
    },
  },
}));

const NavbarDrawer = ({ location }) => {
  const classes = useStyles();
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen((state) => !state);

  React.useEffect(() => setDrawerOpen(false), [location.pathname]);
  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <Drawer
        open={drawerOpen}
        anchor="right"
        onClose={toggleDrawer}
        classes={{ paperAnchorRight: classes.paperAnchorRight }}
      >
        <Toolbar style={{ minHeight: '75px' }} />
        {extraSmall ? (
          <DrawerMobile moduleName={location.pathname.split('/')[2]} />
        ) : (
          <DrawerList />
        )}
      </Drawer>
    </>
  );
};

NavbarDrawer.propTypes = {
  location: PropTypes.shape.isRequired,
};

export default withRouter(NavbarDrawer);
