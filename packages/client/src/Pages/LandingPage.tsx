import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { ListCountDowns } from '../components/ListCountDowns';
import { SearchBar } from '../components/SearchBar';

export const LandingPage = () => {
  return (
    <div className="LandingPage">
      <Typography>Your Countdowns</Typography>
      <ListCountDowns />
      <Button variant="outlined" color="primary">
        Create new Countdown
      </Button>
      <SearchBar />
    </div>
  );
};
