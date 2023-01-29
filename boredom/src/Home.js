import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});

const messages = [
    {
        text: "Hello!",
        author: "User 1",
    },
    {
        text: "Hi! How are you?",
        author: "User 2",
    },
    {
        text: "I'm good, thanks. How about you?",
        author: "User 1",
    },
    {
        text: "I'm doing well, thanks!",
        author: "User 2",
    },
];

function Home() {
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        const video = document.querySelector("video");
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                setVideoSrc(stream);
                video.srcObject = stream;
                video.play();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                spacing={2}
                sx={{
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            width: "100%",
                            // height: "40vh",
                            marginTop: "7vh",
                            marginLeft: "1vw",
                        }}
                    >
                        {videoSrc ? (
                            <video
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "10px",
                                    boxShadow:
                                        "0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07)",
                                }}
                                autoPlay
                                playsInline
                            />
                        ) : (
                            <p>Loading video...</p>
                        )}
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "100%",
                            height: "40vh",
                            marginTop: "7vh",
                            marginLeft: "1vw",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                margin: "auto",
                                marginTop: "35%",
                            }}
                        >
                            Video 2
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "100%",
                            height: "87vh",
                            marginTop: "7vh",
                            marginRight: "2vw",
                            marginLeft: "1vw",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                height: "80vh",
                                overflow: "auto",
                                padding: "1rem",
                            }}
                        >
                            {messages.map((message) => (
                                <Typography sx key={message.message}>
                                    {message.author}: {message.text}
                                </Typography>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "1rem",
                                gap: "0.5rem",
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    height: "4em",
                                }}
                            >
                                Next
                            </Button>
                            <TextField
                                id="outlined-basic"
                                label="Message"
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                    height: "4em",
                                }}
                            >
                                Send
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Home;
