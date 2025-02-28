import React, { useState } from 'react'
import { AppBar, Box, Drawer, IconButton, List, ListItem, Toolbar, Typography } from '@mui/material'
import { DarkMode, LightMode, Menu } from '@mui/icons-material'
import {Link, useLocation} from 'react-router-dom'

const NavBar = ({theme,setTheme}) => {

  const [mobileOpen,setMobileOpen] = useState(false)

  const location = useLocation()

  const toggleDrawerMenu = () => setMobileOpen(!mobileOpen)

  const menuItems = [
    {name: 'Home',path: '/'},
    {name: 'Explorer',path: '/explorer'},
    {name: 'Upload',path: '/upload'},
    {name: 'Profile',path: '/profile'}
  ]

  return (
    <Box>
      <AppBar 
        position='sticky'
        sx={{
          backgroundColor: '#cddc39',
          px: {xs:0,sm:6,md:10},
          py:0.5,
        }}
      >
        <Toolbar
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center'
          }}
        >

          {/* Mobile menu Button */}

          <IconButton 
            sx={{
              display:{xs:'flex',md:'none'}
            }}
            onClick={toggleDrawerMenu}
          >
            <Menu 
              sx={{
                color:'black',
                "&:hover": {color:'green'}
              }} 
            />
          </IconButton>

          {/* Logo of content */}

          <Box>
            <Typography 
              variant='h4'
              component={Link}
              to={'/'}
              sx={{
                color:'black',
                fontSize: {xs:'1rem',md:'1.80rem'},
                textDecoration:'none',
                fontFamily:'cursive',
                
              }}
            >
              MemeVerse App
            </Typography>
          </Box>

          <Box
            sx={{
              display:{xs:'none',md:'flex'},
              gap:7
            }}
          >
            {menuItems.map((m,i)=>(
              <Typography 
                key={i}
                variant='h6'
                component={Link}
                to={m.path}
                sx={{
                  position:'relative',
                  color: location.pathname === m.path ? 'green' : 'black',
                  textDecoration:'none',
                  cursor:'pointer',
                  transition: 'color 0.3s ease-in-out',
                  fontFamily:'cursive',
                  "&::after":{
                    content:'""',
                    position:'absolute',
                    left:0,
                    bottom:'-4px',
                    width:'0%',
                    height:'2px',
                    backgroundColor:'green',
                    transition:'width 0.4s ease-in-out'
                  },
                  "&:hover":{
                    color:'green',
                    "&::after":{
                      width:'100%'
                    }
                  },
                }}
              >
                {m.name}
              </Typography>
            ))}
          </Box>


          {/* Mobile menu Drawer */}

          <Drawer 
            anchor='left'
            open={mobileOpen}
            onClose={toggleDrawerMenu}
          >
            <List sx={{width:200}}>
            {menuItems.map((m,i)=>(
              <ListItem
                key={i}
                onClick={toggleDrawerMenu}
              >
                <Typography
                  variant='body1'
                  component={Link}
                  to={m.path}
                  sx={{
                    textDecoration:'none',
                    color: location.pathname === m.path ? 'green' : (theme === 'dark' )? 'white' : 'black',
                    "&:hover":{color:'green'},
                    fontFamily:'cursive'
                  }}
                >
                  {m.name}
                </Typography>
              </ListItem>
            ))}
            </List>
          </Drawer>


          {/* Dark and light mode */}

          <IconButton color='inherit' onClick={()=>setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <LightMode sx={{color:'#ff3d00'}} /> : <DarkMode sx={{color:'#000'}} />}
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar