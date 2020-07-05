import * as React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Toolbar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Navbar from './navbar';
import DrawerList from './DrawerList';

const NavbarDrawer = ({ location }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen((state) => !state);

  React.useEffect(() => setDrawerOpen(false), [location.pathname]);
  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <Drawer open={drawerOpen} anchor="right" onClose={toggleDrawer}>
        <Toolbar />
        <DrawerList />
      </Drawer>
    </>
  );
};

NavbarDrawer.propTypes = {
  location: PropTypes.shape.isRequired,
};

export default withRouter(NavbarDrawer);
