import React from 'react';
import { AppBar, Toolbar, Typography, Link, Button } from '@material-ui/core';
import { useStyles } from './styles';

export const TopBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Company name
        </Typography>
        <nav>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Features
          </Link>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Enterprise
          </Link>
          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            Support
          </Link>
        </nav>
        <Button href="#" color="primary" variant="outlined" className={classes.link}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
