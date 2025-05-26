import React from 'react';
import { Grid } from '@mui/material';
import CardItemSkeleton from './CardItemSkeleton';

const GridSkeleton = ({ count = 8, xs = 12, sm = 6, md = 4, lg = 3 }) => {
  return (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, index) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} key={index}>
          <CardItemSkeleton />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridSkeleton; 