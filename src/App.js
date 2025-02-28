import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Explorer from './pages/Explorer'
import Upload from './pages/Upload'
import Profile from './pages/Profile'
import { Box, createTheme, ThemeProvider } from '@mui/material'

const App = () => {

  const [theme,setTheme] = useState('light')

  const darkTheme = createTheme({
    palette: {
      mode: theme
    }
  })

  return (
    <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={'background.default'} color={'text.primary'}>
    <NavBar theme={theme} setTheme={setTheme} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/explorer' element={<Explorer />} />
      <Route path='/upload' element={<Upload />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    </Box>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App