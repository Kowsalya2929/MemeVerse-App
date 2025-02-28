import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ArrowDownward, ArrowUpward, Chat, Favorite, Share } from "@mui/icons-material";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [memes, setMemes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState(0); // Now stores per-meme comments

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await fetch("https://api.imgflip.com/get_memes");
        const data = await res.json();
        setMemes(data.data.memes);

        // Initialize likes and comments per meme
        const initialLikes = data.data.memes.reduce((acc, meme) => {
          acc[meme.id] = { count: 0, liked: false };
          return acc;
        }, {});
        setLikes(initialLikes);

        
      } catch (err) {
        console.log("Error fetching memes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (memes.length === 0) {
    return <Typography>No memes available</Typography>;
  }

  const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, memes.length - 1));
  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const handleLike = () => {
    const memeId = memes[currentIndex].id;
    setLikes((prevLikes) => ({
      ...prevLikes,
      [memeId]: {
        count: prevLikes[memeId].liked ? prevLikes[memeId].count - 1 : prevLikes[memeId].count + 1,
        liked: !prevLikes[memeId].liked,
      },
    }));
  };

  

  const handleShare = () => {
    const currentMeme = memes[currentIndex];
    const shareText = `🔥 ${currentMeme.name} 🔥\n❤️ Likes: ${likes[currentMeme.id]?.count || 0} 💬 Comments: ${
      comments
    }\n😂 Check it out here: ${currentMeme.url}`;
    const shareUrl = encodeURIComponent(currentMeme.url);
    const text = encodeURIComponent(shareText);
    window.open(`https://www.addtoany.com/share#url=${shareUrl}&title=${text}`, "_blank", "width=800,height=600");
  };

  const currentMeme = memes[currentIndex];
  const currentLike = likes[currentMeme.id] || { count: 0, liked: false };

  return (
    <Box sx={{ mx: { xs: 2, md: 20 }, py: { md: 10, xs: 2 }, height: { xs: "100vh", md: "68vh" } }}>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        {/* Meme Card */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ maxWidth: { xs: "100%", md: "600px" }, mx: "auto" }}>
            <CardMedia
              component="img"
              image={currentMeme.url}
              alt={currentMeme.name}
              sx={{ width: "100%", height: "auto", maxHeight: { xs: "300px", md: "400px" }, objectFit: "contain" }}
            />

            <CardContent>
              <Typography variant="h6" fontWeight="bold" textAlign="center">
                {currentMeme.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                Date: {new Date().toDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons/Actions */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, alignItems: "center", gap: 2 }}>
            {/* Like Button */}
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ color: currentLike.liked ? "red" : "gray" }} onClick={handleLike}>
                <Favorite />
              </IconButton>
              <Typography variant="body2">{currentLike.count}</Typography>
            </Box>

            {/* Comment Button */}
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ color: "green" }}>
                <Chat />
              </IconButton>
              <Typography variant="body2">{comments}</Typography>
            </Box>

            {/* Share Button */}
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ color: "blue" }} onClick={handleShare}>
                <Share />
              </IconButton>
              <Typography variant="body2">Share</Typography>
            </Box>

            {/* Prev Button */}
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ color: "purple" }} onClick={handlePrev} disabled={currentIndex === 0}>
                <ArrowUpward />
              </IconButton>
              <Typography variant="body2">Prev</Typography>
            </Box>

            {/* Next Button */}
            <Box sx={{ textAlign: "center" }}>
              <IconButton sx={{ color: "purple" }} onClick={handleNext} disabled={currentIndex === memes.length - 1}>
                <ArrowDownward />
              </IconButton>
              <Typography variant="body2">Next</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
