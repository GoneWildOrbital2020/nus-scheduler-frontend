import * as React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';
import Navbar from './navbar';
import DrawerList from './DrawerList';

const NavbarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen((state) => !state);
  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} />
      <Drawer open={drawerOpen} anchor="right" onClose={toggleDrawer}>
        <Toolbar />
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
