import { Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, CardMedia, Container, FormControlLabel, Grid, IconButton, Modal, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Profile = () => {

  const [user,setUser] = useState({
    name: 'Kowsalya',
    bio: 'Full Stack Developer',
    profilePic : "https://i.pravatar.cc/150"
  })

  const [uploadedMemes,setUploadedMemes] = useState([])
  const [editModal,setEditModal] = useState(false)
  const [newProfileData,setNewProfileData] = useState(user)
  const [darkmode,setDarkmode] = useState(false)

  useEffect(()=>{

    setUploadedMemes([
      {id:1,url: "https://i.imgflip.com/3lmzyx.jpg",name:"UNO Draw 25 Cards"},
      {id:2,url: "https://i.imgflip.com/58eyvu.png",name:"where monkey"},
    ])
  },[])

  const handleSaveProfile = (e) => {
    e.preventDefault()
    setUser(newProfileData);
    setEditModal(false);
  }
  return (
    <Container sx={{mt:4,height:{xs:'auto',md:'85.8vh'}}}>
      <Box
        sx={{
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          backgroundColor:'#f5f5f0',
          p:3,
          borderRadius: 3,
        }}
      >

        {/* user profile */}

        <Box sx={{display:'flex',alignItems:'center'}}>
          {/* user img */}

          <Avatar 
            src={user.profilePic}
            alt={user.name}
            sx={{width:100,height:100,mr:2}}
          />
          <Box>

            {/* user name */}

            <Typography variant='h5' sx={{color:'black'}}>
              {user.name}
            </Typography>

            {/* user bio */}

            <Typography variant='body1' color='textSecondary' sx={{color:'black'}}>
              {user.bio}
            </Typography>

          </Box>
        </Box>

        <IconButton onClick={()=>setEditModal(true)} sx={{color:'black'}}>
          <Edit />
        </IconButton>
      </Box>

      {/* edit profile */}

      <Modal open={editModal} onClose={()=>setEditModal(false)} >
        <Box
          sx={{
            p:3,
            borderRadius: 2,
            width:{xs:250,md:400},
            position:'absolute',
            top: '50%',
            left:'50%',
            transform: "translate(-50%,-50%)",
            color: darkmode ? 'white' : 'black',
            bgcolor: darkmode ? 'black' : 'white'
          }}
        >
          <FormControlLabel
            control={
              <Switch 
                checked={darkmode}
                onChange={()=>setDarkmode(!darkmode)}
                color='primary'
              />
            }
            label='Dark mode'
            sx={{display:'block',textAlign:'center',mt:1}}
          />
          <Typography variant='h6' textAlign='center'>
            Edit Profile
          </Typography>
          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mt:2,
              backgroundColor: darkmode ? 'black' : 'white',
              input :{color: darkmode ? 'white' : 'black'}
            }}
            InputLabelProps={{style : {color: darkmode ? 'gray' : 'black'}}}
            label='Name'
            value={newProfileData.name}
            onChange={(e)=>setNewProfileData({...newProfileData, name: e.target.value})}
          />
          <TextField 
            fullWidth
            variant='outlined'
            sx={{
              mt:2,
              backgroundColor: darkmode ? 'black' : 'white',
              input :{color: darkmode ? 'white' : 'black'}
            }}
            InputLabelProps={{style : {color: darkmode ? 'gray' : 'black'}}}
            label='Bio'
            value={newProfileData.bio}
            onChange={(e)=>setNewProfileData({...newProfileData, bio: e.target.value})}
          />
          <TextField
            fullWidth
            variant='outlined'
            sx={{
              mt:2,
              backgroundColor: darkmode ? 'black' : 'white',
              input :{color: darkmode ? 'white' : 'black'}
            }}
            InputLabelProps={{style : {color: darkmode ? 'gray' : 'black'}}}
            label='Profile Picture URL'
            value={newProfileData.profilePic}
            onChange={(e)=>setNewProfileData({...newProfileData, profilePic: e.target.value})}
          />
          <Button 
            variant='contained' 
            onClick={handleSaveProfile}
            fullWidth
            sx={{mt:2,bgcolor:'#cddc39',color:'black'}}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* uploaded memes */}

      <Typography variant='h6' sx={{mt:4,mb:2}}>
        Uploaded Memes
      </Typography>
      <Grid container spacing={3}>
        {uploadedMemes.length > 0 ? (
          uploadedMemes.map((m)=>(
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Card elevation={7}>
                <CardMedia component='img' image={m.url} alt={m.name} sx={{height:300,objectFit:'contain'}} />
                <CardContent>
                  <Typography variant='h6'>{m.name}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ):(
          <Typography>No uploaded memes.</Typography>
        )}
      </Grid>

    </Container>
  )
}

export default Profile