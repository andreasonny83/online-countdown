import React from 'react';
import { Container, Box, Grid } from '@material-ui/core';

import { Routes } from './Routes';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';

export const App = () => {
  return (
    <React.Fragment>
      <TopBar />

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          <Box my={4}>
            <Routes />
          </Box>
        </Grid>
      </Container>

      <Footer />
    </React.Fragment>
  );
};
