import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, TextField, Typography } from '@mui/material'

const Explorer = () => {

  const [search,setSearch] = useState("")
  const [filter,setFilter] = useState("trending")
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(true)
  const [memes,setMemes] = useState([])
  const [debouncedSearch,setDebouncedSearch] = useState("")
  const memesPerPage = 4;

  useEffect(()=>{
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return ()=>clearTimeout(timer);
  },[search])
  
  useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
        .then((res)=>res.json())
        .then((data)=>{
          let filteredMemes = data.data.memes;
          if(filter === 'classic'){
            filteredMemes = filteredMemes.slice(21,50);
          }else if(filter === 'random'){
            filteredMemes = filteredMemes.sort(()=>Math.random() - 0.5)
          }
  
          if(debouncedSearch){
            filteredMemes = filteredMemes.filter((meme)=>meme.name.toLowerCase().includes(debouncedSearch.toLocaleLowerCase()))
          }
          setMemes(filteredMemes)
          setLoading(false)
        })
        .catch((err)=>console.log("Error fetching memes:",err))
    },[filter,debouncedSearch])
  
  const paginatedMemes = memes.slice((page - 1)* memesPerPage , page * memesPerPage)

  return (
    <Box sx={{px:{xs:2,md:10},pb:1}}>
          {/* form */}
    
          <TextField
            label="Search Memes..."
            sx={{
              mt:3,
              mx:{xs:3,sm:3,md:40},
              display: 'flex',
              flexWrap:'wrap',
              border:'GrayText'
            }}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
    
          {/* filter items */}
    
          <Grid container spacing={2} justifyContent='center' marginTop={2}>
    
            <Grid item>
              <Button variant={filter === 'trending' ? 'contained' : 'outlined'} sx={{bgcolor:'#cddc39',color:'black'}} onClick={()=>setFilter("trending")}>Trending</Button>
            </Grid>
    
            <Grid item>
              <Button variant={filter === 'classic' ? 'contained' : 'outlined'} sx={{bgcolor:'#cddc39',color:'black'}} onClick={()=>setFilter("classic")}>Classic</Button>
            </Grid>
    
            <Grid item>
              <Button variant={filter === 'random' ? 'contained' : 'outlined'} sx={{bgcolor:'#cddc39',color:'black'}} onClick={()=>setFilter("random")}>Random</Button>
            </Grid>
    
          </Grid>
    
    
          {/* displaying memes */}
    
          {loading ? (
            <Grid container justifyContent='center' sx={{mt:5}}>
              <CircularProgress />
            </Grid>
          ):(
            <Grid container spacing={3} sx={{mt:5}}>
              {paginatedMemes.map((m)=>(
                <Grid item xs={12} sm={6} md={4} lg={3} key={m.id}>
                  <Card sx={{transition: 'transform 0.3s',"&:hover":{transform: 'scale(1.05)'}}}>
                    <CardMedia component='img' image={m.url} alt={m.name} sx={{height:300,objectFit:'contain'}} />
                    <CardContent>
                      <Typography variant='h6' fontWeight='bold' textAlign='center'>{m.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          {/* pagination */}
    
          <Grid container justifyContent='center' sx={{mt:1.5}} spacing={3}>
            <Grid item>
              <Button variant='contained' sx={{bgcolor:'#cddc39',color:'black'}} onClick={()=>setPage((p)=> Math.max(p - 1, 1))}>PREVIOUS</Button>
            </Grid>
            <Grid item>
              <Typography variant='h6'>Page {page}</Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' sx={{bgcolor:'#cddc39',color:'black'}} onClick={()=>setPage((p)=> p + 1)}>NEXT</Button>
            </Grid>
          </Grid>
    
    </Box>
  )
}

export default Explorer