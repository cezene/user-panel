import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loading;
