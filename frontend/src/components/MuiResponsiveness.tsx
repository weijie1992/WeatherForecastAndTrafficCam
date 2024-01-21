import { Box } from '@mui/material'
import React from 'react'
const MuiResponsiveness = () => {
  return (
      <Box sx={{
          height: '300px',
          width: {
              xs: 100, //xs: 0 width
              sm: 200, // 600 width
              md: 300, // 900 width
              lg: 400,// 1200 width
              xl:500// 1536 width
          }
    }}>
      
    </Box>
  )
}

export default MuiResponsiveness
