import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Box 
    sx={{
      display:'flex',
      alignItems:'center',
      flexDirection:'column',
      gap:3,
      mt:10,
      color:'red'
    }}
    >
      <Typography 
        variant='h4'
        sx={{
          fontSize: {xs:'1.40rem',md:'2rem'},
        }}
      >Page Not Found</Typography>
      <Typography variant='body1'>Please go and check the <Link to='/'>Home Page</Link></Typography>
    </Box>
  )
}

export default NotFound