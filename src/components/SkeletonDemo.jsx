import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { CardItemSkeleton, ServiceCardSkeleton, CategoryCardSkeleton } from './skeletons';

const SkeletonDemo = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Skeleton Loading Demo
      </Typography>
      
      {/* CardItem Skeleton */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          CardItem Skeleton
        </Typography>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item key={index}>
              <CardItemSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ServiceCard Skeleton */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          ServiceCard Skeleton
        </Typography>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item key={index}>
              <ServiceCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CategoryCard Skeleton */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          CategoryCard Skeleton
        </Typography>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item key={index}>
              <CategoryCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
        Các skeleton này sẽ được hiển thị khi đang tải dữ liệu từ API.
        Chúng có animation pulse và shimmer để tạo hiệu ứng loading mượt mà.
      </Typography>
    </Container>
  );
};

export default SkeletonDemo; 