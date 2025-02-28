import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, Container, IconButton, TextField, Typography } from '@mui/material'
import { CloudUpload, Delete } from '@mui/icons-material'
import {v4 as uuidv4} from 'uuid'

const Upload = () => {

  const [selectedFile,setSelectedFile] = useState(null)
  const [caption,setCaption] = useState("")
  const [aiLoading,setAiLoading] = useState(false)

  const handleFileChange=(e)=>{
    const file = e.target.files[0]
    if(file && (file.type.startsWith('image/') || file.type === "image/gif")){
      setSelectedFile(URL.createObjectURL(file))
    }else{
      alert("Please upload an image or gif file.")
    }
  }

  const generateAICaption=()=>{
    setAiLoading(true)
    setTimeout(() => {
      const funnyCaptions = [
        "Just here for the LOLs 🤣👌",
        "404: Caption Not Found 😂",
        "Can’t even with today’s adulting 🙄💯",
        'Sleep is just a time travel to breakfast 🚀🥐',
        'Not all heroes wear capes, some just hold the camera 📸🦸',
        'Trying to find my motivation like 🕵️✨',
        'Mondays: the sequel no one asked for 🎬😒',
        "Sending this selfie to NASA, because I'm a star 🚀🤳",
        'Stress level Kanye at an award show 🎤🚨',
        'Is it too late for coffee or too early for wine? ☕🍷',
        'Not to brag but I don’t even need alcohol to make bad decisions 🙈🎉',
        '404 Error: Motivation not found 🖥❌',
        'Do I run? Yes, out of patience, money, and time 🏃💸',
        'Sassy, classy, and a bit smart-assy 💅🧠',
        'Might delete later, but just need to show off this outfit 🤷‍♂️👗',
        'My life’s a mess but my memes? Masterpieces. 🖼👏',
        'Relationship status: committed to inner peace 🧘‍♀️✌️',
      ];
      const randomCaption = funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
      setCaption(randomCaption)
      setAiLoading(false)
    }, 2000);
  }

  const handleUpload=()=>{
    if(!selectedFile){
      alert("Please select an image or gif first.")
      return;
    }
    const memeData ={
      id: uuidv4(),
      imageUrl: selectedFile,
      caption: caption,
    };
    console.log("Uploaded Meme:",memeData)
    alert("Meme uploaded successfully!")
    setSelectedFile(null)
    setCaption("")
  }
  return (
    <Container sx={{mt:4,height:{xs:'90vh',md:'85.8vh'}}}>
      <Typography variant='h5' textAlign='center' sx={{mb:3}}>
        Uploaded Your Meme
      </Typography>

      {/* file upload */}

      <Box sx={{textAlign:'center',mb:3}}>
        <input 
          type='file'
          accept='image/*'
          id='meme-upload'
          style={{display:'none'}}
          onChange={handleFileChange}
        />
        <label htmlFor='meme-upload'>
          <Button variant='contained' sx={{bgcolor:'#cddc39',color:'black'}} component="span" startIcon={<CloudUpload />} >
            Upload Image/GIF
          </Button>
        </label>
      </Box>

      {/* meme preview */}
      {selectedFile && (
        <Card sx={{mb:3,maxWidth:'500px',mx:'auto',position:'relative'}}>
        <IconButton
          sx={{position:'absolute',top:10,right:10,backgroundColor:'#fff',color:'black'}}
          onClick={()=>setSelectedFile(null)}
        >
          <Delete />
        </IconButton>
        <CardMedia component='img' image={selectedFile} alt='Meme Preview' />
        <CardContent>
          <Typography variant='h6' textAlign='center'>
            {caption || "No caption added yet"}
          </Typography>
        </CardContent>
        </Card>
      )}

      {/* caption input */}

      <TextField 
        fullWidth
        label="Add a Funny Caption"
        variant='outlined'
        sx={{mb:2}}
        value={caption}
        onChange={(e)=>setCaption(e.target.value)}
      />

      <Box sx={{textAlign:'center',mb:2}}>
        <Button variant='outlined' sx={{bgcolor:'#cddc39',color:'black', '&:hover': { bgcolor: '#b2b818' }}} onClick={generateAICaption} disabled={aiLoading}>
        {aiLoading ? <Typography sx={{color:'black',fontSize:'0.8rem',textTransform:'capitalize'}}>Generating Caption...</Typography> : 'Generate AI Caption'}
        </Button>
      </Box>

      {/* upload button */}

      <Box sx={{textAlign:'center'}}>
        <Button variant='contained' sx={{bgcolor:'#cddc39',color:'black'}} color='primary' onClick={handleUpload}>
          Upload Meme
        </Button>
      </Box>

    </Container>
  )
}

export default Upload