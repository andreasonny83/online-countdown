import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { SearchBar } from '../components/SearchBar';

export const NewCountdown = () => {
  return (
    <div className="LandingPage">
      <Typography>Create your new countdown</Typography>
      <SearchBar />
      <Button variant="outlined" color="primary">
        Create
      </Button>
    </div>
  );
};
