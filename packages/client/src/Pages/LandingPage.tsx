import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ListCountDowns } from '../components/ListCountDowns';

export const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Typography>Your Countdowns</Typography>
      <ListCountDowns />
      <Button component={Link} to="/new" variant="outlined" color="primary">
        Create new Countdown
      </Button>
    </div>
  );
};
